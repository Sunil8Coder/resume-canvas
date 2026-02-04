import { useState, useCallback } from 'react';
import { resumeService, SavedResume, CreateResumeRequest, UpdateResumeRequest } from '@/services/resumeService';
import { useToast } from '@/hooks/use-toast';

export const useResumes = () => {
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchResumes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    const response = await resumeService.listResumes();
    
    setIsLoading(false);
    
    if (response.error) {
      setError(response.error);
      toast({
        title: "Error",
        description: response.error,
        variant: "destructive",
      });
      return;
    }
    
    if (response.data) {
      setResumes(response.data);
    }
  }, [toast]);

  const getResume = useCallback(async (id: string): Promise<SavedResume | null> => {
    setIsLoading(true);
    setError(null);
    
    const response = await resumeService.getResume(id);
    
    setIsLoading(false);
    
    if (response.error) {
      setError(response.error);
      toast({
        title: "Error",
        description: response.error,
        variant: "destructive",
      });
      return null;
    }
    
    return response.data || null;
  }, [toast]);

  const createResume = useCallback(async (data: CreateResumeRequest): Promise<SavedResume | null> => {
    setIsLoading(true);
    setError(null);
    
    const response = await resumeService.createResume(data);
    
    setIsLoading(false);
    
    if (response.error) {
      setError(response.error);
      toast({
        title: "Error",
        description: response.error,
        variant: "destructive",
      });
      return null;
    }
    
    if (response.data) {
      setResumes(prev => [...prev, response.data!]);
      toast({
        title: "Success",
        description: "Resume created successfully",
      });
      return response.data;
    }
    
    return null;
  }, [toast]);

  const updateResume = useCallback(async (id: string, updates: UpdateResumeRequest): Promise<SavedResume | null> => {
    setIsLoading(true);
    setError(null);
    
    const response = await resumeService.updateResume(id, updates);
    
    setIsLoading(false);
    
    if (response.error) {
      setError(response.error);
      toast({
        title: "Error",
        description: response.error,
        variant: "destructive",
      });
      return null;
    }
    
    if (response.data) {
      setResumes(prev => prev.map(r => r.id === id ? response.data! : r));
      toast({
        title: "Success",
        description: "Resume updated successfully",
      });
      return response.data;
    }
    
    return null;
  }, [toast]);

  const deleteResume = useCallback(async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    const response = await resumeService.deleteResume(id);
    
    setIsLoading(false);
    
    if (response.error) {
      setError(response.error);
      toast({
        title: "Error",
        description: response.error,
        variant: "destructive",
      });
      return false;
    }
    
    setResumes(prev => prev.filter(r => r.id !== id));
    toast({
      title: "Success",
      description: "Resume deleted successfully",
    });
    return true;
  }, [toast]);

  return {
    resumes,
    isLoading,
    error,
    fetchResumes,
    getResume,
    createResume,
    updateResume,
    deleteResume,
  };
};
