import { useState, useCallback } from 'react';
import { coverLetterService, SavedCoverLetter, CreateCoverLetterRequest, UpdateCoverLetterRequest } from '@/services/coverLetterService';
import { useToast } from '@/hooks/use-toast';

export const useCoverLetters = () => {
  const [coverLetters, setCoverLetters] = useState<SavedCoverLetter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCoverLetters = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const response = await coverLetterService.listCoverLetters();
    setIsLoading(false);
    if (response.error) {
      setError(response.error);
      toast({ title: "Error", description: response.error, variant: "destructive" });
      return;
    }
    if (response.data) setCoverLetters(response.data);
  }, [toast]);

  const createCoverLetter = useCallback(async (data: CreateCoverLetterRequest): Promise<SavedCoverLetter | null> => {
    setIsLoading(true);
    setError(null);
    const response = await coverLetterService.createCoverLetter(data);
    setIsLoading(false);
    if (response.error) {
      setError(response.error);
      toast({ title: "Error", description: response.error, variant: "destructive" });
      return null;
    }
    if (response.data) {
      setCoverLetters(prev => [...prev, response.data!]);
      toast({ title: "Success", description: "Cover letter saved successfully" });
      return response.data;
    }
    return null;
  }, [toast]);

  const updateCoverLetter = useCallback(async (id: string, updates: UpdateCoverLetterRequest): Promise<SavedCoverLetter | null> => {
    setIsLoading(true);
    setError(null);
    const response = await coverLetterService.updateCoverLetter(id, updates);
    setIsLoading(false);
    if (response.error) {
      setError(response.error);
      toast({ title: "Error", description: response.error, variant: "destructive" });
      return null;
    }
    if (response.data) {
      setCoverLetters(prev => prev.map(c => c.id === id ? response.data! : c));
      toast({ title: "Success", description: "Cover letter updated successfully" });
      return response.data;
    }
    return null;
  }, [toast]);

  const deleteCoverLetter = useCallback(async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    const response = await coverLetterService.deleteCoverLetter(id);
    setIsLoading(false);
    if (response.error) {
      setError(response.error);
      toast({ title: "Error", description: response.error, variant: "destructive" });
      return false;
    }
    setCoverLetters(prev => prev.filter(c => c.id !== id));
    toast({ title: "Success", description: "Cover letter deleted successfully" });
    return true;
  }, [toast]);

  return { coverLetters, isLoading, error, fetchCoverLetters, createCoverLetter, updateCoverLetter, deleteCoverLetter };
};
