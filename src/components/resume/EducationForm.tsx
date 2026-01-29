import React from 'react';
import { GraduationCap, Plus, Trash2, Building, BookOpen, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FormSection } from './FormSection';
import { useResume } from '@/contexts/ResumeContext';
import { cn } from '@/lib/utils';
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';

interface EducationFormProps {
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
  isDragging?: boolean;
}

export const EducationForm: React.FC<EducationFormProps> = ({
  dragHandleProps,
  isDragging,
}) => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const { education } = resumeData;

  return (
    <FormSection
      title="Education"
      icon={<GraduationCap className="w-5 h-5" />}
      dragHandleProps={dragHandleProps}
      isDragging={isDragging}
    >
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div
            key={edu.id}
            className={cn(
              'p-4 rounded-lg border border-border bg-background/50',
              'transition-all duration-fast hover:border-resume-accent/30'
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                Education #{index + 1}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(edu.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label className="text-sm font-medium">Institution</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    placeholder="University Name"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Degree</Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="Bachelor of Science"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Field of Study</Label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    placeholder="Computer Science"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Start Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">End Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">GPA (Optional)</Label>
                <Input
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  placeholder="3.8"
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addEducation}
          className="w-full border-dashed border-2 hover:border-resume-accent hover:text-resume-accent"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>
    </FormSection>
  );
};
