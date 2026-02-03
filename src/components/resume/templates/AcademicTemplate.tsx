import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, BookOpen } from 'lucide-react';

interface AcademicTemplateProps {
  data: ResumeData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const AcademicTemplate: React.FC<AcademicTemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <div className="bg-white text-gray-900 p-8 min-h-full font-serif">
      {/* Header */}
      <header className="text-center mb-8 pb-6 border-b-4 border-double border-indigo-800">
        <h1 className="text-3xl font-bold text-indigo-900 mb-1 tracking-wide">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-lg text-indigo-700 italic mb-4">{personalInfo.title || 'Professional Title'}</p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-indigo-600" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-indigo-600" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-indigo-600" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3 text-indigo-600" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-indigo-600" />
              {personalInfo.website}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Research Statement
          </h2>
          <p className="text-sm leading-relaxed text-gray-700 italic pl-4 border-l-2 border-indigo-200">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Education - Prioritized for Academic */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-indigo-900 mb-3 pb-1 border-b-2 border-indigo-800">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <p className="text-indigo-700 italic">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
                {edu.gpa && (
                  <p className="text-sm text-gray-600 mt-1">
                    Cumulative GPA: <span className="font-semibold">{edu.gpa}</span>/4.0
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-indigo-900 mb-3 pb-1 border-b-2 border-indigo-800">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-indigo-700 italic">{exp.company}, {exp.location}</p>
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-indigo-900 mb-3 pb-1 border-b-2 border-indigo-800">
            Areas of Expertise
          </h2>
          <div className="flex flex-wrap gap-2 pl-4">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-indigo-50 text-indigo-800 text-sm rounded-full border border-indigo-200"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
