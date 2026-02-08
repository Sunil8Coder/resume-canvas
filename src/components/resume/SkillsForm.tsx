import React from 'react';
import { Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useResume } from '@/contexts/ResumeContext';
import { cn } from '@/lib/utils';

const skillLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' },
];

export const SkillsForm: React.FC = () => {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResume();
  const { skills } = resumeData;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg border border-border bg-background/50',
              'transition-all duration-fast hover:border-resume-accent/30'
            )}
          >
            <div className="flex-1">
              <Input
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                placeholder="Skill name"
                className="border-0 bg-transparent focus-visible:ring-0 p-0 h-auto text-sm"
              />
            </div>
            <Select
              value={skill.level}
              onValueChange={(value) => updateSkill(skill.id, 'level', value)}
            >
              <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {skillLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeSkill(skill.id)}
              className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={addSkill}
        className="w-full border-dashed border-2 hover:border-resume-accent hover:bg-resume-accent/10 hover:text-foreground"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Skill
      </Button>
    </div>
  );
};
