import { api } from "@/lib/api";
import { CoverLetterData, CoverLetterProfession } from "@/types/coverLetter";

interface BackendCoverLetter {
  id: string;
  title: string;
  profession: string;
  content: string;
  created_at: string;
  updated_at?: string;
  userId?: string;
  user_id?: string;
}

export interface SavedCoverLetter {
  id: string;
  userId: string;
  title: string;
  profession: CoverLetterProfession;
  data: CoverLetterData;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCoverLetterRequest {
  title: string;
  profession: CoverLetterProfession;
  data: CoverLetterData;
}

export interface UpdateCoverLetterRequest {
  title?: string;
  profession?: CoverLetterProfession;
  data?: CoverLetterData;
}

function normalizeCoverLetter(raw: BackendCoverLetter): SavedCoverLetter {
  let parsedData: CoverLetterData;
  try {
    let content = raw.content as unknown;
    if (typeof content === "string") content = JSON.parse(content);
    if (typeof content === "string") content = JSON.parse(content);
    parsedData = content as CoverLetterData;
  } catch {
    console.error("Failed to parse cover letter content:", raw.content);
    parsedData = {
      profession: (raw.profession as CoverLetterProfession) || "it",
      recipientName: "",
      recipientTitle: "",
      companyName: "",
      companyAddress: "",
      senderName: "",
      senderTitle: "",
      senderEmail: "",
      senderPhone: "",
      senderAddress: "",
      date: "",
      body: "",
      closing: "Sincerely",
    };
  }

  return {
    id: raw.id,
    userId: raw.userId || raw.user_id || "",
    title: raw.title || "Untitled Cover Letter",
    profession: (raw.profession as CoverLetterProfession) || "it",
    data: parsedData,
    createdAt: raw.created_at || new Date().toISOString(),
    updatedAt: raw.updated_at || raw.created_at || new Date().toISOString(),
  };
}

function toBackendPayload(request: CreateCoverLetterRequest | UpdateCoverLetterRequest) {
  const payload: Record<string, unknown> = {};
  if ("title" in request && request.title !== undefined) payload.title = request.title;
  if ("profession" in request && request.profession !== undefined) payload.profession = request.profession;
  if ("data" in request && request.data !== undefined) payload.content = JSON.stringify(request.data);
  return payload;
}

export const coverLetterService = {
  async listCoverLetters(): Promise<{ data?: SavedCoverLetter[]; total?: number; error?: string }> {
    const response = await api.get<{ data: BackendCoverLetter[]; total: number }>("/cover-letters");
    if (response.error) return { error: response.error };
    const raw = response.data;
    if (!raw) return { data: [], total: 0 };
    return { data: (raw.data || []).map(normalizeCoverLetter), total: raw.total };
  },

  async getCoverLetter(id: string): Promise<{ data?: SavedCoverLetter; error?: string }> {
    const response = await api.get<BackendCoverLetter>(`/cover-letters/${id}`);
    if (response.error) return { error: response.error };
    if (!response.data) return { error: "Cover letter not found" };
    return { data: normalizeCoverLetter(response.data) };
  },

  async createCoverLetter(cl: CreateCoverLetterRequest): Promise<{ data?: SavedCoverLetter; error?: string }> {
    const payload = toBackendPayload(cl);
    const response = await api.post<BackendCoverLetter>("/cover-letters", payload);
    if (response.error) return { error: response.error };
    if (!response.data) return { error: "No data returned" };
    return { data: normalizeCoverLetter(response.data) };
  },

  async updateCoverLetter(id: string, updates: UpdateCoverLetterRequest): Promise<{ data?: SavedCoverLetter; error?: string }> {
    const payload = toBackendPayload(updates);
    const response = await api.put<BackendCoverLetter>(`/cover-letters/${id}`, payload);
    if (response.error) return { error: response.error };
    if (!response.data) return { error: "No data returned" };
    return { data: normalizeCoverLetter(response.data) };
  },

  async deleteCoverLetter(id: string): Promise<{ data?: void; error?: string }> {
    return api.delete(`/cover-letters/${id}`);
  },
};
