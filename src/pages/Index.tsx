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
      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 73px)' }}>
        {/* Sidebar Navigation */}
        <aside className="w-16 lg:w-56 bg-card border-r border-border flex flex-col shrink-0">
          <nav className="flex flex-col gap-1 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-fast',
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {tab.icon}
                <span className="hidden lg:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Form Panel */}
        <div className="flex-1 lg:max-w-md xl:max-w-lg bg-panel overflow-y-auto border-r border-border">
          <div className="p-6 space-y-6">
            {/* Template Selection */}
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-foreground">Choose Template</h2>
              <TemplateSelector selected={selectedTemplate} onSelect={setSelectedTemplate} />
            </div>

            {/* Form Content */}
            <div className="min-h-[400px]">
              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="flex-1 bg-muted/30 overflow-auto">
          <div className="p-6">
            <div className="overflow-hidden rounded-xl shadow-2xl" style={{ width: 'fit-content' }}>
              <ResumePreview data={resumeData} template={selectedTemplate} />
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
