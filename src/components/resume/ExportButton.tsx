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

export const ExportButton: React.FC = () => {
  const { resumeData } = useResume();

  const handleExportPDF = async () => {
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
