import React from 'react';
import { ResumeData, TemplateType } from '@/types/resume';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template }) => {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'classic':
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  return (
    <div 
      id="resume-preview" 
      className="bg-white shadow-xl rounded-lg overflow-hidden"
      style={{ 
        width: '210mm', 
        minHeight: '297mm',
        transform: 'scale(0.6)',
        transformOrigin: 'top left',
      }}
    >
      {renderTemplate()}
    </div>
  );
};
