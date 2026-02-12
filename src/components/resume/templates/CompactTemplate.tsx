import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface CompactTemplateProps {
  data: ResumeData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const CompactTemplate: React.FC<CompactTemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <div className="bg-white text-gray-900 px-6 pt-8 pb-6 min-h-full font-sans text-sm">
      {/* Header - Compact */}
      <header className="mb-4 pb-3 border-b border-gray-300">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div className="flex items-center gap-3">
            {personalInfo.photo && (
              <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-14 h-14 object-cover" />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {personalInfo.fullName || 'Your Name'}
              </h1>
              <p className="text-gray-600">{personalInfo.title || 'Professional Title'}</p>
            </div>
          </div>
          <div className="text-right text-xs text-gray-600 space-y-0.5">
            {personalInfo.email && (
              <div className="flex items-center justify-end gap-1">
                <Mail className="w-3 h-3" />
                {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center justify-end gap-1">
                <Phone className="w-3 h-3" />
                {personalInfo.phone}
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center justify-end gap-1">
                <MapPin className="w-3 h-3" />
                {personalInfo.location}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-4 mt-2 text-xs text-gray-500">
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {personalInfo.website}
            </span>
          )}
        </div>
      </header>

      {/* Summary - Compact */}
      {personalInfo.summary && (
        <section className="mb-3">
          <p className="text-xs leading-relaxed text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Two Column Layout for Experience and Education */}
      <div className="grid grid-cols-3 gap-4">
        {/* Main Column - Experience */}
        <div className="col-span-2">
          {experiences.length > 0 && (
            <section className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2 border-b border-gray-200 pb-1">
                Experience
              </h2>
              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{exp.position}</h3>
                        <p className="text-gray-600 text-xs">{exp.company}, {exp.location}</p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-xs text-gray-600 mt-1 whitespace-pre-line leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Side Column - Education & Skills */}
        <div className="col-span-1">
          {education.length > 0 && (
            <section className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2 border-b border-gray-200 pb-1">
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-gray-900 text-xs">{edu.institution}</h3>
                    <p className="text-gray-600 text-xs">
                      {edu.degree}, {edu.field}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {formatDate(edu.endDate)}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2 border-b border-gray-200 pb-1">
                Skills
              </h2>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs"
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
