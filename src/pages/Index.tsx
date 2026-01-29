import React, { useState } from 'react';
import { PersonalInfoForm } from '@/components/resume/PersonalInfoForm';
import { ExperienceForm } from '@/components/resume/ExperienceForm';
import { EducationForm } from '@/components/resume/EducationForm';
import { SkillsForm } from '@/components/resume/SkillsForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { TemplateSelector } from '@/components/resume/TemplateSelector';
import { ExportButton } from '@/components/resume/ExportButton';
import { ResumeProvider, useResume } from '@/contexts/ResumeContext';
import { FileText, User, Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type TabId = 'personal' | 'experience' | 'education' | 'skills';

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'personal', label: 'Personal', icon: <User className="w-4 h-4" /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'skills', label: 'Skills', icon: <Sparkles className="w-4 h-4" /> },
];

const ResumeBuilderContent: React.FC = () => {
  const { resumeData, selectedTemplate, setSelectedTemplate } = useResume();
  const [activeTab, setActiveTab] = useState<TabId>('personal');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Resume Builder</h1>
              <p className="text-xs text-muted-foreground">Create your professional resume</p>
            </div>
          </div>
          <ExportButton />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Form Panel */}
        <div className="w-full lg:w-1/2 xl:w-2/5 border-r border-border bg-panel overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Template Selection */}
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-foreground">Choose Template</h2>
              <TemplateSelector selected={selectedTemplate} onSelect={setSelectedTemplate} />
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-border">
              <nav className="flex gap-1 -mb-px overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-fast whitespace-nowrap',
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    )}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-full lg:w-1/2 xl:w-3/5 bg-muted/30 overflow-auto min-h-screen">
          <div className="p-6">
            <div className="sticky top-6">
              <div className="overflow-hidden rounded-xl shadow-2xl" style={{ width: 'fit-content' }}>
                <ResumePreview data={resumeData} template={selectedTemplate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <ResumeProvider>
      <ResumeBuilderContent />
    </ResumeProvider>
  );
};

export default Index;
