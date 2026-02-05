import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Plus, Edit, Trash2, ArrowLeft, Loader2, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { resumeService, SavedResume } from '@/services/resumeService';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const MyResumes: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    fetchResumes();
  }, [isAuthenticated, navigate]);

  const fetchResumes = async () => {
    setIsLoading(true);
    const result = await resumeService.listResumes();
    if (result.error) {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    } else {
      setResumes(result.data || []);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const result = await resumeService.deleteResume(id);
    if (result.error) {
      toast({
        title: 'Delete Failed',
        description: result.error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Resume Deleted',
        description: 'Your resume has been deleted.',
      });
      setResumes(prev => prev.filter(r => r.id !== id));
    }
    setDeletingId(null);
  };

  const handleEdit = (resume: SavedResume) => {
    // Store resume data in sessionStorage to load in the builder
    sessionStorage.setItem('editResume', JSON.stringify(resume));
    navigate('/');
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">My Resumes</h1>
              <p className="text-xs text-muted-foreground">Manage your saved resumes</p>
            </div>
          </div>
          <Button onClick={() => navigate('/')} className="gap-2">
            <Plus className="w-4 h-4" />
            Create New
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : resumes.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No resumes yet</h2>
              <p className="text-muted-foreground mb-6">
                Create your first resume to get started
              </p>
              <Button onClick={() => navigate('/')} className="gap-2">
                <Plus className="w-4 h-4" />
                Create Resume
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {resumes.map((resume) => (
              <Card key={resume.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{resume.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        Updated {formatDate(resume.updatedAt)}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs px-2 py-1 bg-muted rounded-full capitalize">
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
                      className="flex-1 gap-2"
                      onClick={() => handleEdit(resume)}
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 text-destructive hover:text-destructive"
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
                            onClick={() => handleDelete(resume.id)}
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
  );
};

export default MyResumes;