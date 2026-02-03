import React, { useState } from 'react';
import { PersonalInfoForm } from '@/components/resume/PersonalInfoForm';
import { ExperienceForm } from '@/components/resume/ExperienceForm';
import { EducationForm } from '@/components/resume/EducationForm';
import { SkillsForm } from '@/components/resume/SkillsForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { TemplateSelector } from '@/components/resume/TemplateSelector';
import { ResumeTypeSelector } from '@/components/resume/ResumeTypeSelector';
import { ExportButton } from '@/components/resume/ExportButton';
import { ResumeProvider, useResume } from '@/contexts/ResumeContext';
import { FileText, User, Briefcase, GraduationCap, Sparkles, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { TemplateType, ResumeType } from '@/types/resume';

type TabId = 'personal' | 'experience' | 'education' | 'skills' | 'preview';

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'personal', label: 'Personal', icon: <User className="w-4 h-4" /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'skills', label: 'Skills', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'preview', label: 'Preview', icon: <Eye className="w-4 h-4" /> },
];

const ResumeBuilderContent: React.FC = () => {
  const { resumeData, selectedTemplate, setSelectedTemplate, selectedResumeType, setSelectedResumeType } = useResume();
  const [activeTab, setActiveTab] = useState<TabId>('personal');

  const handleResumeTypeSelect = (type: ResumeType, recommendedTemplates: TemplateType[]) => {
    setSelectedResumeType(type);
    // Auto-select the first recommended template for this resume type
    if (recommendedTemplates.length > 0) {
      setSelectedTemplate(recommendedTemplates[0]);
    }
  };

  const currentTabIndex = tabs.findIndex(t => t.id === activeTab);
  const isFirstTab = currentTabIndex === 0;
  const isLastTab = currentTabIndex === tabs.length - 1;

  const goToNextTab = () => {
    if (!isLastTab) {
      setActiveTab(tabs[currentTabIndex + 1].id);
    }
  };

  const goToPrevTab = () => {
    if (!isFirstTab) {
      setActiveTab(tabs[currentTabIndex - 1].id);
    }
  };

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
      case 'preview':
        return (
          <div className="space-y-6">
            {/* Resume Type Selection */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">Select Resume Purpose</h2>
              <p className="text-sm text-muted-foreground">
                Choose the type that matches your career situation. Hover over each option for detailed guidance.
              </p>
              <ResumeTypeSelector 
                selected={selectedResumeType} 
                onSelect={handleResumeTypeSelect} 
              />
            </div>

            {/* Template Selection */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">Choose Your Template</h2>
              <p className="text-sm text-muted-foreground">Select a design that best represents you</p>
              <TemplateSelector selected={selectedTemplate} onSelect={setSelectedTemplate} />
            </div>

            {/* Live Preview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Live Preview</h2>
                <ExportButton />
              </div>
              <div className="bg-muted/50 rounded-xl p-4 overflow-auto">
                <div className="overflow-hidden rounded-lg shadow-2xl mx-auto" style={{ width: 'fit-content' }}>
                  <ResumePreview data={resumeData} template={selectedTemplate} />
                </div>
              </div>
            </div>
          </div>
        );
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
          
          {/* Progress indicator */}
          <div className="hidden md:flex items-center gap-2">
            {tabs.map((tab, index) => (
              <React.Fragment key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : currentTabIndex > index
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  )}
                >
                  {tab.icon}
                  <span className="hidden lg:inline">{tab.label}</span>
                </button>
                {index < tabs.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Tab Navigation */}
      <div className="md:hidden border-b border-border bg-card overflow-x-auto">
        <div className="flex p-2 gap-1">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all',
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted'
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-3xl px-4 py-6">
        {/* Section Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center',
              activeTab === 'preview' ? 'bg-primary' : 'bg-muted'
            )}>
              {tabs.find(t => t.id === activeTab)?.icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {tabs.find(t => t.id === activeTab)?.label} {activeTab !== 'preview' && 'Details'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {activeTab === 'personal' && 'Add your basic contact information'}
                {activeTab === 'experience' && 'Add your work experience'}
                {activeTab === 'education' && 'Add your educational background'}
                {activeTab === 'skills' && 'Add your skills and expertise'}
                {activeTab === 'preview' && 'Review and export your resume'}
              </p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          {renderTabContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={goToPrevTab}
            disabled={isFirstTab}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          {!isLastTab ? (
            <Button onClick={goToNextTab} className="gap-2">
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <ExportButton />
          )}
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
