import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar, Award, Lightbulb, BookOpen, Heart, Star, Shield, TrendingUp, BarChart3 } from 'lucide-react';

interface BusinessProjectManagerTemplateProps {
  data: ResumeData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
};

export const BusinessProjectManagerTemplate: React.FC<BusinessProjectManagerTemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills } = data;
  const safeExperiences = experiences || [];
  const safeEducation = education || [];
  const safeSkills = skills || [];

  // Generate achievements from experiences
  const achievements = safeExperiences.slice(0, 4).map((exp, i) => {
    const icons = [Award, TrendingUp, Shield, BarChart3];
    const Icon = icons[i % icons.length];
    const firstLine = exp.description?.split('\n').filter(Boolean)[0] || `Key contribution at ${exp.company}`;
    return { icon: Icon, title: exp.position, description: firstLine };
  });

  return (
    <div className="bg-white text-gray-800 min-h-[297mm] font-sans flex flex-col" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {/* Header */}
      <header className="px-8 pt-8 pb-5 bg-gray-50 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight uppercase">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-base font-semibold text-emerald-600 mt-1">
              {personalInfo.title || 'Professional Title'}
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-xs text-gray-600">
              {personalInfo.phone && (
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-600" />{personalInfo.phone}</span>
              )}
              {personalInfo.email && (
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-emerald-600" />{personalInfo.email}</span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5 text-emerald-600" />{personalInfo.linkedin}</span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-600" />{personalInfo.location}</span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-emerald-600" />{personalInfo.website}</span>
              )}
            </div>
          </div>
          {personalInfo.photo && (
            <img
              src={personalInfo.photo}
              alt={personalInfo.fullName}
              className="w-20 h-20 rounded-lg object-cover border-2 border-gray-200 ml-4 shadow-sm"
            />
          )}
        </div>
      </header>

      {/* Body - Two Column */}
      <div className="flex flex-1 px-8 py-5 gap-6">
        {/* Left Column - ~60% */}
        <div className="flex-[3] min-w-0">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-2 pb-1 border-b-2 border-emerald-500">
                Summary
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {safeExperiences.length > 0 && (
            <section className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-3 pb-1 border-b-2 border-emerald-500">
                Experience
              </h2>
              <div className="space-y-4">
                {safeExperiences.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="text-sm font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-xs font-semibold text-emerald-600">{exp.company}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5 mb-1.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                    {exp.description && (
                      <ul className="text-xs text-gray-600 space-y-1 ml-3">
                        {exp.description.split('\n').filter(Boolean).map((line, i) => (
                          <li key={i} className="list-disc leading-relaxed">{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {safeEducation.length > 0 && (
            <section className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-3 pb-1 border-b-2 border-emerald-500">
                Education
              </h2>
              <div className="space-y-3">
                {safeEducation.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-sm font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <p className="text-xs font-semibold text-emerald-600">{edu.institution}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column - ~40% */}
        <div className="flex-[2] min-w-0">
          {/* Achievements */}
          {achievements.length > 0 && (
            <section className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-3 pb-1 border-b-2 border-emerald-500">
                Achievements
              </h2>
              <div className="space-y-3">
                {achievements.map((ach, i) => {
                  const Icon = ach.icon;
                  return (
                    <div key={i} className="flex gap-2">
                      <div className="mt-0.5 shrink-0">
                        <Icon className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-gray-900 leading-tight">{ach.title}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed mt-0.5 line-clamp-3">{ach.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Skills */}
          {safeSkills.length > 0 && (
            <section className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-3 pb-1 border-b-2 border-emerald-500">
                Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {safeSkills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-2.5 py-1 bg-white border border-gray-300 text-xs text-gray-700 rounded"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Courses - derived from education */}
          {safeEducation.length > 0 && (
            <section className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-3 pb-1 border-b-2 border-emerald-500">
                Courses
              </h2>
              <div className="space-y-2.5">
                {safeEducation.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-xs font-bold text-emerald-600">{edu.degree} in {edu.field}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                      Completed at {edu.institution}{edu.gpa ? `, achieving a GPA of ${edu.gpa}` : ''}.
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Passions - derived from skills */}
          {safeSkills.length >= 2 && (
            <section className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-3 pb-1 border-b-2 border-emerald-500">
                Passions
              </h2>
              <div className="space-y-2.5">
                {safeSkills.slice(0, 2).map((skill, i) => {
                  const icons = [Lightbulb, Heart];
                  const Icon = icons[i % icons.length];
                  return (
                    <div key={skill.id} className="flex gap-2">
                      <div className="mt-0.5 shrink-0">
                        <Icon className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-gray-900">{skill.name}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                          Passionate about {skill.name.toLowerCase()}, continuously seeking growth and excellence in this area.
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
