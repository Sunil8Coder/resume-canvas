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
  User,
  TrendingUp,
  Megaphone,
  Calculator,
  Baby,
  Users,
  Settings,
  Shield,
  Heart,
  Landmark,
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
    tooltip: 'Best for mid-career professionals with 3-10 years of experience. Emphasizes work history, achievements, and progression.',
    recommendedTemplates: ['classic', 'modern', 'executive'],
  },
  {
    id: 'technical',
    name: 'IT / Technical',
    description: 'Software, DevOps, Cloud, Data',
    tooltip: 'Optimized for developers, engineers, and tech professionals. Showcases tech stack, projects, architecture decisions, and performance metrics.',
    recommendedTemplates: ['tech', 'modern', 'compact'],
  },
  {
    id: 'sales',
    name: 'Sales',
    description: 'Revenue & business development',
    tooltip: 'Numbers-heavy resume for sales executives, BDMs, and account managers. Highlights revenue growth, targets achieved, client acquisition, and conversion rates.',
    recommendedTemplates: ['classic', 'executive', 'modern'],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Digital, SEO, Social Media',
    tooltip: 'For digital marketers, SEO specialists, and performance marketers. Focuses on campaign ROI, CTR, engagement growth, and branding strategy.',
    recommendedTemplates: ['modern', 'creative', 'elegant'],
  },
  {
    id: 'finance',
    name: 'Finance / Accounting',
    description: 'CA, Audit, Financial Analysis',
    tooltip: 'Structured and compliance-focused for accountants, CAs, and financial analysts. Highlights financial reporting, tax compliance, GST/VAT, SAP/Tally expertise.',
    recommendedTemplates: ['classic', 'executive', 'elegant'],
  },
  {
    id: 'fresher',
    name: 'Fresher',
    description: 'Fresh graduates & newcomers',
    tooltip: 'For fresh graduates and entry-level candidates. Emphasizes education, internships, academic projects, certifications, and skills over work experience.',
    recommendedTemplates: ['minimal', 'modern', 'compact'],
  },
  {
    id: 'hr',
    name: 'HR',
    description: 'Talent acquisition & HRBP',
    tooltip: 'For HR executives, talent acquisition specialists, and HRBPs. Showcases hiring metrics, employee engagement, policy design, and attrition reduction.',
    recommendedTemplates: ['classic', 'modern', 'elegant'],
  },
  {
    id: 'operations',
    name: 'Operations',
    description: 'Supply chain & manufacturing',
    tooltip: 'For operations managers, supply chain managers, and plant managers. Highlights process optimization, cost reduction, efficiency improvements, and vendor management.',
    recommendedTemplates: ['classic', 'executive', 'compact'],
  },
  {
    id: 'management',
    name: 'Management',
    description: 'Leadership & strategy roles',
    tooltip: 'For project managers, product managers, directors, and team leads. Focuses on team handling, delivery timelines, stakeholder communication, and business impact.',
    recommendedTemplates: ['executive', 'elegant', 'classic'],
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Doctors, nurses, pharmacists',
    tooltip: 'For medical professionals. Emphasizes certifications, clinical expertise, patient care experience, research publications, and specializations.',
    recommendedTemplates: ['classic', 'academic', 'elegant'],
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Design, content, UI/UX',
    tooltip: 'For graphic designers, UI/UX designers, content writers, and video editors. Showcases portfolio, creativity, and design tools like Figma and Photoshop.',
    recommendedTemplates: ['creative', 'modern', 'elegant'],
  },
  {
    id: 'government',
    name: 'Government',
    description: 'Public sector & civil services',
    tooltip: 'For government officials, civil servants, and public sector roles. Highlights policy implementation, public administration, e-governance, and compliance.',
    recommendedTemplates: ['classic', 'academic', 'executive'],
  },
  {
    id: 'entry-level',
    name: 'Entry Level',
    description: 'Early career professionals',
    tooltip: 'Designed for those with 1-3 years of experience. Highlights education, early achievements, and growth potential.',
    recommendedTemplates: ['minimal', 'modern', 'compact'],
  },
  {
    id: 'career-change',
    name: 'Career Change',
    description: 'Switching industries',
    tooltip: 'Perfect for professionals transitioning to a new field. Emphasizes transferable skills and adaptability.',
    recommendedTemplates: ['modern', 'minimal', 'elegant'],
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Research & education',
    tooltip: 'For academia and research. Prioritizes publications, research, teaching, and grants.',
    recommendedTemplates: ['academic', 'classic', 'elegant'],
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'C-suite & senior leadership',
    tooltip: 'For senior executives and C-level positions. Focuses on strategic impact and organizational transformation.',
    recommendedTemplates: ['executive', 'elegant', 'classic'],
  },
  {
    id: 'internship',
    name: 'Internship',
    description: 'Student & intern positions',
    tooltip: 'For students seeking internships. Highlights coursework, projects, and extracurriculars.',
    recommendedTemplates: ['minimal', 'compact', 'modern'],
  },
  {
    id: 'biodata',
    name: 'Biodata',
    description: 'Personal & marriage biodata',
    tooltip: 'Traditional biodata format for marriage proposals and personal profiles.',
    recommendedTemplates: ['biodata', 'elegant', 'classic'],
  },
];

const iconMap: Record<ResumeType, React.ReactNode> = {
  'professional': <Briefcase className="w-4 h-4" />,
  'technical': <Code className="w-4 h-4" />,
  'sales': <TrendingUp className="w-4 h-4" />,
  'marketing': <Megaphone className="w-4 h-4" />,
  'finance': <Calculator className="w-4 h-4" />,
  'fresher': <Baby className="w-4 h-4" />,
  'hr': <Users className="w-4 h-4" />,
  'operations': <Settings className="w-4 h-4" />,
  'management': <Crown className="w-4 h-4" />,
  'healthcare': <Heart className="w-4 h-4" />,
  'creative': <Palette className="w-4 h-4" />,
  'government': <Landmark className="w-4 h-4" />,
  'entry-level': <Rocket className="w-4 h-4" />,
  'career-change': <Repeat className="w-4 h-4" />,
  'academic': <BookOpen className="w-4 h-4" />,
  'executive': <Shield className="w-4 h-4" />,
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
