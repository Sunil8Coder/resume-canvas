import React, { ReactNode, useState } from 'react';
import { ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';

interface FormSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
  isDragging?: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  icon,
  children,
  defaultOpen = true,
  dragHandleProps,
  isDragging = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        'bg-card rounded-xl border border-border overflow-hidden transition-all duration-normal',
        'hover:border-resume-accent/30 hover:shadow-sm',
        isDragging && 'shadow-lg border-resume-accent/50 rotate-1'
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-panel-header hover:bg-muted/50 transition-colors duration-fast"
      >
        <div className="flex items-center gap-3">
          {dragHandleProps && (
            <div
              {...dragHandleProps}
              className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <GripVertical className="w-4 h-4" />
            </div>
          )}
          {icon && <span className="text-resume-accent">{icon}</span>}
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <span className="text-muted-foreground">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </span>
      </button>
      <div
        className={cn(
          'transition-all duration-normal overflow-hidden',
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="p-4 space-y-4">{children}</div>
      </div>
    </div>
  );
};
