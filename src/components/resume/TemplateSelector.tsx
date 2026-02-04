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
              ? 'border-resume-accent bg-resume-accent-light'
              : 'border-border bg-card'
          )}
        >
          <div className="font-medium text-foreground text-sm">{template.name}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{template.description}</div>
        </button>
      ))}
    </div>
  );
};
