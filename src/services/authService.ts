import { api } from '@/lib/api';

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<{ data?: AuthResponse; error?: string }> {
    const response = await api.post<AuthResponse>('/auth/login', credentials, false);
    
    if (response.data?.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  },

  async register(data: RegisterRequest): Promise<{ data?: AuthResponse; error?: string }> {
    const response = await api.post<AuthResponse>('/auth/register', data, false);
    
    if (response.data?.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout', {});
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  },

  async forgotPassword(email: string): Promise<{ data?: { message: string }; error?: string }> {
    return api.post<{ message: string }>('/auth/forgot-password', { email }, false);
  },

  async resetPassword(token: string, password: string): Promise<{ data?: { message: string }; error?: string }> {
    return api.post<{ message: string }>('/auth/reset-password', { token, password }, false);
  },

  getOAuthUrl(provider: string): string {
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
    return `https://resumbe4j.yadavsunil9699.workers.dev/auth/oauth/${provider}?redirect_uri=${redirectUri}`;
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },
};
