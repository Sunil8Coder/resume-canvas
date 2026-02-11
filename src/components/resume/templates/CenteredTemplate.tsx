import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface CenteredTemplateProps {
  data: ResumeData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
};

export const CenteredTemplate: React.FC<CenteredTemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <div className="bg-white text-gray-800 p-8 min-h-full font-sans">
      {/* Centered Header */}
      <header className="text-center mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center justify-center gap-4 mb-2">
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-16 h-16 rounded-sm object-cover" />
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-sm text-gray-500">
              {personalInfo.title || 'Professional Title'}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-500 mt-2">
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
          {personalInfo.website && (
            <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{personalInfo.website}</span>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-center text-sm font-semibold text-gray-700 mb-2">Summary</h2>
          <p className="text-xs text-gray-600 leading-relaxed text-center max-w-2xl mx-auto">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-center text-sm font-semibold text-gray-700 mb-4 pb-1 border-b border-gray-100">
            Experience
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{exp.company}</h3>
                    <p className="text-xs text-gray-600 font-medium">{exp.position}</p>
                  </div>
                  <div className="text-right text-xs text-gray-500 shrink-0 ml-4">
                    <p>{exp.location}</p>
                    <p>{formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                  </div>
                </div>
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

      {/* Skills as tags */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-center text-sm font-semibold text-gray-700 mb-3 pb-1 border-b border-gray-100">
            Skills
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs border border-gray-200"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-center text-sm font-semibold text-gray-700 mb-3 pb-1 border-b border-gray-100">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{edu.institution}</h3>
                  <p className="text-xs text-gray-600">{edu.degree} in {edu.field}</p>
                </div>
                <div className="text-right text-xs text-gray-500 shrink-0 ml-4">
                  <p>{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</p>
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Achievements Grid */}
      {experiences.length > 0 && (
        <section>
          <h2 className="text-center text-sm font-semibold text-gray-700 mb-3 pb-1 border-b border-gray-100">
            Key Achievements
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {experiences.slice(0, 4).map((exp) => (
              <div key={exp.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <h3 className="text-xs font-bold text-gray-800 mb-1">{exp.position}</h3>
                <p className="text-xs text-gray-500 line-clamp-3">
                  {exp.description?.split('\n')[0] || `Key role at ${exp.company}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
