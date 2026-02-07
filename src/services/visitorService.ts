import { api } from '@/lib/api';

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
    // Only log once per session to avoid spamming
    if (sessionStorage.getItem(VISITOR_LOGGED_KEY)) {
      return;
    }

    try {
      const visitorInfo = getVisitorInfo();
      await api.post('/visitors/log', visitorInfo, false);
      sessionStorage.setItem(VISITOR_LOGGED_KEY, 'true');
    } catch (error) {
      // Silently fail - visitor logging shouldn't block the app
      console.warn('Visitor logging failed:', error);
    }
  },
};
