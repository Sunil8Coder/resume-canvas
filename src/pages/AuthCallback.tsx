import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // Store the token
      localStorage.setItem('auth_token', token);

      // Fetch user profile using the token
      const fetchUser = async () => {
        try {
          const res = await api.get<{ id: string; name: string; email: string; role?: string }>('/auth/me');
          if (res.data) {
            localStorage.setItem('user', JSON.stringify(res.data));
          }
        } catch {
          // Token is saved, user data will load on next refresh
        }

        refreshUser();

        // Redirect based on pending action
        const pendingResume = sessionStorage.getItem('pendingResume');
        if (pendingResume) {
          navigate('/?export=true', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      };

      fetchUser();
    } else {
      const errorMsg = searchParams.get('error');
      setError(errorMsg || 'Authentication failed. Please try again.');
      setTimeout(() => navigate('/auth', { replace: true }), 3000);
    }
  }, [searchParams, navigate, refreshUser]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-destructive font-medium">{error}</p>
          <p className="text-sm text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
