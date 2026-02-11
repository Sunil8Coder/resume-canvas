import React from 'react';
import { ResumeData } from '@/types/resume';

interface MinimalTemplateProps {
  data: ResumeData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <div className="bg-white text-gray-900 p-8 min-h-full font-sans">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-4">
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-16 h-16 rounded-full object-cover" />
          )}
          <div>
            <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-1">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-lg text-gray-500">{personalInfo.title || 'Professional Title'}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <p className="text-sm leading-relaxed text-gray-600 max-w-2xl">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-4">
            Experience
          </h2>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id} className="grid grid-cols-[120px_1fr] gap-4">
                <div className="text-xs text-gray-400">
                  {formatDate(exp.startDate)}
                  <br />
                  {exp.current ? 'Present' : formatDate(exp.endDate)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{exp.position}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {exp.company}, {exp.location}
                  </p>
                  {exp.description && (
                    <p className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-[120px_1fr] gap-4">
                <div className="text-xs text-gray-400">
                  {formatDate(edu.startDate)}
                  <br />
                  {formatDate(edu.endDate)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{edu.institution}</h3>
                  <p className="text-sm text-gray-500">
                    {edu.degree} in {edu.field}
                    {edu.gpa && ` — GPA: ${edu.gpa}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-4">
            Skills
          </h2>
          <p className="text-sm text-gray-600">
            {skills.map((skill) => skill.name).join(' • ')}
          </p>
        </section>
      )}
    </div>
  );
};
