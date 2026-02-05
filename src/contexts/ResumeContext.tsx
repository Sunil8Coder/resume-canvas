import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ResumeData, TemplateType, ResumeType, defaultResumeData } from '@/types/resume';

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  selectedTemplate: TemplateType;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<TemplateType>>;
  selectedResumeType: ResumeType;
  setSelectedResumeType: React.Dispatch<React.SetStateAction<ResumeType>>;
  currentResumeId: string | null;
  setCurrentResumeId: React.Dispatch<React.SetStateAction<string | null>>;
  resumeTitle: string;
  setResumeTitle: React.Dispatch<React.SetStateAction<string>>;
  updatePersonalInfo: (field: string, value: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, field: string, value: string | boolean) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, field: string, value: string) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, field: string, value: string) => void;
  removeSkill: (id: string) => void;
  reorderSections: (newOrder: string[]) => void;
  loadResume: (id: string | null, title: string, data: ResumeData, template: TemplateType, resumeType: ResumeType) => void;
  resetResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('classic');
  const [selectedResumeType, setSelectedResumeType] = useState<ResumeType>('professional');
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [resumeTitle, setResumeTitle] = useState<string>('My Resume');

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    setResumeData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExp],
    }));
  };

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id),
    }));
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id),
    }));
  };

  const addSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: '',
      level: 'intermediate' as const,
    };
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const updateSkill = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id),
    }));
  };

  const reorderSections = (newOrder: string[]) => {
    setResumeData(prev => ({
      ...prev,
      sectionOrder: newOrder,
    }));
  };

  const loadResume = (id: string | null, title: string, data: ResumeData, template: TemplateType, resumeType: ResumeType) => {
    setCurrentResumeId(id);
    setResumeTitle(title);
    setResumeData(data);
    setSelectedTemplate(template);
    setSelectedResumeType(resumeType);
  };

  const resetResume = () => {
    setCurrentResumeId(null);
    setResumeTitle('My Resume');
    setResumeData(defaultResumeData);
    setSelectedTemplate('classic');
    setSelectedResumeType('professional');
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        selectedTemplate,
        setSelectedTemplate,
        selectedResumeType,
        setSelectedResumeType,
        currentResumeId,
        setCurrentResumeId,
        resumeTitle,
        setResumeTitle,
        updatePersonalInfo,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
        reorderSections,
        loadResume,
        resetResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
