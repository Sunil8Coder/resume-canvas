import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface TimelineTemplateProps {
  data: ResumeData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const TimelineTemplate: React.FC<TimelineTemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <div className="bg-white text-gray-800 px-8 pt-10 pb-8 min-h-full font-sans">
      {/* Header */}
      <header className="flex items-center gap-6 mb-8 pb-6 border-b-2 border-emerald-500">
        {personalInfo.photo && (
          <img
            src={personalInfo.photo}
            alt={personalInfo.fullName}
            className="w-20 h-20 object-cover border-3 border-emerald-500 shadow-md"
          />
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-lg text-emerald-600 font-medium">{personalInfo.title || 'Professional Title'}</p>
          <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
            {personalInfo.email && (
              <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-emerald-500" />{personalInfo.email}</span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-emerald-500" />{personalInfo.phone}</span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-500" />{personalInfo.location}</span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1"><Linkedin className="w-3 h-3 text-emerald-500" />{personalInfo.linkedin}</span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-emerald-500" />{personalInfo.website}</span>
            )}
          </div>
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-7 bg-emerald-50 p-4 border-l-4 border-emerald-500">
          <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience Timeline */}
      {experiences.length > 0 && (
        <section className="mb-7">
          <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-700 mb-4">Career Timeline</h2>
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-emerald-200" />
            <div className="space-y-5">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-7">
                  <div className="absolute left-0 top-1.5 w-4 h-4 bg-emerald-500 border-2 border-white shadow" />
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <span className="text-xs text-emerald-600 font-medium shrink-0 ml-2">
                      {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-sm text-emerald-700 font-medium">{exp.company} • {exp.location}</p>
                  {exp.description && (
                    <p className="text-xs text-gray-600 mt-1 whitespace-pre-line leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-7">
          <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-700 mb-4">Education</h2>
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-emerald-200" />
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-7">
                  <div className="absolute left-0 top-1.5 w-4 h-4 bg-emerald-400 border-2 border-white shadow" />
                  <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                  <p className="text-sm text-emerald-700">{edu.degree} in {edu.field}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-700 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium border border-emerald-200"
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
