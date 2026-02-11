import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ExecutiveTemplateProps {
  data: ResumeData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <div className="bg-white text-gray-900 min-h-full" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header with elegant gold accent */}
      <header className="bg-gradient-to-r from-amber-900 to-amber-800 text-white px-8 py-10">
        <div className="flex items-center gap-6">
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-24 h-24 rounded-sm object-cover border-2 border-amber-300" />
          )}
          <div>
            <h1 className="text-4xl font-bold tracking-wide mb-2">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-amber-200 text-xl mb-4">
              {personalInfo.title || 'Professional Title'}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm text-amber-100">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>

      <div className="px-8 py-6">
        {/* Executive Summary */}
        {personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-amber-900 uppercase tracking-widest border-b-2 border-amber-200 pb-2 mb-4">
              Executive Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm italic">
              "{personalInfo.summary}"
            </p>
          </section>
        )}

        {/* Professional Experience */}
        {experiences.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-amber-900 uppercase tracking-widest border-b-2 border-amber-200 pb-2 mb-4">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-base font-bold text-gray-900">{exp.position}</h3>
                    <span className="text-sm text-gray-600">
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-amber-800 font-semibold text-sm mb-2">
                    {exp.company} • {exp.location}
                  </p>
                  {exp.description && (
                    <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="flex gap-8">
          {/* Education */}
          {education.length > 0 && (
            <section className="flex-1">
              <h2 className="text-lg font-bold text-amber-900 uppercase tracking-widest border-b-2 border-amber-200 pb-2 mb-4">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-gray-900 text-sm">{edu.institution}</h3>
                    <p className="text-gray-700 text-sm">
                      {edu.degree} in {edu.field}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Core Competencies */}
          {skills.length > 0 && (
            <section className="flex-1">
              <h2 className="text-lg font-bold text-amber-900 uppercase tracking-widest border-b-2 border-amber-200 pb-2 mb-4">
                Core Competencies
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
