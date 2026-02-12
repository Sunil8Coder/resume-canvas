import React from 'react';
import { ResumeData, TemplateType, FontFamily, fontFamilyMap } from '@/types/resume';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { TechTemplate } from './templates/TechTemplate';
import { AcademicTemplate } from './templates/AcademicTemplate';
import { CompactTemplate } from './templates/CompactTemplate';
import { ElegantTemplate } from './templates/ElegantTemplate';
import { BiodataTemplate } from './templates/BiodataTemplate';
import { CorporateTemplate } from './templates/CorporateTemplate';
import { TimelineTemplate } from './templates/TimelineTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { CenteredTemplate } from './templates/CenteredTemplate';
import { SidebarTemplate } from './templates/SidebarTemplate';
import { BusinessProjectManagerTemplate } from './templates/BusinessProjectManagerTemplate';

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
  fontFamily?: FontFamily;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template, fontFamily = 'default' }) => {
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
      case 'biodata':
        return <BiodataTemplate data={data} />;
      case 'corporate':
        return <CorporateTemplate data={data} />;
      case 'timeline':
        return <TimelineTemplate data={data} />;
      case 'professional':
        return <ProfessionalTemplate data={data} />;
      case 'centered':
        return <CenteredTemplate data={data} />;
      case 'sidebar':
        return <SidebarTemplate data={data} />;
      case 'business-project-manager':
        return <BusinessProjectManagerTemplate data={data} />;
      case 'classic':
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  const fontStyle = fontFamily !== 'default' ? fontFamilyMap[fontFamily] : undefined;

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
      {fontStyle ? (
        <div style={{ fontFamily: fontStyle }} className="resume-font-override min-h-full">
          {renderTemplate()}
        </div>
      ) : (
        renderTemplate()
      )}
    </div>
  );
};
