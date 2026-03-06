import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Footer from '@/components/Footer';

const blogPosts = [
  {
    slug: 'how-to-make-biodata-for-first-job',
    title: 'How to Make a Biodata for Your First Job in 2026',
    excerpt: 'Step-by-step guide to creating a perfect biodata for freshers. Includes free biodata format templates and tips for Indian job seekers.',
    date: '2026-03-01',
    readTime: '6 min',
    keywords: ['biodata for first job', 'freshers biodata format', 'biodata maker'],
  },
  {
    slug: 'best-resume-format-freshers-india-2026',
    title: 'Best Resume Format for Freshers in India 2026',
    excerpt: 'Discover the best resume formats that Indian recruiters prefer in 2026. Free templates included for engineering, MBA, and BCA graduates.',
    date: '2026-02-25',
    readTime: '7 min',
    keywords: ['resume format freshers India', 'best resume 2026', 'fresher resume template'],
  },
  {
    slug: 'free-resume-templates-software-engineers',
    title: 'Free Resume Templates for Software Engineers',
    excerpt: 'Professional resume templates designed for software developers. Optimised for ATS with sections for projects, skills, and certifications.',
    date: '2026-02-20',
    readTime: '5 min',
    keywords: ['software engineer resume', 'developer resume template', 'tech resume free'],
  },
  {
    slug: 'java-developer-resume-guide',
    title: 'Java Developer Resume Builder — Free Guide & Templates',
    excerpt: 'Build an impressive Java developer resume with our free builder. Includes action verbs, project descriptions, and ATS-friendly formats.',
    date: '2026-02-15',
    readTime: '8 min',
    keywords: ['Java developer resume', 'Java resume builder free', 'developer CV'],
  },
  {
    slug: 'biodata-format-maker-online-guide',
    title: 'Biodata Format Maker Online — Complete Guide',
    excerpt: 'Create professional biodata online in minutes. Free biodata format maker with templates for marriage, job applications, and personal use.',
    date: '2026-02-10',
    readTime: '6 min',
    keywords: ['biodata format maker online', 'free biodata maker', 'biodata template'],
  },
];

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <Link to="/" className="text-sm text-primary hover:underline mb-4 inline-block">← Back to Resume Builder</Link>
            <h1 className="text-4xl font-bold text-foreground mb-3">Resume4J Blog</h1>
            <p className="text-muted-foreground text-lg">Tips, templates & guides to land your dream job</p>
          </div>

          <div className="space-y-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="block group border border-border/50 rounded-xl p-6 hover:border-primary/30 hover:shadow-lg transition-all bg-card"
              >
                <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-3">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                  <span className="ml-auto text-primary flex items-center gap-1 group-hover:gap-2 transition-all">Read more <ArrowRight className="w-4 h-4" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
