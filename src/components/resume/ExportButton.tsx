import React from 'react';
import { FileDown, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { exportToPDF, exportToWord } from '@/utils/exportResume';
import { useResume } from '@/contexts/ResumeContext';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { resumeService } from '@/services/resumeService';

export const ExportButton: React.FC = () => {
  const { resumeData, selectedTemplate, selectedResumeType, currentResumeId, setCurrentResumeId, resumeTitle } = useResume();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = React.useState(false);

  const requireAuth = () => {
    // Persist resume state so data survives the auth redirect
    sessionStorage.setItem('pendingResume', JSON.stringify({
      data: resumeData,
      template: selectedTemplate,
      resumeType: selectedResumeType,
      title: resumeTitle,
    }));
    toast({
      title: 'Login Required',
      description: 'Please login to download your resume. Your data has been saved.',
      variant: 'destructive',
    });
    navigate('/auth?redirect=export');
  };

  const saveResumeToBackend = async (): Promise<boolean> => {
    setIsSaving(true);
    try {
      if (currentResumeId) {
        // Update existing resume
        const result = await resumeService.updateResume(currentResumeId, {
          title: resumeTitle,
          templateType: selectedTemplate,
          resumeType: selectedResumeType,
          data: resumeData,
        });
        if (result.error) {
          toast({
            title: 'Save Failed',
            description: result.error,
            variant: 'destructive',
          });
          return false;
        }
      } else {
        // Create new resume
        const result = await resumeService.createResume({
          title: resumeTitle,
          templateType: selectedTemplate,
          resumeType: selectedResumeType,
          data: resumeData,
        });
        if (result.error) {
          toast({
            title: 'Save Failed',
            description: result.error,
            variant: 'destructive',
          });
          return false;
        }
        if (result.data?.id) {
          setCurrentResumeId(result.data.id);
        }
      }
      return true;
    } catch {
      toast({
        title: 'Save Failed',
        description: 'Could not save resume to server.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportPDF = async () => {
    if (!isAuthenticated) {
      requireAuth();
      return;
    }
    
    const saved = await saveResumeToBackend();
    if (!saved) return;
    
    try {
      await exportToPDF();
      toast({
        title: 'Resume saved & exported!',
        description: 'Your resume has been saved and downloaded as PDF.',
      });
    } catch {
      toast({
        title: 'Export failed',
        description: 'There was an error exporting your resume.',
        variant: 'destructive',
      });
    }
  };

  const handleExportWord = async () => {
    if (!isAuthenticated) {
      requireAuth();
      return;
    }
    
    const saved = await saveResumeToBackend();
    if (!saved) return;
    
    try {
      await exportToWord(resumeData);
      toast({
        title: 'Resume saved & exported!',
        description: 'Your resume has been saved and downloaded as .docx.',
      });
    } catch {
      toast({
        title: 'Export failed',
        description: 'There was an error exporting your resume.',
        variant: 'destructive',
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2" disabled={isSaving}>
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
          {isSaving ? 'Saving...' : 'Export'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportPDF} className="cursor-pointer" disabled={isSaving}>
          <FileText className="w-4 h-4 mr-2" />
          Download PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportWord} className="cursor-pointer" disabled={isSaving}>
          <FileText className="w-4 h-4 mr-2" />
          Download Word (.docx)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
