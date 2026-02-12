import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Terminal, Code } from 'lucide-react';

interface TechTemplateProps {
  data: ResumeData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const TechTemplate: React.FC<TechTemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <div className="bg-slate-900 text-gray-100 px-8 pt-10 pb-8 min-h-full font-mono">
      {/* Header */}
      <header className="mb-8 border-b border-emerald-500/30 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Terminal className="w-5 h-5 text-emerald-400" />
          <span className="text-emerald-400 text-sm">~/portfolio</span>
        </div>
        <div className="flex items-center gap-4">
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-16 h-16 object-cover border border-emerald-500/50" />
          )}
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-emerald-400 text-lg">{personalInfo.title || 'Professional Title'}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-emerald-500" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-emerald-500" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-500" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3 text-emerald-500" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-emerald-500" />
              {personalInfo.website}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2">
            <Code className="w-4 h-4" />
            README.md
          </h2>
          <div className="bg-slate-800/50 p-4 border border-slate-700">
            <p className="text-sm leading-relaxed text-gray-300">{personalInfo.summary}</p>
          </div>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
            <span className="text-gray-500">$</span> git log --oneline experience
          </h2>
          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative pl-6 border-l-2 border-slate-700">
                <div className="absolute left-[-9px] top-1 w-4 h-4 bg-emerald-500 flex items-center justify-center">
                  <span className="text-xs text-slate-900 font-bold">{index + 1}</span>
                </div>
                <div className="bg-slate-800/30 p-3">
                  <div className="flex justify-between items-start mb-1 flex-wrap gap-2">
                    <div>
                      <h3 className="font-bold text-white">{exp.position}</h3>
                      <p className="text-emerald-400 text-sm">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-500 bg-slate-800 px-2 py-1">
                      {formatDate(exp.startDate)} → {exp.current ? 'HEAD' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-400 mt-2 whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
            <span className="text-gray-500">$</span> cat education.json
          </h2>
          <div className="bg-slate-800/30 p-4 border border-slate-700">
            {education.map((edu, index) => (
              <div key={edu.id} className={index > 0 ? 'mt-3 pt-3 border-t border-slate-700' : ''}>
                <h3 className="font-bold text-white">{edu.institution}</h3>
                <p className="text-sm text-gray-400">
                  <span className="text-cyan-400">{edu.degree}</span> in{' '}
                  <span className="text-yellow-400">{edu.field}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  {edu.gpa && <span className="text-emerald-400"> | GPA: {edu.gpa}</span>}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
            <span className="text-gray-500">$</span> npm list --depth=0
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-slate-800 text-emerald-400 text-sm border border-emerald-500/30"
              >
                {skill.name}
                <span className="text-gray-500 text-xs ml-1">@{skill.level}</span>
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
