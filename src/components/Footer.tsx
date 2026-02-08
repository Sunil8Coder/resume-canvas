import React from 'react';
import { FileText, Heart, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/30 mt-auto bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))`,
                }}
              >
                <FileText className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold gradient-text">Resume4J</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Create stunning, professional resumes and biodata completely free. No hidden fees, no watermarks — just your career, beautifully presented.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigate('/')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Resume Builder
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/my-resumes')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  My Resumes
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/profile')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  My Profile
                </button>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Resume4J is a product of{' '}
              <span className="font-semibold gradient-text">Scriptimiz Insight LLP</span>.
              We believe everyone deserves access to professional resume tools — completely free.
            </p>
            <a
              href="https://resume4j.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              resume4j.com
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/20 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              © {currentYear} Resume4J. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-destructive fill-destructive" /> by{' '}
              <span className="font-semibold gradient-text">Scriptimiz Insight LLP</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
