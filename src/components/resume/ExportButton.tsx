import React from 'react';
import { FileDown, FileText } from 'lucide-react';
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

export const ExportButton: React.FC = () => {
  const { resumeData } = useResume();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const requireAuth = () => {
    toast({
      title: 'Login Required',
      description: 'Please login to download your resume.',
      variant: 'destructive',
    });
    navigate('/auth');
  };

  const handleExportPDF = async () => {
    if (!isAuthenticated) {
      requireAuth();
      return;
    }
    try {
      await exportToPDF();
      toast({
        title: 'PDF exported!',
        description: 'Your resume has been downloaded as a PDF file.',
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
    try {
      await exportToWord(resumeData);
      toast({
        title: 'Word document exported!',
        description: 'Your resume has been downloaded as a .docx file.',
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
        <Button className="gap-2">
          <FileDown className="w-4 h-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportPDF} className="cursor-pointer">
          <FileText className="w-4 h-4 mr-2" />
          Download PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportWord} className="cursor-pointer">
          <FileText className="w-4 h-4 mr-2" />
          Download Word (.docx)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
