import React from 'react';
import { FontFamily, fontFamilyMap } from '@/types/resume';
import { cn } from '@/lib/utils';
import { Type } from 'lucide-react';

interface FontSelectorProps {
  selected: FontFamily;
  onSelect: (font: FontFamily) => void;
}

const fonts: { id: FontFamily; name: string; preview: string }[] = [
  { id: 'default', name: 'Default', preview: 'Template default' },
  { id: 'serif', name: 'Serif', preview: 'Classic elegance' },
  { id: 'sans-serif', name: 'Sans Serif', preview: 'Clean modern' },
  { id: 'georgia', name: 'Georgia', preview: 'Warm & readable' },
  { id: 'times', name: 'Times New Roman', preview: 'Traditional' },
  { id: 'garamond', name: 'Garamond', preview: 'Refined literary' },
  { id: 'palatino', name: 'Palatino', preview: 'Book-style serif' },
  { id: 'calibri', name: 'Calibri', preview: 'Business standard' },
  { id: 'arial', name: 'Arial', preview: 'Universal clean' },
  { id: 'helvetica', name: 'Helvetica', preview: 'Swiss precision' },
  { id: 'trebuchet', name: 'Trebuchet MS', preview: 'Friendly modern' },
  { id: 'verdana', name: 'Verdana', preview: 'Screen-optimized' },
  { id: 'cambria', name: 'Cambria', preview: 'Formal elegance' },
];

export const FontSelector: React.FC<FontSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
      {fonts.map((font) => (
        <button
          key={font.id}
          onClick={() => onSelect(font.id)}
          className={cn(
            'p-3 border-2 transition-all duration-150 text-left',
            'hover:border-resume-accent/50 hover:shadow-sm',
            selected === font.id
              ? 'border-resume-accent bg-resume-accent/15'
              : 'border-border bg-card'
          )}
        >
          <div
            className={cn(
              'font-medium text-sm truncate',
              selected === font.id ? 'text-resume-accent' : 'text-foreground'
            )}
            style={{ fontFamily: fontFamilyMap[font.id] !== 'inherit' ? fontFamilyMap[font.id] : undefined }}
          >
            {font.name}
          </div>
          <div className={cn(
            'text-xs mt-0.5',
            selected === font.id ? 'text-resume-accent/70' : 'text-muted-foreground'
          )}>
            {font.preview}
          </div>
        </button>
      ))}
    </div>
  );
};
