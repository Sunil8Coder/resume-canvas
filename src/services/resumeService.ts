import { api } from '@/lib/api';
import { ResumeData, TemplateType, ResumeType } from '@/types/resume';

// What the backend actually returns
interface BackendResume {
  id: string;
  title: string;
  resume_type: string;
  content: string; // JSON string of ResumeData
  template: string;
  created_at: string;
  updated_at?: string;
  userId?: string;
  user_id?: string;
}

// What the frontend uses
export interface SavedResume {
  id: string;
  userId: string;
  title: string;
  templateType: TemplateType;
  resumeType: ResumeType;
  data: ResumeData;
  createdAt: string;
  updatedAt: string;
}

export interface CreateResumeRequest {
  title: string;
  templateType: TemplateType;
  resumeType: ResumeType;
  data: ResumeData;
}

export interface UpdateResumeRequest {
  title?: string;
  templateType?: TemplateType;
  resumeType?: ResumeType;
  data?: ResumeData;
}

// Transform backend response to frontend format
function normalizeResume(raw: BackendResume): SavedResume {
  let parsedData: ResumeData;
  try {
    parsedData = typeof raw.content === 'string' ? JSON.parse(raw.content) : raw.content;
  } catch {
    console.error('Failed to parse resume content:', raw.content);
    parsedData = {
      personalInfo: { fullName: '', email: '', phone: '', location: '', title: '', summary: '' },
      experiences: [],
      education: [],
      skills: [],
      sectionOrder: ['experience', 'education', 'skills'],
    };
  }

  return {
    id: raw.id,
    userId: raw.userId || raw.user_id || '',
    title: raw.title || 'Untitled',
    templateType: (raw.template as TemplateType) || 'classic',
    resumeType: (raw.resume_type as ResumeType) || 'professional',
    data: parsedData,
    createdAt: raw.created_at || new Date().toISOString(),
    updatedAt: raw.updated_at || raw.created_at || new Date().toISOString(),
  };
}

// Transform frontend request to backend format
function toBackendPayload(request: CreateResumeRequest | UpdateResumeRequest) {
  const payload: Record<string, unknown> = {};
  if ('title' in request && request.title !== undefined) payload.title = request.title;
  if ('templateType' in request && request.templateType !== undefined) payload.template = request.templateType;
  if ('resumeType' in request && request.resumeType !== undefined) payload.resume_type = request.resumeType;
  if ('data' in request && request.data !== undefined) payload.content = JSON.stringify(request.data);
  return payload;
}

export const resumeService = {
  async listResumes(): Promise<{ data?: SavedResume[]; total?: number; error?: string }> {
    const response = await api.get<{ data: BackendResume[]; total: number }>('/resumes');
    if (response.error) return { error: response.error };
    const raw = response.data;
    if (!raw) return { data: [], total: 0 };
    const normalized = (raw.data || []).map(normalizeResume);
    return { data: normalized, total: raw.total };
  },

  async adminListResumes(offset = 0, limit = 10): Promise<{ data?: SavedResume[]; total?: number; error?: string }> {
    const response = await api.get<{ data: BackendResume[]; total: number }>('/admin/resumes', true, { offset, limit });
    if (response.error) return { error: response.error };
    const raw = response.data;
    if (!raw) return { data: [], total: 0 };
    const normalized = (raw.data || []).map(normalizeResume);
    return { data: normalized, total: raw.total };
  },

  async getResume(id: string): Promise<{ data?: SavedResume; error?: string }> {
    const response = await api.get<BackendResume>(`/resumes/${id}`);
    if (response.error) return { error: response.error };
    if (!response.data) return { error: 'Resume not found' };
    return { data: normalizeResume(response.data) };
  },

  async createResume(resume: CreateResumeRequest): Promise<{ data?: SavedResume; error?: string }> {
    const payload = toBackendPayload(resume);
    const response = await api.post<BackendResume>('/resumes', payload);
    if (response.error) return { error: response.error };
    if (!response.data) return { error: 'No data returned' };
    return { data: normalizeResume(response.data) };
  },

  async updateResume(id: string, updates: UpdateResumeRequest): Promise<{ data?: SavedResume; error?: string }> {
    const payload = toBackendPayload(updates);
    const response = await api.put<BackendResume>(`/resumes/${id}`, payload);
    if (response.error) return { error: response.error };
    if (!response.data) return { error: 'No data returned' };
    return { data: normalizeResume(response.data) };
  },

  async deleteResume(id: string): Promise<{ data?: void; error?: string }> {
    return api.delete(`/resumes/${id}`);
  },
};
