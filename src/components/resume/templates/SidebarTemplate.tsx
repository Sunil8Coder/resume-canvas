import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface SidebarTemplateProps {
  data: ResumeData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
};

export const SidebarTemplate: React.FC<SidebarTemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills } = data;

  return (
     <div className="bg-white text-gray-800 min-h-full font-sans flex pt-3">
       {/* Left Main Content */}
       <div className="flex-1 p-6 pt-8">
        {/* Header */}
        <header className="mb-5">
          <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide mb-1">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-sm text-teal-700 font-semibold mb-3">
            {personalInfo.title || 'Professional Title'}
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            {personalInfo.email && (
              <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-teal-600" />{personalInfo.email}</span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1"><Linkedin className="w-3 h-3 text-teal-600" />{personalInfo.linkedin}</span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-teal-600" />{personalInfo.location}</span>
            )}
          </div>
        </header>

        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-800 mb-2">Summary</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-800 mb-3">Experience</h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold text-gray-900">{exp.position}</h3>
                    <span className="text-xs text-gray-500 shrink-0 ml-2">
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-xs text-teal-700 font-medium">{exp.company} • {exp.location}</p>
                  {exp.description && (
                    <ul className="text-xs text-gray-600 mt-1 ml-3 space-y-0.5">
                      {exp.description.split('\n').filter(Boolean).map((line, i) => (
                        <li key={i} className="list-disc">{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-800 mb-3">Education</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-xs font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-xs text-teal-700">{edu.institution}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Right Dark Sidebar */}
      <div className="w-[200px] bg-teal-900 text-white p-5">
        {/* Photo */}
        {personalInfo.photo && (
          <div className="mb-4 flex justify-center">
            <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-20 h-20 object-cover border-2 border-teal-400" />
          </div>
        )}

        {/* Contact */}
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-teal-300 border-b border-teal-700 pb-1 mb-2">
            Contact
          </h2>
          <div className="space-y-1.5 text-xs text-teal-100">
            {personalInfo.phone && (
              <div className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-teal-400" />{personalInfo.phone}</div>
            )}
            {personalInfo.email && (
              <div className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-teal-400" />{personalInfo.email}</div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-1.5"><Globe className="w-3 h-3 text-teal-400" />{personalInfo.website}</div>
            )}
          </div>
        </section>

        {/* Key Achievements */}
        {experiences.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-300 border-b border-teal-700 pb-1 mb-2">
              Key Achievements
            </h2>
            <div className="space-y-2">
              {experiences.slice(0, 3).map((exp) => (
                <div key={exp.id}>
                  <p className="text-xs font-semibold text-teal-200">{exp.position}</p>
                  <p className="text-xs text-teal-100 opacity-80 line-clamp-2">
                    {exp.description?.split('\n')[0] || `Achievement at ${exp.company}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-300 border-b border-teal-700 pb-1 mb-2">
              Skills
            </h2>
            <div className="space-y-1">
              {skills.map((skill) => (
                <p key={skill.id} className="text-xs text-teal-100">{skill.name}</p>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
