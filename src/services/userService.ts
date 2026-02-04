import { api } from '@/lib/api';
import { User } from './authService';

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export const userService = {
  async listUsers(): Promise<{ data?: User[]; error?: string }> {
    return api.get<User[]>('/users');
  },

  async getUser(id: string): Promise<{ data?: User; error?: string }> {
    return api.get<User>(`/users/${id}`);
  },

  async createUser(user: CreateUserRequest): Promise<{ data?: User; error?: string }> {
    return api.post<User>('/users', user);
  },

  async updateUser(id: string, updates: UpdateUserRequest): Promise<{ data?: User; error?: string }> {
    return api.put<User>(`/users/${id}`, updates);
  },

  async deleteUser(id: string): Promise<{ data?: void; error?: string }> {
    return api.delete(`/users/${id}`);
  },
};
