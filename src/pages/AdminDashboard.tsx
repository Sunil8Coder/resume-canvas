import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
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
  Monitor, Globe, Clock, User as UserIcon, Mail, Calendar, Shield, Save, X, Edit,
  ScrollText, Bot, Activity, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { resumeService, SavedResume } from '@/services/resumeService';
import { userService } from '@/services/userService';
import { User } from '@/services/authService';
import { visitorService, Visitor } from '@/services/visitorService';
import { logService, RequestLog } from '@/services/logService';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const PAGE_SIZE = 10;

const PaginationControls = ({
  page, totalPages, onPageChange, loading,
}: {
  page: number; totalPages: number; onPageChange: (p: number) => void; loading: boolean;
}) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between pt-4">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled={page <= 1 || loading} onClick={() => onPageChange(page - 1)} className="gap-1 border-border/50">
          <ChevronLeft className="w-4 h-4" /> Previous
        </Button>
        <Button variant="outline" size="sm" disabled={page >= totalPages || loading} onClick={() => onPageChange(page + 1)} className="gap-1 border-border/50">
          Next <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, refreshUser } = useAuth();

  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [logs, setLogs] = useState<RequestLog[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingVisitors, setLoadingVisitors] = useState(false);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Pagination state
  const [resumePage, setResumePage] = useState(1);
  const [resumeTotal, setResumeTotal] = useState(0);
  const [userPage, setUserPage] = useState(1);
  const [userTotal, setUserTotal] = useState(0);
  const [visitorPage, setVisitorPage] = useState(1);
  const [visitorTotal, setVisitorTotal] = useState(0);
  const [logPage, setLogPage] = useState(1);
  const [logTotal, setLogTotal] = useState(0);

  // Profile edit state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (user) {
      setEditName(user.name || '');
      setEditEmail(user.email || '');
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    if (user?.role?.toLowerCase() !== 'admin') {
      toast({ title: 'Access Denied', description: 'You need admin privileges to view this page.', variant: 'destructive' });
      navigate('/');
      return;
    }
    fetchAll();
  }, [isAuthenticated, user, navigate]);

  const fetchAll = () => {
    fetchResumes(1);
    fetchUsers(1);
    fetchVisitors(1);
    fetchLogs(1);
  };

  const fetchResumes = async (page: number) => {
    setLoadingResumes(true);
    setResumePage(page);
    const offset = (page - 1) * PAGE_SIZE;
    const result = await resumeService.adminListResumes(offset, PAGE_SIZE);
    if (result.data) {
      setResumes(result.data);
      setResumeTotal(result.total ?? 0);
    } else if (result.error) toast({ title: 'Error', description: result.error, variant: 'destructive' });
    setLoadingResumes(false);
  };

  const fetchUsers = async (page: number) => {
    setLoadingUsers(true);
    setUserPage(page);
    const offset = (page - 1) * PAGE_SIZE;
    const result = await userService.listUsers(offset, PAGE_SIZE);
    if (result.data) {
      setUsers(result.data);
      setUserTotal(result.total ?? 0);
    } else if (result.error) toast({ title: 'Error', description: result.error, variant: 'destructive' });
    setLoadingUsers(false);
  };

  const fetchVisitors = async (page: number) => {
    setLoadingVisitors(true);
    setVisitorPage(page);
    const offset = (page - 1) * PAGE_SIZE;
    const result = await visitorService.listVisitors(offset, PAGE_SIZE);
    if (result.data) {
      setVisitors(result.data);
      setVisitorTotal(result.total ?? 0);
    } else if (result.error) toast({ title: 'Error', description: result.error, variant: 'destructive' });
    setLoadingVisitors(false);
  };

  const fetchLogs = async (page: number) => {
    setLoadingLogs(true);
    setLogPage(page);
    const offset = (page - 1) * PAGE_SIZE;
    const result = await logService.listLogs(offset, PAGE_SIZE);
    if (result.data) {
      setLogs(result.data);
      setLogTotal(result.total ?? 0);
    } else if (result.error) toast({ title: 'Error', description: result.error, variant: 'destructive' });
    setLoadingLogs(false);
  };

  const handleDeleteVisitor = async (id: string) => {
    setDeletingId(id);
    const result = await visitorService.deleteVisitor(id);
    if (result.error) {
      toast({ title: 'Delete Failed', description: result.error, variant: 'destructive' });
    } else {
      toast({ title: 'Visitor Deleted', description: 'Visitor record removed.' });
      fetchVisitors(visitorPage);
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
      fetchUsers(userPage);
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
      fetchResumes(resumePage);
    }
    setDeletingId(null);
  };

  const handleDeleteLog = async (id: string) => {
    setDeletingId(id);
    const result = await logService.deleteLog(id);
    if (result.error) {
      toast({ title: 'Delete Failed', description: result.error, variant: 'destructive' });
    } else {
      toast({ title: 'Log Deleted', description: 'Log entry removed.' });
      fetchLogs(logPage);
    }
    setDeletingId(null);
  };

  const handleSaveProfile = async () => {
    if (!user?.id) return;
    if (!editName.trim() || !editEmail.trim()) {
      toast({ title: 'Error', description: 'Name and email are required.', variant: 'destructive' });
      return;
    }
    setSavingProfile(true);
    const result = await userService.updateUser(user.id, { name: editName.trim(), email: editEmail.trim() });
    setSavingProfile(false);
    if (result.error) {
      toast({ title: 'Update Failed', description: result.error, variant: 'destructive' });
    } else {
      const updatedUser = { ...user, name: editName.trim(), email: editEmail.trim() };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      refreshUser();
      setIsEditingProfile(false);
      toast({ title: 'Profile Updated', description: 'Your profile has been updated.' });
    }
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

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'POST': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'PUT': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'DELETE': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: number | null) => {
    if (!status) return 'text-muted-foreground';
    if (status < 300) return 'text-green-500';
    if (status < 400) return 'text-yellow-500';
    return 'text-red-500';
  };

  const totalPages = (total: number) => Math.max(1, Math.ceil(total / PAGE_SIZE));

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
              <p className="text-xs text-muted-foreground">Manage resumes, users, visitors & logs</p>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card glow-sm border-border/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Resumes</CardTitle>
              <FileText className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">{loadingResumes ? '...' : resumeTotal}</div>
            </CardContent>
          </Card>
          <Card className="glass-card glow-sm border-border/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Users</CardTitle>
              <Users className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">{loadingUsers ? '...' : userTotal}</div>
            </CardContent>
          </Card>
          <Card className="glass-card glow-sm border-border/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Visitors</CardTitle>
              <Eye className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">{loadingVisitors ? '...' : visitorTotal}</div>
            </CardContent>
          </Card>
          <Card className="glass-card glow-sm border-border/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Logs</CardTitle>
              <ScrollText className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">{loadingLogs ? '...' : logTotal}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="glass-card border border-border/30">
            <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <UserIcon className="w-4 h-4" />
              Profile
            </TabsTrigger>
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
            <TabsTrigger value="logs" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ScrollText className="w-4 h-4" />
              Logs
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="glass-card border-border/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))` }}>
                      <UserIcon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{user?.name || 'Admin'}</CardTitle>
                      <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Shield className="w-3 h-3" />
                        <span className="capitalize">{user?.role || 'admin'}</span>
                      </p>
                    </div>
                  </div>
                  {!isEditingProfile && (
                    <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(true)} className="gap-2 border-border/50 bg-secondary/50 hover:bg-secondary">
                      <Edit className="w-4 h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isEditingProfile ? (
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="admin-name">Full Name</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="admin-name" value={editName} onChange={(e) => setEditName(e.target.value)} className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="admin-email" type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="pl-10" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} disabled={savingProfile} className="gap-2">
                        {savingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save
                      </Button>
                      <Button variant="outline" onClick={() => { setIsEditingProfile(false); setEditName(user?.name || ''); setEditEmail(user?.email || ''); }} className="gap-2 border-border/50">
                        <X className="w-4 h-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 max-w-lg">
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
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

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
                <PaginationControls page={resumePage} totalPages={totalPages(resumeTotal)} onPageChange={fetchResumes} loading={loadingResumes} />
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
                <PaginationControls page={userPage} totalPages={totalPages(userTotal)} onPageChange={fetchUsers} loading={loadingUsers} />
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
                <PaginationControls page={visitorPage} totalPages={totalPages(visitorTotal)} onPageChange={fetchVisitors} loading={loadingVisitors} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs">
            <Card className="glass-card border-border/30">
              <CardHeader>
                <CardTitle className="text-lg">Request Logs</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingLogs ? (
                  <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
                ) : logs.length === 0 ? (
                  <p className="text-center text-muted-foreground py-10">No logs recorded.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border/30">
                          <TableHead>Method</TableHead>
                          <TableHead>Path</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>IP</TableHead>
                          <TableHead>Bot</TableHead>
                          <TableHead>User ID</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead className="w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {logs.map((log) => (
                          <TableRow key={log.id} className="border-border/20">
                            <TableCell>
                              <Badge variant="outline" className={`font-mono text-xs ${getMethodColor(log.method)}`}>
                                {log.method}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-mono text-sm max-w-[200px] truncate">{log.path}</TableCell>
                            <TableCell>
                              <span className={`font-mono text-sm font-medium ${getStatusColor(log.status)}`}>
                                {log.status ?? '—'}
                              </span>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">{log.ip || '—'}</TableCell>
                            <TableCell>
                              {log.isBot ? (
                                <div className="flex items-center gap-1 text-yellow-500">
                                  <Bot className="w-4 h-4" />
                                  <span className="text-xs">{log.botScore ?? ''}</span>
                                </div>
                              ) : (
                                <span className="text-xs text-muted-foreground">No</span>
                              )}
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm max-w-[120px] truncate">{log.userId || '—'}</TableCell>
                            <TableCell className="text-muted-foreground text-sm">{formatDate(log.createdAt)}</TableCell>
                            <TableCell>
                              <DeleteButton id={log.id} onDelete={handleDeleteLog} label="Log" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
                <PaginationControls page={logPage} totalPages={totalPages(logTotal)} onPageChange={fetchLogs} loading={loadingLogs} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
