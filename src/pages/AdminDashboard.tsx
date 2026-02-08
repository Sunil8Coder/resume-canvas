import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  FileText, Users, Eye, ArrowLeft, Loader2, Trash2, RefreshCw,
  Monitor, Globe, Clock,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { resumeService, SavedResume } from '@/services/resumeService';
import { userService } from '@/services/userService';
import { User } from '@/services/authService';
import { visitorService, Visitor } from '@/services/visitorService';
import { toast } from '@/hooks/use-toast';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingVisitors, setLoadingVisitors] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    fetchAll();
  }, [isAuthenticated, navigate]);

  const fetchAll = () => {
    fetchResumes();
    fetchUsers();
    fetchVisitors();
  };

  const fetchResumes = async () => {
    setLoadingResumes(true);
    const result = await resumeService.listResumes();
    if (result.data) setResumes(result.data);
    else if (result.error) toast({ title: 'Error', description: result.error, variant: 'destructive' });
    setLoadingResumes(false);
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    const result = await userService.listUsers();
    if (result.data) setUsers(result.data);
    else if (result.error) toast({ title: 'Error', description: result.error, variant: 'destructive' });
    setLoadingUsers(false);
  };

  const fetchVisitors = async () => {
    setLoadingVisitors(true);
    const result = await visitorService.listVisitors();
    if (result.data) setVisitors(result.data);
    else if (result.error) toast({ title: 'Error', description: result.error, variant: 'destructive' });
    setLoadingVisitors(false);
  };

  const handleDeleteVisitor = async (id: string) => {
    setDeletingId(id);
    const result = await visitorService.deleteVisitor(id);
    if (result.error) {
      toast({ title: 'Delete Failed', description: result.error, variant: 'destructive' });
    } else {
      toast({ title: 'Visitor Deleted', description: 'Visitor record removed.' });
      setVisitors(prev => prev.filter(v => v.id !== id));
    }
    setDeletingId(null);
  };

  const handleDeleteUser = async (id: string) => {
    setDeletingId(id);
    const result = await userService.deleteUser(id);
    if (result.error) {
      toast({ title: 'Delete Failed', description: result.error, variant: 'destructive' });
    } else {
      toast({ title: 'User Deleted', description: 'User has been removed.' });
      setUsers(prev => prev.filter(u => u.id !== id));
    }
    setDeletingId(null);
  };

  const handleDeleteResume = async (id: string) => {
    setDeletingId(id);
    const result = await resumeService.deleteResume(id);
    if (result.error) {
      toast({ title: 'Delete Failed', description: result.error, variant: 'destructive' });
    } else {
      toast({ title: 'Resume Deleted', description: 'Resume has been removed.' });
      setResumes(prev => prev.filter(r => r.id !== id));
    }
    setDeletingId(null);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  const parseBrowser = (ua?: string) => {
    if (!ua) return 'Unknown';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Other';
  };

  const DeleteButton = ({ id, onDelete, label }: { id: string; onDelete: (id: string) => void; label: string }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" disabled={deletingId === id}>
          {deletingId === id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {label}?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete(id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

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
              <Monitor className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">Manage resumes, users & visitors</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">{user?.name || 'Admin'}</span>
            <Button variant="outline" size="sm" onClick={fetchAll} className="gap-2 border-border/50 bg-secondary/50 hover:bg-secondary">
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="glass-card glow-sm border-border/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Resumes</CardTitle>
              <FileText className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">{loadingResumes ? '...' : resumes.length}</div>
            </CardContent>
          </Card>
          <Card className="glass-card glow-sm border-border/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              <Users className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">{loadingUsers ? '...' : users.length}</div>
            </CardContent>
          </Card>
          <Card className="glass-card glow-sm border-border/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Visitors</CardTitle>
              <Eye className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">{loadingVisitors ? '...' : visitors.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="resumes" className="space-y-4">
          <TabsList className="glass-card border border-border/30">
            <TabsTrigger value="resumes" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="w-4 h-4" />
              Resumes
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="visitors" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Eye className="w-4 h-4" />
              Visitors
            </TabsTrigger>
          </TabsList>

          {/* Resumes Tab */}
          <TabsContent value="resumes">
            <Card className="glass-card border-border/30">
              <CardHeader>
                <CardTitle className="text-lg">All Resumes</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingResumes ? (
                  <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
                ) : resumes.length === 0 ? (
                  <p className="text-center text-muted-foreground py-10">No resumes found.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border/30">
                          <TableHead>Title</TableHead>
                          <TableHead>Owner</TableHead>
                          <TableHead>Template</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Updated</TableHead>
                          <TableHead className="w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {resumes.map((resume) => (
                          <TableRow key={resume.id} className="border-border/20">
                            <TableCell className="font-medium">{resume.title}</TableCell>
                            <TableCell className="text-muted-foreground">{resume.data?.personalInfo?.fullName || '—'}</TableCell>
                            <TableCell>
                              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full capitalize">{resume.templateType}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full capitalize">{resume.resumeType}</span>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">{formatDate(resume.updatedAt)}</TableCell>
                            <TableCell>
                              <DeleteButton id={resume.id} onDelete={handleDeleteResume} label="Resume" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="glass-card border-border/30">
              <CardHeader>
                <CardTitle className="text-lg">All Users</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingUsers ? (
                  <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
                ) : users.length === 0 ? (
                  <p className="text-center text-muted-foreground py-10">No users found.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border/30">
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead className="w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((u) => (
                          <TableRow key={u.id} className="border-border/20">
                            <TableCell className="font-medium">{u.name}</TableCell>
                            <TableCell className="text-muted-foreground">{u.email}</TableCell>
                            <TableCell>
                              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full capitalize">{u.role || 'user'}</span>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">{formatDate(u.createdAt)}</TableCell>
                            <TableCell>
                              <DeleteButton id={u.id} onDelete={handleDeleteUser} label="User" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visitors Tab */}
          <TabsContent value="visitors">
            <Card className="glass-card border-border/30">
              <CardHeader>
                <CardTitle className="text-lg">All Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingVisitors ? (
                  <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
                ) : visitors.length === 0 ? (
                  <p className="text-center text-muted-foreground py-10">No visitors recorded.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border/30">
                          <TableHead>Browser</TableHead>
                          <TableHead>Platform</TableHead>
                          <TableHead>Screen</TableHead>
                          <TableHead>Timezone</TableHead>
                          <TableHead>URL</TableHead>
                          <TableHead>Visited</TableHead>
                          <TableHead className="w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {visitors.map((visitor) => (
                          <TableRow key={visitor.id} className="border-border/20">
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">{parseBrowser(visitor.userAgent)}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{visitor.platform || '—'}</TableCell>
                            <TableCell className="text-muted-foreground">
                              {visitor.screenWidth && visitor.screenHeight
                                ? `${visitor.screenWidth}×${visitor.screenHeight}`
                                : '—'}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {visitor.timezone || '—'}
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground max-w-[200px] truncate">{visitor.url || '—'}</TableCell>
                            <TableCell className="text-muted-foreground text-sm">{formatDate(visitor.timestamp || visitor.createdAt)}</TableCell>
                            <TableCell>
                              <DeleteButton id={visitor.id} onDelete={handleDeleteVisitor} label="Visitor" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
