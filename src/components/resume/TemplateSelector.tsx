import React from 'react';
import { TemplateType } from '@/types/resume';
import { cn } from '@/lib/utils';

interface TemplateSelectorProps {
  selected: TemplateType;
  onSelect: (template: TemplateType) => void;
}

const templates: { id: TemplateType; name: string; description: string }[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional and professional',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Creative with sidebar',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Elegant and refined',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and colorful',
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Developer-focused dark theme',
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Research & education focused',
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Dense two-column layout',
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated with warmth',
  },
  {
    id: 'biodata',
    name: 'Biodata',
    description: 'Personal & marriage biodata',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Bold sidebar with skill bars',
  },
  {
    id: 'timeline',
    name: 'Timeline',
    description: 'Career timeline with green accents',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Two-column with green sidebar',
  },
  {
    id: 'centered',
    name: 'Centered',
    description: 'Clean centered with achievements grid',
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    description: 'Dark teal right sidebar layout',
  },
  {
    id: 'business-project-manager',
    name: 'Business Project Manager',
    description: 'Corporate two-column with achievements',
  },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.id)}
          className={cn(
            'p-3 rounded-lg border-2 transition-all duration-fast text-left',
            'hover:border-resume-accent/50 hover:shadow-sm',
            selected === template.id
              ? 'border-resume-accent bg-resume-accent/15'
              : 'border-border bg-card'
          )}
        >
          <div className={cn(
            "font-medium text-sm",
            selected === template.id ? "text-resume-accent" : "text-foreground"
          )}>{template.name}</div>
          <div className={cn(
            "text-xs mt-0.5",
            selected === template.id ? "text-resume-accent/70" : "text-muted-foreground"
          )}>{template.description}</div>
        </button>
      ))}
    </div>
  );
};
