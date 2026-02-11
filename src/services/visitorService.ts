import { api } from '@/lib/api';

export interface Visitor {
  id: string;
  userAgent?: string;
  language?: string;
  platform?: string;
  screenWidth?: number;
  screenHeight?: number;
  referrer?: string;
  url?: string;
  timestamp?: string;
  timezone?: string;
  ip?: string;
  createdAt?: string;
}

interface VisitorInfo {
  userAgent: string;
  language: string;
  platform: string;
  screenWidth: number;
  screenHeight: number;
  referrer: string;
  url: string;
  timestamp: string;
  timezone: string;
}

const VISITOR_LOGGED_KEY = 'visitor_logged_session';

function getVisitorInfo(): VisitorInfo {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    referrer: document.referrer,
    url: window.location.href,
    timestamp: new Date().toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

export const visitorService = {
  async logVisit(): Promise<void> {
    if (sessionStorage.getItem(VISITOR_LOGGED_KEY)) {
      return;
    }

    try {
      const visitorInfo = getVisitorInfo();
      await api.post('/visitors', visitorInfo, false);
      sessionStorage.setItem(VISITOR_LOGGED_KEY, 'true');
    } catch (error) {
      console.warn('Visitor logging failed:', error);
    }
  },

  async listVisitors(offset = 0, limit = 10): Promise<{ data?: Visitor[]; total?: number; error?: string }> {
    const response = await api.get<{ data: Visitor[]; total: number }>('/visitors', true, { offset, limit });
    if (response.error) return { error: response.error };
    const raw = response.data;
    if (!raw) return { data: [], total: 0 };
    return { data: raw.data, total: raw.total };
  },

  async getVisitor(id: string): Promise<{ data?: Visitor; error?: string }> {
    return api.get<Visitor>(`/visitors/${id}`);
  },

  async deleteVisitor(id: string): Promise<{ data?: void; error?: string }> {
    return api.delete(`/visitors/${id}`);
  },
};
