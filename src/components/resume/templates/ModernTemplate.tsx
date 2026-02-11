import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const skillLevelWidth = {
  beginner: '25%',
  intermediate: '50%',
  advanced: '75%',
  expert: '100%',
};

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <div className="bg-white text-gray-900 min-h-full font-sans flex">
      {/* Sidebar */}
      <aside className="w-1/3 bg-slate-800 text-white p-6">
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-24 h-24 rounded-sm object-cover border-2 border-blue-400 mb-4" />
        )}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-slate-300 text-sm">{personalInfo.title || 'Professional Title'}</p>
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
            Contact
          </h2>
          <div className="space-y-2 text-sm">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span className="break-all text-xs">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="break-all text-xs">{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills with progress bars */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              Skills
            </h2>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{skill.name}</span>
                    <span className="text-slate-400 text-xs capitalize">{skill.level}</span>
                  </div>
                   <div className="h-1.5 bg-slate-600 rounded-sm overflow-hidden">
                     <div
                       className="h-full bg-blue-400 rounded-sm transition-all"
                      style={{ width: skillLevelWidth[skill.level] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-blue-500"></span>
              About Me
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-blue-500"></span>
              Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-blue-200">
                   <div className="absolute left-[-5px] top-0 w-2 h-2 bg-blue-500 rounded-sm"></div>
                  <div className="mb-1">
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-blue-600 text-sm">{exp.company}</p>
                    <p className="text-gray-500 text-xs">
                      {exp.location} | {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-blue-500"></span>
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-4 border-l-2 border-blue-200">
                  <div className="absolute left-[-5px] top-0 w-2 h-2 bg-blue-500 rounded-sm"></div>
                  <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                  <p className="text-sm text-gray-700">
                    {edu.degree} in {edu.field}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    {edu.gpa && ` | GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
