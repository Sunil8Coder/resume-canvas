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
      // Store the token immediately
      localStorage.setItem('auth_token', token);

      // Try to fetch user profile from backend
      const fetchAndRedirect = async () => {
        try {
          const res = await api.get<{ id: string; name: string; email: string; role?: string; roleId?: string }>('/auth/me');
          if (res.data) {
            localStorage.setItem('user', JSON.stringify(res.data));
          } else {
            // Fallback: decode JWT payload to get basic user info
            try {
              const payload = JSON.parse(atob(token.split('.')[1]));
              const fallbackUser = {
                id: payload.userId || payload.sub || '',
                name: payload.name || 'User',
                email: payload.email || '',
                role: payload.roleId || payload.role || 'USER',
              };
              localStorage.setItem('user', JSON.stringify(fallbackUser));
            } catch {
              // Could not decode token
            }
          }
        } catch {
          // Fallback: decode JWT payload
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const fallbackUser = {
              id: payload.userId || payload.sub || '',
              name: payload.name || 'User',
              email: payload.email || '',
              role: payload.roleId || payload.role || 'USER',
            };
            localStorage.setItem('user', JSON.stringify(fallbackUser));
          } catch {
            // Minimal fallback
          }
        }

        // Refresh auth context with stored data
        refreshUser();

        // Redirect based on pending action
        const pendingResume = sessionStorage.getItem('pendingResume');
        if (pendingResume) {
          navigate('/?restoreResume=true', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      };

      fetchAndRedirect();
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
