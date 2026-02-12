import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar, Award, Lightbulb, Heart, Shield, TrendingUp, BarChart3, Star } from 'lucide-react';

interface BusinessProjectManagerTemplateProps {
  data: ResumeData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
};

const skillLevelPercent = (level: string) => {
  switch (level) {
    case 'expert': return 95;
    case 'advanced': return 80;
    case 'intermediate': return 60;
    case 'beginner': return 40;
    default: return 60;
  }
};

export const BusinessProjectManagerTemplate: React.FC<BusinessProjectManagerTemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills } = data;
  const safeExperiences = experiences || [];
  const safeEducation = education || [];
  const safeSkills = skills || [];

  const achievementIcons = [Award, TrendingUp, Shield, BarChart3, Star, Lightbulb];
  const achievements = safeExperiences.slice(0, 5).map((exp, i) => {
    const Icon = achievementIcons[i % achievementIcons.length];
    const firstLine = exp.description?.split('\n').filter(Boolean)[0]?.replace(/^[•\-\s]+/, '') || `Key contribution at ${exp.company}`;
    return { icon: Icon, title: exp.position, description: firstLine };
  });

  return (
     <div className="bg-white text-gray-800 font-sans flex flex-col pt-3" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", minHeight: '297mm' }}>
       {/* Header */}
       <header className="px-7 pt-5 pb-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-[26px] font-extrabold text-gray-900 tracking-tight uppercase leading-tight">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-sm font-semibold text-emerald-600 mt-0.5">
              {personalInfo.title || 'Professional Title'}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2.5 text-[11px] text-gray-600">
              {personalInfo.phone && (
                <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-emerald-600" />{personalInfo.phone}</span>
              )}
              {personalInfo.email && (
                <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-emerald-600" />{personalInfo.email}</span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1"><Linkedin className="w-3 h-3 text-emerald-600" />{personalInfo.linkedin}</span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-600" />{personalInfo.location}</span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-emerald-600" />{personalInfo.website}</span>
              )}
            </div>
          </div>
          {personalInfo.photo && (
            <img
              src={personalInfo.photo}
              alt={personalInfo.fullName}
              className="w-[72px] h-[72px] object-cover border-2 border-gray-200 ml-4 shadow-sm"
            />
          )}
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 px-7 py-4 gap-5">
        {/* Left Column */}
        <div className="flex-[3] min-w-0">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="mb-4">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-900 mb-1.5 pb-1 border-b-2 border-emerald-500">
                Summary
              </h2>
              <p className="text-[11px] text-gray-600 leading-[1.6]">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {safeExperiences.length > 0 && (
            <section className="mb-4">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-900 mb-2 pb-1 border-b-2 border-emerald-500">
                Experience
              </h2>
              <div className="space-y-3.5">
                {safeExperiences.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="text-[12px] font-bold text-gray-900 leading-tight">{exp.position}</h3>
                    <p className="text-[11px] font-semibold text-emerald-600">{exp.company}</p>
                    <div className="flex items-center gap-3 text-[10px] text-gray-500 mt-0.5 mb-1">
                      <span className="flex items-center gap-0.5">
                        <Calendar className="w-2.5 h-2.5" />
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-2.5 h-2.5" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                    {exp.description && (
                      <ul className="text-[11px] text-gray-600 space-y-0.5 ml-3">
                        {exp.description.split('\n').filter(Boolean).map((line, i) => (
                          <li key={i} className="list-disc leading-[1.55]">{line.replace(/^[•\-\s]+/, '')}</li>
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
            <section className="mb-4">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-900 mb-2 pb-1 border-b-2 border-emerald-500">
                Education
              </h2>
              <div className="space-y-2.5">
                {safeEducation.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-[12px] font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <p className="text-[11px] font-semibold text-emerald-600">{edu.institution}</p>
                    <div className="flex items-center gap-3 text-[10px] text-gray-500 mt-0.5">
                      <span className="flex items-center gap-0.5">
                        <Calendar className="w-2.5 h-2.5" />
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Additional Skills Detail */}
          {safeSkills.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-900 mb-2 pb-1 border-b-2 border-emerald-500">
                Technical Proficiency
              </h2>
              <div className="space-y-1.5">
                {safeSkills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-700 w-28 shrink-0 font-medium">{skill.name}</span>
                    <div className="flex-1 bg-gray-100 h-2">
                      <div
                        className="bg-emerald-500 h-2"
                        style={{ width: `${skillLevelPercent(skill.level)}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-gray-400 w-16 text-right capitalize">{skill.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="flex-[2] min-w-0">
          {/* Achievements */}
          {achievements.length > 0 && (
            <section className="mb-4">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-900 mb-2 pb-1 border-b-2 border-emerald-500">
                Achievements
              </h2>
              <div className="space-y-2.5">
                {achievements.map((ach, i) => {
                  const Icon = ach.icon;
                  return (
                    <div key={i} className="flex gap-2">
                      <div className="mt-0.5 shrink-0">
                        <Icon className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-bold text-gray-900 leading-tight">{ach.title}</h3>
                        <p className="text-[10px] text-gray-500 leading-[1.5] mt-0.5">{ach.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Skills Tags */}
          {safeSkills.length > 0 && (
            <section className="mb-4">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-900 mb-2 pb-1 border-b-2 border-emerald-500">
                Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {safeSkills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 bg-gray-100 text-[10px] text-gray-700 font-medium leading-none inline-flex items-center justify-center"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Courses */}
          {safeEducation.length > 0 && (
            <section className="mb-4">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-900 mb-2 pb-1 border-b-2 border-emerald-500">
                Courses
              </h2>
              <div className="space-y-2">
                {safeEducation.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-[11px] font-bold text-emerald-600 leading-tight">{edu.degree} in {edu.field}</h3>
                    <p className="text-[10px] text-gray-500 leading-[1.5] mt-0.5">
                      Completed at {edu.institution}{edu.gpa ? `, achieving a GPA of ${edu.gpa}` : ''}.
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Passions */}
          {safeSkills.length >= 2 && (
            <section className="mb-4">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-900 mb-2 pb-1 border-b-2 border-emerald-500">
                Passions
              </h2>
              <div className="space-y-2">
                {safeSkills.slice(0, 3).map((skill, i) => {
                  const icons = [Lightbulb, Heart, Star];
                  const Icon = icons[i % icons.length];
                  return (
                    <div key={skill.id} className="flex gap-2">
                      <div className="mt-0.5 shrink-0">
                        <Icon className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-bold text-gray-900">{skill.name}</h3>
                        <p className="text-[10px] text-gray-500 leading-[1.5] mt-0.5">
                          Passionate about {skill.name.toLowerCase()}, continuously seeking growth and excellence in this domain.
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Core Competencies */}
          {safeSkills.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-900 mb-2 pb-1 border-b-2 border-emerald-500">
                Core Competencies
              </h2>
              <div className="space-y-1.5">
                {safeSkills.slice(0, 5).map((skill) => (
                  <div key={skill.id} className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 shrink-0" />
                    <span className="text-[10px] text-gray-700 leading-tight">{skill.name} — <span className="capitalize text-gray-500">{skill.level}</span></span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
