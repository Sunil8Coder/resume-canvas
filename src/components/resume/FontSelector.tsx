import React from 'react';
import { FontFamily, fontFamilyMap } from '@/types/resume';
import { Type } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FontSelectorProps {
  selected: FontFamily;
  onSelect: (font: FontFamily) => void;
}

const fonts: { id: FontFamily; name: string }[] = [
  { id: 'default', name: 'Default' },
  { id: 'serif', name: 'Serif' },
  { id: 'sans-serif', name: 'Sans Serif' },
  { id: 'georgia', name: 'Georgia' },
  { id: 'times', name: 'Times New Roman' },
  { id: 'garamond', name: 'Garamond' },
  { id: 'palatino', name: 'Palatino' },
  { id: 'calibri', name: 'Calibri' },
  { id: 'arial', name: 'Arial' },
  { id: 'helvetica', name: 'Helvetica' },
  { id: 'trebuchet', name: 'Trebuchet MS' },
  { id: 'verdana', name: 'Verdana' },
  { id: 'cambria', name: 'Cambria' },
];

export const FontSelector: React.FC<FontSelectorProps> = ({ selected, onSelect }) => {
  return (
    <Select value={selected} onValueChange={(val) => onSelect(val as FontFamily)}>
      <SelectTrigger className="w-[220px] gap-2">
        <Type className="w-4 h-4 text-muted-foreground" />
        <SelectValue placeholder="Choose font style" />
      </SelectTrigger>
      <SelectContent className="z-50 bg-popover">
        {fonts.map((font) => (
          <SelectItem
            key={font.id}
            value={font.id}
            style={{ fontFamily: fontFamilyMap[font.id] !== 'inherit' ? fontFamilyMap[font.id] : undefined }}
          >
            {font.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
