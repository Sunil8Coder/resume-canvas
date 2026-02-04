import { api } from '@/lib/api';

export interface Role {
  id: string;
  name: string;
  permissions?: string[];
  createdAt?: string;
}

export interface CreateRoleRequest {
  name: string;
  permissions?: string[];
}

export interface UpdateRoleRequest {
  name?: string;
  permissions?: string[];
}

export const roleService = {
  async listRoles(): Promise<{ data?: Role[]; error?: string }> {
    return api.get<Role[]>('/roles');
  },

  async createRole(role: CreateRoleRequest): Promise<{ data?: Role; error?: string }> {
    return api.post<Role>('/roles', role);
  },

  async updateRole(id: string, updates: UpdateRoleRequest): Promise<{ data?: Role; error?: string }> {
    return api.put<Role>(`/roles/${id}`, updates);
  },

  async deleteRole(id: string): Promise<{ data?: void; error?: string }> {
    return api.delete(`/roles/${id}`);
  },
};
