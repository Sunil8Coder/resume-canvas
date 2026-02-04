import React from 'react';
import { ResumeType, ResumeTypeInfo, TemplateType } from '@/types/resume';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { 
  Briefcase, 
  GraduationCap, 
  Repeat, 
  BookOpen, 
  Code, 
  Crown, 
  Palette, 
  Rocket,
  Info,
  User
} from 'lucide-react';

interface ResumeTypeSelectorProps {
  selected: ResumeType;
  onSelect: (type: ResumeType, recommendedTemplates: TemplateType[]) => void;
}

const resumeTypes: ResumeTypeInfo[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Standard corporate resume',
    tooltip: 'Best for mid-career professionals with 3-10 years of experience. Emphasizes work history, achievements, and progression. Ideal for corporate roles, management positions, and established industries.',
    recommendedTemplates: ['classic', 'modern', 'executive'],
  },
  {
    id: 'entry-level',
    name: 'Entry Level',
    description: 'Fresh graduates & newcomers',
    tooltip: 'Designed for recent graduates or those with limited work experience. Highlights education, skills, internships, and potential. Great for your first job or early career moves.',
    recommendedTemplates: ['minimal', 'modern', 'compact'],
  },
  {
    id: 'career-change',
    name: 'Career Change',
    description: 'Switching industries',
    tooltip: 'Perfect for professionals transitioning to a new field. Emphasizes transferable skills, relevant achievements, and adaptability. Helps bridge the gap between past experience and new goals.',
    recommendedTemplates: ['modern', 'minimal', 'elegant'],
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Research & education',
    tooltip: 'Tailored for academia, research, and educational positions. Prioritizes publications, research experience, teaching, grants, and academic achievements. Essential for faculty, researcher, and PhD roles.',
    recommendedTemplates: ['academic', 'classic', 'elegant'],
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'IT & engineering roles',
    tooltip: 'Optimized for software developers, engineers, and tech professionals. Showcases technical skills, projects, and programming languages prominently. Perfect for startups and tech companies.',
    recommendedTemplates: ['tech', 'modern', 'compact'],
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'C-suite & senior leadership',
    tooltip: 'Designed for senior executives and C-level positions. Focuses on leadership achievements, strategic impact, board experience, and organizational transformation. Conveys authority and expertise.',
    recommendedTemplates: ['executive', 'elegant', 'classic'],
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Design & arts fields',
    tooltip: 'Made for designers, artists, marketers, and creative professionals. Allows personality and creativity to shine through. Often paired with a portfolio. Great for agencies and creative studios.',
    recommendedTemplates: ['creative', 'modern', 'elegant'],
  },
  {
    id: 'internship',
    name: 'Internship',
    description: 'Student & intern positions',
    tooltip: 'Specifically for students seeking internships or co-op positions. Highlights coursework, projects, extracurriculars, and relevant skills. Shows potential and eagerness to learn.',
    recommendedTemplates: ['minimal', 'compact', 'modern'],
  },
  {
    id: 'biodata',
    name: 'Biodata',
    description: 'Personal & marriage biodata',
    tooltip: 'Traditional biodata format commonly used in South Asia for marriage proposals, personal profiles, and formal introductions. Includes personal details, family background, education, and interests.',
    recommendedTemplates: ['biodata', 'elegant', 'classic'],
  },
];

const iconMap: Record<ResumeType, React.ReactNode> = {
  'professional': <Briefcase className="w-4 h-4" />,
  'entry-level': <Rocket className="w-4 h-4" />,
  'career-change': <Repeat className="w-4 h-4" />,
  'academic': <BookOpen className="w-4 h-4" />,
  'technical': <Code className="w-4 h-4" />,
  'executive': <Crown className="w-4 h-4" />,
  'creative': <Palette className="w-4 h-4" />,
  'internship': <GraduationCap className="w-4 h-4" />,
  'biodata': <User className="w-4 h-4" />,
};

export const ResumeTypeSelector: React.FC<ResumeTypeSelectorProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {resumeTypes.map((type) => (
          <Tooltip key={type.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => onSelect(type.id, type.recommendedTemplates)}
                className={cn(
                  'relative p-3 rounded-lg border-2 transition-all duration-200 text-left group',
                  'hover:border-primary/50 hover:shadow-sm',
                  selected === type.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card'
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className={cn(
                    'p-1.5 rounded-md',
                    selected === type.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  )}>
                    {iconMap[type.id]}
                  </div>
                  <Info className="w-3.5 h-3.5 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="mt-2">
                  <div className="font-medium text-foreground text-sm">{type.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{type.description}</div>
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent 
              side="bottom" 
              className="max-w-xs p-3 bg-popover text-popover-foreground"
            >
              <p className="text-sm leading-relaxed">{type.tooltip}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Recommended templates: {type.recommendedTemplates.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')}
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};
