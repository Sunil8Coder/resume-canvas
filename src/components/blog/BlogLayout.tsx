import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Footer from '@/components/Footer';

interface BlogLayoutProps {
  title: string;
  date: string;
  readTime: string;
  description: string;
  children: React.ReactNode;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ title, date, readTime, description, children }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet title={title} description={description} />
      <article className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" /> All articles
          </Link>

          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{readTime}</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none text-foreground
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-4
            [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-3
            [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:text-muted-foreground
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:text-muted-foreground
            [&_li]:mb-2 [&_strong]:text-foreground
          ">
            {children}
          </div>

          <div className="mt-12 p-6 border border-border/50 rounded-xl bg-card text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Ready to build your resume?</h3>
            <p className="text-muted-foreground mb-4">Create a professional resume or biodata for free — no sign-up needed.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Start Building Free →
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

const Helmet: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  React.useEffect(() => {
    document.title = `${title} | Resume4J Blog`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
    return () => {
      document.title = 'Resume4J - Free Biodata Maker for Freshers India | Simple Resume Builder No Sign Up';
    };
  }, [title, description]);
  return null;
};

export default BlogLayout;
