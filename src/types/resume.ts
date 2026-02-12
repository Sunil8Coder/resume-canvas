export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
  linkedin?: string;
  website?: string;
  photo?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export type FontFamily = 'default' | 'serif' | 'sans-serif' | 'georgia' | 'times' | 'garamond' | 'palatino' | 'calibri' | 'arial' | 'helvetica' | 'trebuchet' | 'verdana' | 'cambria';

export const fontFamilyMap: Record<FontFamily, string> = {
  'default': 'inherit',
  'serif': 'Georgia, "Times New Roman", Times, serif',
  'sans-serif': '"Helvetica Neue", Arial, sans-serif',
  'georgia': 'Georgia, serif',
  'times': '"Times New Roman", Times, serif',
  'garamond': 'Garamond, "EB Garamond", serif',
  'palatino': '"Palatino Linotype", "Book Antiqua", Palatino, serif',
  'calibri': 'Calibri, "Gill Sans", sans-serif',
  'arial': 'Arial, Helvetica, sans-serif',
  'helvetica': '"Helvetica Neue", Helvetica, Arial, sans-serif',
  'trebuchet': '"Trebuchet MS", "Lucida Sans", sans-serif',
  'verdana': 'Verdana, Geneva, sans-serif',
  'cambria': 'Cambria, Georgia, serif',
};

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  sectionOrder: string[];
  fontFamily?: FontFamily;
}

export type TemplateType = 'classic' | 'modern' | 'minimal' | 'executive' | 'creative' | 'tech' | 'academic' | 'compact' | 'elegant' | 'biodata' | 'corporate' | 'timeline' | 'professional' | 'centered' | 'sidebar' | 'business-project-manager';

export type ResumeType = 'professional' | 'entry-level' | 'career-change' | 'academic' | 'technical' | 'executive' | 'creative' | 'internship' | 'biodata' | 'sales' | 'marketing' | 'finance' | 'fresher' | 'hr' | 'operations' | 'management' | 'healthcare' | 'government';

export interface ResumeTypeInfo {
  id: ResumeType;
  name: string;
  description: string;
  tooltip: string;
  recommendedTemplates: TemplateType[];
}

export { defaultResumeData } from '@/data/defaultResumeData';
