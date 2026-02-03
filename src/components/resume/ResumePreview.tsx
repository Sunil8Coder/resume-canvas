import React from 'react';
import { ResumeData, TemplateType } from '@/types/resume';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { TechTemplate } from './templates/TechTemplate';
import { AcademicTemplate } from './templates/AcademicTemplate';
import { CompactTemplate } from './templates/CompactTemplate';
import { ElegantTemplate } from './templates/ElegantTemplate';

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
      case 'executive':
        return <ExecutiveTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'tech':
        return <TechTemplate data={data} />;
      case 'academic':
        return <AcademicTemplate data={data} />;
      case 'compact':
        return <CompactTemplate data={data} />;
      case 'elegant':
        return <ElegantTemplate data={data} />;
      case 'classic':
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  return (
    <div 
      id="resume-preview" 
      className="bg-white shadow-xl overflow-hidden print:shadow-none"
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
