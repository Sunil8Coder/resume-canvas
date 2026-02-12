import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { coverLetterProfessions, coverLetterTemplates } from '@/data/coverLetterData';
import { CoverLetterData, CoverLetterProfession } from '@/types/coverLetter';
import { aiService } from '@/services/aiService';
import { exportCoverLetterToPDF, exportCoverLetterToWord } from '@/utils/exportCoverLetter';
import { useCoverLetters } from '@/hooks/useCoverLetters';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';
import {
  FileText, User, LogOut, FolderOpen, Shield, UserCircle,
  Sparkles, Download, ChevronLeft, ChevronRight, Loader2, Eye, PenLine, Save
} from 'lucide-react';

type Step = 'select' | 'edit' | 'preview';

const CoverLetterPage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createCoverLetter, updateCoverLetter, isLoading: isSaving } = useCoverLetters();

  const [step, setStep] = useState<Step>('select');
  const [selectedProfession, setSelectedProfession] = useState<CoverLetterProfession | null>(null);
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData | null>(null);
  const [currentCoverLetterId, setCurrentCoverLetterId] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleProfessionSelect = (profession: CoverLetterProfession) => {
    setSelectedProfession(profession);
    setCoverLetterData({ ...coverLetterTemplates[profession] });
    setStep('edit');
  };

  const updateField = (field: keyof CoverLetterData, value: string) => {
    if (!coverLetterData) return;
    setCoverLetterData({ ...coverLetterData, [field]: value });
  };

  const handleEnhanceWithAI = async () => {
    if (!coverLetterData) return;
    setIsEnhancing(true);
    try {
      const result = await aiService.enhanceText(
        `Improve this cover letter for a ${coverLetterProfessions.find(p => p.id === selectedProfession)?.name} role. Keep the same structure and placeholders like [Company Name]. Make it more professional, impactful, and compelling. Only return the improved cover letter body text, nothing else:\n\n${coverLetterData.body}`,
        'You are an expert cover letter writer. Only return the improved text, no explanations.'
      );
      if (result.data) {
        setCoverLetterData({ ...coverLetterData, body: result.data });
        toast({ title: 'Enhanced!', description: 'Your cover letter has been improved with AI.' });
      } else {
        toast({ title: 'Error', description: result.error || 'Failed to enhance.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'AI service unavailable.', variant: 'destructive' });
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await exportCoverLetterToPDF();
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportWord = async () => {
    if (!coverLetterData) return;
    setIsExporting(true);
    try {
      await exportCoverLetterToWord(coverLetterData);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSave = async () => {
    if (!coverLetterData || !selectedProfession) return;
    if (!isAuthenticated) {
      toast({ title: 'Login Required', description: 'Please log in to save your cover letter.', variant: 'destructive' });
      navigate('/auth');
      return;
    }
    const title = `${coverLetterProfessions.find(p => p.id === selectedProfession)?.name || 'My'} Cover Letter`;
    if (currentCoverLetterId) {
      const result = await updateCoverLetter(currentCoverLetterId, { title, profession: selectedProfession, data: coverLetterData });
      if (result) setCurrentCoverLetterId(result.id);
    } else {
      const result = await createCoverLetter({ title, profession: selectedProfession, data: coverLetterData });
      if (result) setCurrentCoverLetterId(result.id);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background bg-grid-pattern bg-radial-glow">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-header">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center gradient-border glow-sm"
              style={{ background: `linear-gradient(135deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))` }}>
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Resume4J</h1>
              <p className="text-xs text-muted-foreground">Cover Letter Builder</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2 border-border/50 bg-secondary/50 hover:bg-secondary">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Resume Builder</span>
            </Button>
            {isAuthenticated ? (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate('/profile')} className="gap-2 border-border/50 bg-secondary/50 hover:bg-secondary">
                  <UserCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigate('/my-resumes')} className="gap-2 border-border/50 bg-secondary/50 hover:bg-secondary">
                  <FolderOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">My Resumes</span>
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
              </>
            ) : (
              <Button variant="outline" size="sm" asChild className="gap-2 border-border/50 bg-secondary/50 hover:bg-secondary">
                <a href="/auth"><User className="w-4 h-4" /><span className="hidden sm:inline">Login</span></a>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Steps indicator */}
      <div className="border-b border-border/50 bg-card/60 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-2">
          {([
            { id: 'select' as Step, label: 'Select Profession', icon: <FileText className="w-4 h-4" /> },
            { id: 'edit' as Step, label: 'Edit Content', icon: <PenLine className="w-4 h-4" /> },
            { id: 'preview' as Step, label: 'Preview & Export', icon: <Eye className="w-4 h-4" /> },
          ] as const).map((s, i, arr) => (
            <React.Fragment key={s.id}>
              <button
                onClick={() => {
                  if (s.id === 'select') setStep('select');
                  else if (coverLetterData) setStep(s.id);
                }}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                  step === s.id
                    ? 'bg-primary text-primary-foreground glow-sm'
                    : coverLetterData || s.id === 'select'
                    ? 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
                    : 'bg-secondary/50 text-muted-foreground/50 cursor-not-allowed'
                )}
              >
                {s.icon}
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < arr.length - 1 && <ChevronRight className="w-3 h-3 text-muted-foreground/40" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Step: Select Profession */}
        {step === 'select' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground tracking-tight">Choose Your Profession</h2>
              <p className="text-muted-foreground mt-1">Select a profession to get a tailored cover letter template</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {coverLetterProfessions.map(prof => (
                <button
                  key={prof.id}
                  onClick={() => handleProfessionSelect(prof.id)}
                  className={cn(
                    'glass-card p-5 text-left transition-all duration-200 hover:scale-[1.02] group',
                    selectedProfession === prof.id ? 'ring-2 ring-primary glow-sm' : 'hover:border-primary/50'
                  )}
                >
                  <div className="text-3xl mb-3">{prof.icon}</div>
                  <h3 className="font-semibold text-foreground mb-1">{prof.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{prof.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {prof.focusAreas.map(area => (
                      <span key={area} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {area}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step: Edit */}
        {step === 'edit' && coverLetterData && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight">Edit Your Cover Letter</h2>
              <Button
                onClick={handleEnhanceWithAI}
                disabled={isEnhancing}
                variant="outline"
                className="gap-2 border-primary/50 text-primary hover:bg-primary/10"
              >
                {isEnhancing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Enhance with AI
              </Button>
            </div>

            <div className="glass-card p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground text-xs">Your Name</Label>
                  <Input value={coverLetterData.senderName} onChange={e => updateField('senderName', e.target.value)} />
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Your Title</Label>
                  <Input value={coverLetterData.senderTitle} onChange={e => updateField('senderTitle', e.target.value)} />
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Your Email</Label>
                  <Input value={coverLetterData.senderEmail} onChange={e => updateField('senderEmail', e.target.value)} />
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Your Phone</Label>
                  <Input value={coverLetterData.senderPhone} onChange={e => updateField('senderPhone', e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-muted-foreground text-xs">Your Address</Label>
                  <Input value={coverLetterData.senderAddress} onChange={e => updateField('senderAddress', e.target.value)} />
                </div>
              </div>

              <div className="border-t border-border/50 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground text-xs">Recipient Name</Label>
                  <Input value={coverLetterData.recipientName} onChange={e => updateField('recipientName', e.target.value)} />
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Recipient Title</Label>
                  <Input value={coverLetterData.recipientTitle} onChange={e => updateField('recipientTitle', e.target.value)} />
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Company Name</Label>
                  <Input value={coverLetterData.companyName} onChange={e => updateField('companyName', e.target.value)} />
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Company Address</Label>
                  <Input value={coverLetterData.companyAddress} onChange={e => updateField('companyAddress', e.target.value)} />
                </div>
              </div>

              <div className="border-t border-border/50 pt-4">
                <Label className="text-muted-foreground text-xs">Cover Letter Body</Label>
                <Textarea
                  value={coverLetterData.body}
                  onChange={e => updateField('body', e.target.value)}
                  rows={16}
                  className="mt-1 font-sans text-sm leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground text-xs">Closing</Label>
                  <Input value={coverLetterData.closing} onChange={e => updateField('closing', e.target.value)} />
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Date</Label>
                  <Input value={coverLetterData.date} onChange={e => updateField('date', e.target.value)} />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep('select')} className="gap-2 border-border/50 bg-secondary/50 hover:bg-secondary">
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>
              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={isSaving} variant="outline" className="gap-2 border-primary/50 text-primary hover:bg-primary/10">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save
                </Button>
                <Button onClick={() => setStep('preview')} className="gap-2 glow-sm"
                  style={{ background: `linear-gradient(135deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))` }}>
                  Preview <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step: Preview */}
        {step === 'preview' && coverLetterData && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight">Preview & Export</h2>
              <div className="flex items-center gap-2">
                <Button onClick={handleExportPDF} disabled={isExporting} variant="outline" className="gap-2 border-border/50 bg-secondary/50 hover:bg-secondary">
                  <Download className="w-4 h-4" /> PDF
                </Button>
                <Button onClick={handleExportWord} disabled={isExporting} variant="outline" className="gap-2 border-border/50 bg-secondary/50 hover:bg-secondary">
                  <Download className="w-4 h-4" /> Word
                </Button>
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-4 overflow-auto">
              <div className="mx-auto" style={{ width: 'fit-content' }}>
                <div
                  id="cover-letter-preview"
                  className="bg-white text-gray-800 shadow-2xl rounded-lg"
                  style={{ width: '210mm', minHeight: '297mm', padding: '20mm 25mm', fontFamily: 'Georgia, serif', lineHeight: '1.7' }}
                >
                  {/* Sender */}
                  <div className="mb-6">
                    <p className="text-lg font-bold text-gray-900">{coverLetterData.senderName}</p>
                    <p className="text-sm text-gray-600">{coverLetterData.senderTitle}</p>
                    <p className="text-sm text-gray-500">{coverLetterData.senderEmail} | {coverLetterData.senderPhone}</p>
                    <p className="text-sm text-gray-500">{coverLetterData.senderAddress}</p>
                  </div>

                  {/* Date */}
                  <p className="text-sm text-gray-700 mb-6">{coverLetterData.date}</p>

                  {/* Recipient */}
                  <div className="mb-8">
                    <p className="text-sm font-semibold text-gray-800">{coverLetterData.recipientName}</p>
                    <p className="text-sm text-gray-600">{coverLetterData.recipientTitle}</p>
                    <p className="text-sm text-gray-600">{coverLetterData.companyName}</p>
                    <p className="text-sm text-gray-500">{coverLetterData.companyAddress}</p>
                  </div>

                  {/* Body */}
                  <div className="text-sm text-gray-800 whitespace-pre-line leading-relaxed mb-8">
                    {coverLetterData.body}
                  </div>

                  {/* Closing */}
                  <div className="mt-8">
                    <p className="text-sm text-gray-800">{coverLetterData.closing},</p>
                    <p className="text-sm font-bold text-gray-900 mt-4">{coverLetterData.senderName}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep('edit')} className="gap-2 border-border/50 bg-secondary/50 hover:bg-secondary">
                <ChevronLeft className="w-4 h-4" /> Edit
              </Button>
              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={isSaving} variant="outline" className="gap-2 border-primary/50 text-primary hover:bg-primary/10">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save
                </Button>
                <Button onClick={handleExportPDF} disabled={isExporting} className="gap-2 glow-sm"
                  style={{ background: `linear-gradient(135deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))` }}>
                  {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  Export PDF
                </Button>
                <Button onClick={handleExportWord} disabled={isExporting} variant="outline" className="gap-2 border-border/50">
                  {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  Export Word
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CoverLetterPage;
