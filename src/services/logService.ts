import { api } from '@/lib/api';

export interface RequestLog {
  id: string;
  method: string;
  path: string;
  status: number | null;
  ip: string | null;
  userAgent: string | null;
  isBot: boolean;
  botScore: number | null;
  userId: string | null;
  createdAt: string;
}

interface BackendLog {
  id: string;
  method: string;
  path: string;
  status: number | null;
  ip: string | null;
  user_agent: string | null;
  is_bot: number | null;
  bot_score: number | null;
  user_id: string | null;
  created_at: string;
}

function normalizeLog(raw: BackendLog): RequestLog {
  return {
    id: raw.id,
    method: raw.method,
    path: raw.path,
    status: raw.status,
    ip: raw.ip,
    userAgent: raw.user_agent,
    isBot: raw.is_bot === 1,
    botScore: raw.bot_score,
    userId: raw.user_id,
    createdAt: raw.created_at,
  };
}

export const logService = {
  async listLogs(): Promise<{ data?: RequestLog[]; error?: string }> {
    const response = await api.get<BackendLog[]>('/logs');
    if (response.error) return { error: response.error };
    const normalized = (response.data || []).map(normalizeLog);
    return { data: normalized };
  },

  async getLog(id: string): Promise<{ data?: RequestLog; error?: string }> {
    const response = await api.get<BackendLog>(`/logs/${id}`);
    if (response.error) return { error: response.error };
    if (!response.data) return { error: 'Log not found' };
    return { data: normalizeLog(response.data) };
  },

  async deleteLog(id: string): Promise<{ data?: void; error?: string }> {
    return api.delete(`/logs/${id}`);
  },
};
