import { api } from '@/lib/api';
import { ResumeData, TemplateType, ResumeType } from '@/types/resume';

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

export const resumeService = {
  async listResumes(): Promise<{ data?: SavedResume[]; error?: string }> {
    return api.get<SavedResume[]>('/resumes');
  },

  async getResume(id: string): Promise<{ data?: SavedResume; error?: string }> {
    return api.get<SavedResume>(`/resumes/${id}`);
  },

  async createResume(resume: CreateResumeRequest): Promise<{ data?: SavedResume; error?: string }> {
    return api.post<SavedResume>('/resumes', resume);
  },

  async updateResume(id: string, updates: UpdateResumeRequest): Promise<{ data?: SavedResume; error?: string }> {
    return api.put<SavedResume>(`/resumes/${id}`, updates);
  },

  async deleteResume(id: string): Promise<{ data?: void; error?: string }> {
    return api.delete(`/resumes/${id}`);
  },
};
