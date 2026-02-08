import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  ArrowLeft, User, Mail, Calendar, Shield, FileText, Edit, Trash2,
  Loader2, Save, X, Plus, Briefcase, Check, Pencil,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { userService } from '@/services/userService';
import { resumeService, SavedResume } from '@/services/resumeService';
import { toast } from '@/hooks/use-toast';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, refreshUser } = useAuth();

  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Edit profile state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [saving, setSaving] = useState(false);

  // Rename resume state
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [savingRename, setSavingRename] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    fetchResumes();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setEditName(user.name || '');
      setEditEmail(user.email || '');
    }
  }, [user]);

  const fetchResumes = async () => {
    setLoadingResumes(true);
    const result = await resumeService.listResumes();
    if (result.data) setResumes(result.data);
    else if (result.error) toast({ title: 'Error', description: result.error, variant: 'destructive' });
    setLoadingResumes(false);
  };

  const handleSaveProfile = async () => {
    if (!user?.id) return;
    if (!editName.trim() || !editEmail.trim()) {
      toast({ title: 'Error', description: 'Name and email are required.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    const result = await userService.updateUser(user.id, { name: editName.trim(), email: editEmail.trim() });
    setSaving(false);

    if (result.error) {
      toast({ title: 'Update Failed', description: result.error, variant: 'destructive' });
    } else {
      const updatedUser = { ...user, name: editName.trim(), email: editEmail.trim() };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      refreshUser();
      setIsEditing(false);
      toast({ title: 'Profile Updated', description: 'Your profile has been updated successfully.' });
    }
  };

  const handleDeleteResume = async (id: string) => {
    setDeletingId(id);
    const result = await resumeService.deleteResume(id);
    if (result.error) {
      toast({ title: 'Delete Failed', description: result.error, variant: 'destructive' });
    } else {
      toast({ title: 'Resume Deleted', description: 'Your resume has been deleted.' });
      setResumes(prev => prev.filter(r => r.id !== id));
    }
    setDeletingId(null);
  };

  const handleEditResume = (resume: SavedResume) => {
    sessionStorage.setItem('editResume', JSON.stringify(resume));
    navigate('/');
  };

  const handleStartRename = (resume: SavedResume) => {
    setRenamingId(resume.id);
    setRenameValue(resume.title);
  };

  const handleCancelRename = () => {
    setRenamingId(null);
    setRenameValue('');
  };

  const handleSaveRename = async (id: string) => {
    if (!renameValue.trim()) {
      toast({ title: 'Error', description: 'Resume name cannot be empty.', variant: 'destructive' });
      return;
    }
    setSavingRename(true);
    const result = await resumeService.updateResume(id, { title: renameValue.trim() });
    setSavingRename(false);
    if (result.error) {
      toast({ title: 'Rename Failed', description: result.error, variant: 'destructive' });
    } else {
      setResumes(prev => prev.map(r => r.id === id ? { ...r, title: renameValue.trim() } : r));
      toast({ title: 'Renamed', description: 'Resume name updated.' });
      setRenamingId(null);
      setRenameValue('');
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background bg-grid-pattern bg-radial-glow">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-header">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center gradient-border glow-sm"
              style={{ background: `linear-gradient(135deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))` }}>
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">My Profile</h1>
              <p className="text-xs text-muted-foreground">Manage your account & resumes</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
        {/* Profile Card */}
        <Card className="glass-card glow-sm border-border/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))` }}>
                  <User className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{user?.name || 'User'}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Shield className="w-3 h-3" />
                    <span className="capitalize">{user?.role || 'user'}</span>
                  </CardDescription>
                </div>
              </div>
              {!isEditing && (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-2 border-border/50 bg-secondary/50 hover:bg-secondary">
                  <Edit className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit Profile</span>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="edit-name" value={editName} onChange={(e) => setEditName(e.target.value)} className="pl-10" placeholder="Your name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="edit-email" type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="pl-10" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveProfile} disabled={saving} className="gap-2">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => { setIsEditing(false); setEditName(user?.name || ''); setEditEmail(user?.email || ''); }} className="gap-2 border-border/50">
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{user?.email || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Member Since</p>
                    <p className="text-sm font-medium">{formatDate(user?.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Resumes Created</p>
                    <p className="text-sm font-medium">{loadingResumes ? '...' : resumes.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Role</p>
                    <p className="text-sm font-medium capitalize">{user?.role || 'user'}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* My Resumes Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">My Resumes</h2>
            </div>
            <Button onClick={() => navigate('/')} size="sm" className="gap-2 glow-sm"
              style={{ background: `linear-gradient(135deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))` }}>
              <Plus className="w-4 h-4" />
              Create New
            </Button>
          </div>

          {loadingResumes ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : resumes.length === 0 ? (
            <Card className="glass-card border-border/30 text-center py-12">
              <CardContent>
                <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
                <p className="text-muted-foreground mb-6">Create your first resume to get started</p>
                <Button onClick={() => navigate('/')} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Resume
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {resumes.map((resume) => (
                <Card key={resume.id} className="glass-card border-border/30 hover:glow-sm transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        {renamingId === resume.id ? (
                          <div className="flex items-center gap-2">
                            <Input
                              value={renameValue}
                              onChange={(e) => setRenameValue(e.target.value)}
                              className="h-8 text-sm"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveRename(resume.id);
                                if (e.key === 'Escape') handleCancelRename();
                              }}
                            />
                            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => handleSaveRename(resume.id)} disabled={savingRename}>
                              {savingRename ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 text-green-500" />}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={handleCancelRename}>
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 group">
                            <CardTitle className="text-lg truncate">{resume.title}</CardTitle>
                            <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" onClick={() => handleStartRename(resume)}>
                              <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                            </Button>
                          </div>
                        )}
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" />
                          Updated {formatDate(resume.updatedAt)}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full capitalize">
                          {resume.templateType}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-4">
                      <p className="font-medium text-foreground">
                        {resume.data?.personalInfo?.fullName || 'Untitled'}
                      </p>
                      <p>{resume.data?.personalInfo?.title || 'No title'}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2 border-border/50 bg-secondary/50 hover:bg-secondary"
                        onClick={() => handleEditResume(resume)}
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-destructive hover:text-destructive border-border/50"
                            disabled={deletingId === resume.id}
                          >
                            {deletingId === resume.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Resume?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete "{resume.title}". This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteResume(resume.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
