import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ProfessionalTemplateProps {
  data: ResumeData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
};

export const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills } = data;

  return (
     <div className="bg-white text-gray-800 min-h-full font-sans flex pt-3">
       {/* Left Main Column */}
       <div className="flex-1 p-6 pr-4 pt-8">
        {/* Header */}
        <header className="mb-5">
          <div className="flex items-center gap-4 mb-2">
            {personalInfo.photo && (
              <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-14 h-14 rounded-sm object-cover" />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
                {personalInfo.fullName || 'Your Name'}
              </h1>
              <p className="text-sm text-emerald-700 font-medium">
                {personalInfo.title || 'Professional Title'}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            {personalInfo.email && (
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{personalInfo.email}</span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{personalInfo.phone}</span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{personalInfo.linkedin}</span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{personalInfo.location}</span>
            )}
          </div>
        </header>

        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-800 border-b border-emerald-300 pb-1 mb-2">
              Summary
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-800 border-b border-emerald-300 pb-1 mb-3">
              Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <h3 className="text-sm font-bold text-gray-900">{exp.position}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <span className="font-semibold text-emerald-700">{exp.company}</span>
                    {exp.location && <span>• {exp.location}</span>}
                    <span className="ml-auto">
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <ul className="text-xs text-gray-600 space-y-0.5 ml-3">
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
      </div>

      {/* Right Sidebar */}
      <div className="w-[200px] bg-emerald-50 p-5 border-l border-emerald-200">
        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-800 border-b border-emerald-300 pb-1 mb-2">
              Skills
            </h2>
            <div className="space-y-1">
              {skills.map((skill) => (
                <p key={skill.id} className="text-xs text-gray-700">{skill.name}</p>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-800 border-b border-emerald-300 pb-1 mb-2">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-xs font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-xs text-emerald-700">{edu.institution}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages placeholder */}
        {personalInfo.website && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-800 border-b border-emerald-300 pb-1 mb-2">
              Links
            </h2>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Globe className="w-3 h-3" />
              <span>{personalInfo.website}</span>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
