import React from 'react';
import { useTheme, themeOptions, ColorTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { Check, Palette } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

const themePreviewColors: Record<ColorTheme, string> = {
  blue: 'bg-[hsl(217,91%,60%)]',
  emerald: 'bg-[hsl(160,84%,39%)]',
  violet: 'bg-[hsl(263,70%,50%)]',
  rose: 'bg-[hsl(347,77%,50%)]',
  amber: 'bg-[hsl(38,92%,50%)]',
  teal: 'bg-[hsl(174,72%,40%)]',
  slate: 'bg-[hsl(215,25%,27%)]',
};

export const ThemeSelector: React.FC = () => {
  const { colorTheme, setColorTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <div className={cn('w-4 h-4 rounded-full', themePreviewColors[colorTheme])} />
          <Palette className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3" align="end">
        <p className="text-sm font-medium text-foreground mb-3">Color Theme</p>
        <div className="grid grid-cols-1 gap-1.5">
          {themeOptions.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setColorTheme(theme.id)}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                colorTheme === theme.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted'
              )}
            >
              <div className={cn('w-5 h-5 rounded-full shrink-0', themePreviewColors[theme.id])} />
              <span className="flex-1 text-left">{theme.label}</span>
              {colorTheme === theme.id && <Check className="w-4 h-4 text-primary" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
