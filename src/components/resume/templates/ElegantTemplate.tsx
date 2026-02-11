import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ElegantTemplateProps {
  data: ResumeData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const ElegantTemplate: React.FC<ElegantTemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <div className="bg-gradient-to-br from-stone-50 to-amber-50 text-gray-900 p-8 min-h-full font-serif">
      {/* Header */}
      <header className="text-center mb-8">
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-24 h-24 rounded-sm object-cover mx-auto mb-4 border-2 border-amber-400 shadow-md" />
        )}
        <div className="inline-block">
          <h1 className="text-4xl font-light text-stone-800 tracking-widest mb-2">
            {personalInfo.fullName?.toUpperCase() || 'YOUR NAME'}
          </h1>
          <div className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent mb-2" />
          <p className="text-lg text-amber-700 tracking-wide">{personalInfo.title || 'Professional Title'}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-stone-600 mt-6">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-amber-600" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-amber-600" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-600" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1.5">
              <Linkedin className="w-4 h-4 text-amber-600" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-amber-600" />
              {personalInfo.website}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-12 bg-amber-400" />
            <span className="text-xs uppercase tracking-widest text-amber-700">Profile</span>
            <div className="h-px w-12 bg-amber-400" />
          </div>
          <p className="text-sm leading-relaxed text-stone-700 italic">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px flex-1 bg-amber-200" />
            <span className="text-xs uppercase tracking-widest text-amber-700 font-semibold">Experience</span>
            <div className="h-px flex-1 bg-amber-200" />
          </div>
          <div className="space-y-5">
            {experiences.map((exp) => (
              <div key={exp.id} className="text-center">
                <h3 className="font-semibold text-stone-800 text-lg">{exp.position}</h3>
                <p className="text-amber-700">{exp.company}</p>
                <p className="text-sm text-stone-500">
                  {exp.location} • {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                </p>
                {exp.description && (
                  <p className="text-sm text-stone-600 mt-2 max-w-xl mx-auto whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px flex-1 bg-amber-200" />
            <span className="text-xs uppercase tracking-widest text-amber-700 font-semibold">Education</span>
            <div className="h-px flex-1 bg-amber-200" />
          </div>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="text-center">
                <h3 className="font-semibold text-stone-800">{edu.institution}</h3>
                <p className="text-amber-700">
                  {edu.degree} in {edu.field}
                </p>
                <p className="text-sm text-stone-500">
                  {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px flex-1 bg-amber-200" />
            <span className="text-xs uppercase tracking-widest text-amber-700 font-semibold">Expertise</span>
            <div className="h-px flex-1 bg-amber-200" />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-4 py-1.5 bg-white/60 text-stone-700 text-sm rounded-sm border border-amber-200 shadow-sm"
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
