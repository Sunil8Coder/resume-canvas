import React, { useState } from 'react';
import { useEffect } from 'react';
import { resumeTypeDataMap } from '@/data/resumeTypeData';
import { PersonalInfoForm } from '@/components/resume/PersonalInfoForm';
import { ExperienceForm } from '@/components/resume/ExperienceForm';
import { EducationForm } from '@/components/resume/EducationForm';
import { SkillsForm } from '@/components/resume/SkillsForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { TemplateSelector } from '@/components/resume/TemplateSelector';
import { ResumeTypeSelector } from '@/components/resume/ResumeTypeSelector';
import { ExportButton } from '@/components/resume/ExportButton';
import { resumeService } from '@/services/resumeService';
import { toast } from '@/hooks/use-toast';
import { FontSelector } from '@/components/resume/FontSelector';

import { ResumeProvider, useResume } from '@/contexts/ResumeContext';
import { FileText, User, Briefcase, GraduationCap, Sparkles, Eye, ChevronRight, ChevronLeft, LogOut, FolderOpen, Shield, UserCircle, Mail, Save, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { TemplateType, ResumeType } from '@/types/resume';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';

type TabId = 'purpose' | 'personal' | 'experience' | 'education' | 'skills' | 'preview';

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'purpose', label: 'Purpose', icon: <FileText className="w-4 h-4" /> },
  { id: 'personal', label: 'Personal', icon: <User className="w-4 h-4" /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'skills', label: 'Skills', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'preview', label: 'Preview', icon: <Eye className="w-4 h-4" /> },
];

const ResumeBuilderContent: React.FC = () => {
  const { resumeData, selectedTemplate, setSelectedTemplate, selectedResumeType, setSelectedResumeType, currentResumeId, setCurrentResumeId, loadResume, resetResume, selectedFont, setSelectedFont, resumeTitle } = useResume();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('purpose');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveResume = async () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('pendingResume', JSON.stringify({
        data: resumeData,
        template: selectedTemplate,
        resumeType: selectedResumeType,
        title: resumeTitle,
      }));
      toast({ title: 'Login Required', description: 'Please login to save your resume.', variant: 'destructive' });
      navigate('/auth?redirect=export');
      return;
    }
    setIsSaving(true);
    const dataWithFont = { ...resumeData, fontFamily: selectedFont };
    try {
      if (currentResumeId) {
        const result = await resumeService.updateResume(currentResumeId, { title: resumeTitle, templateType: selectedTemplate, resumeType: selectedResumeType, data: dataWithFont });
        if (result.error) { toast({ title: 'Save Failed', description: result.error, variant: 'destructive' }); return; }
        toast({ title: 'Saved!', description: 'Resume updated successfully.' });
      } else {
        const result = await resumeService.createResume({ title: resumeTitle, templateType: selectedTemplate, resumeType: selectedResumeType, data: dataWithFont });
        if (result.error) { toast({ title: 'Save Failed', description: result.error, variant: 'destructive' }); return; }
        if (result.data?.id) { setCurrentResumeId(result.data.id); }
        toast({ title: 'Saved!', description: 'Resume saved successfully.' });
      }
    } catch {
      toast({ title: 'Save Failed', description: 'Could not save resume.', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  // Load resume from sessionStorage if editing or restoring after auth
  useEffect(() => {
    const editResumeData = sessionStorage.getItem('editResume');
    if (editResumeData) {
      try {
        const resume = JSON.parse(editResumeData);
        loadResume(resume.id, resume.title, resume.data, resume.templateType, resume.resumeType, resume.data?.fontFamily);
        setSelectedFont(resume.data?.fontFamily || 'default');
        sessionStorage.removeItem('editResume');
        // so all tabs will show the saved data
      } catch {
        console.error('Failed to load resume from session');
      }
    }

    // Restore resume data after auth redirect
    const params = new URLSearchParams(window.location.search);
    const pendingResume = sessionStorage.getItem('pendingResume');
    if (params.get('restoreResume') === 'true' && pendingResume) {
      try {
        const restored = JSON.parse(pendingResume);
        loadResume(null, restored.title, restored.data, restored.template, restored.resumeType);
        sessionStorage.removeItem('pendingResume');
        // Navigate to preview tab and clean URL
        setActiveTab('preview');
        window.history.replaceState({}, '', '/');
      } catch {
        console.error('Failed to restore resume from session');
      }
    }
  }, [loadResume]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleResumeTypeSelect = (type: ResumeType, recommendedTemplates: TemplateType[]) => {
    setSelectedResumeType(type);
    if (recommendedTemplates.length > 0) {
      setSelectedTemplate(recommendedTemplates[0]);
    }
    // Only load prefilled sample data for NEW resumes, not when editing a saved one
    if (!currentResumeId) {
      const prefilledData = resumeTypeDataMap[type];
      if (prefilledData) {
        loadResume(null, `My ${type.charAt(0).toUpperCase() + type.slice(1)} Resume`, prefilledData, recommendedTemplates[0] || selectedTemplate, type);
      }
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
      case 'purpose':
        return (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Select Resume Purpose</h2>
            <p className="text-sm text-muted-foreground">
              Choose the type that matches your career situation. This will pre-fill your resume with relevant sample data.
            </p>
            <ResumeTypeSelector 
              selected={selectedResumeType} 
              onSelect={handleResumeTypeSelect} 
            />
          </div>
        );
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
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">Choose Your Template</h2>
              <p className="text-sm text-muted-foreground">Select a design that best represents you</p>
              <TemplateSelector selected={selectedTemplate} onSelect={setSelectedTemplate} />
            </div>

            <FontSelector selected={selectedFont} onSelect={setSelectedFont} />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Live Preview</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleSaveResume} disabled={isSaving} className="gap-2">
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                  <ExportButton />
                </div>
              </div>
              <div className="bg-muted/30 rounded-xl p-4 overflow-auto">
                <div className="overflow-hidden rounded-lg shadow-2xl mx-auto" style={{ width: 'fit-content' }}>
                  <ResumePreview data={resumeData} template={selectedTemplate} fontFamily={selectedFont} />
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
    <div className="min-h-screen bg-background bg-grid-pattern bg-radial-glow">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-header">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center gradient-border glow-sm"
              style={{ background: `linear-gradient(135deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))` }}>
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Resume4J</h1>
              <p className="text-xs text-muted-foreground">Create professional resumes for free</p>
            </div>
          </div>
          
          {/* Auth, Theme & Progress */}
          <div className="flex items-center gap-3">
            {/* Progress indicator - Desktop */}
            <div className="hidden md:flex items-center gap-1.5">
              {tabs.map((tab, index) => (
                <React.Fragment key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground glow-sm'
                        : currentTabIndex > index
                        ? 'bg-primary/20 text-primary'
                        : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
                    )}
                  >
                    {tab.icon}
                    <span className="hidden lg:inline">{tab.label}</span>
                  </button>
                  {index < tabs.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {user?.name?.split(' ')[0] || 'User'}
                </span>
                <Button variant="outline" size="sm" onClick={() => navigate('/profile')} className="gap-2 border-border/50 bg-secondary/50 hover:bg-secondary">
                  <UserCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigate('/my-resumes')} className="gap-2 border-border/50 bg-secondary/50 hover:bg-secondary">
                  <FolderOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">My Resumes</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigate('/cover-letter')} className="gap-2 border-border/50 bg-secondary/50 hover:bg-secondary">
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">Cover Letter</span>
                </Button>
                {user?.role?.toLowerCase() === 'admin' && (
                  <Button variant="outline" size="sm" onClick={() => navigate('/admin')} className="gap-2 border-border/50 bg-secondary/50 hover:bg-secondary">
                    <Shield className="w-4 h-4" />
                    <span className="hidden sm:inline">Admin</span>
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 border-border/50 bg-secondary/50 hover:bg-secondary">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" asChild className="gap-2 border-border/50 bg-secondary/50 hover:bg-secondary">
                <a href="/auth">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </a>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Tab Navigation */}
      <div className="md:hidden border-b border-border/50 bg-card/60 backdrop-blur-sm overflow-x-auto">
        <div className="flex p-2 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all',
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground glow-sm'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-3xl px-4 py-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className={cn(
              'w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300',
              activeTab === 'preview' 
                ? 'glow-md' 
                : ''
            )} style={activeTab === 'preview' ? {
              background: `linear-gradient(135deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))`
            } : {
              background: 'hsl(var(--secondary))'
            }}>
              <span className={activeTab === 'preview' ? 'text-primary-foreground' : 'text-muted-foreground'}>
                {tabs.find(t => t.id === activeTab)?.icon}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">
                {tabs.find(t => t.id === activeTab)?.label} {activeTab !== 'preview' && 'Details'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {activeTab === 'purpose' && 'Choose your resume type and template'}
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
        <div className="glass-card p-6 mb-8 glow-sm">
          {renderTabContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={goToPrevTab}
            disabled={isFirstTab}
            className="gap-2 border-border/50 bg-secondary/50 hover:bg-secondary"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          {!isLastTab ? (
            <Button onClick={goToNextTab} className="gap-2 glow-sm"
              style={{ background: `linear-gradient(135deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))` }}>
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <ExportButton />
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const Index: React.FC = () => {
  return <ResumeBuilderContent />;
};

export default Index;
