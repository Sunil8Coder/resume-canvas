import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface CorporateTemplateProps {
  data: ResumeData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const CorporateTemplate: React.FC<CorporateTemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <div className="flex min-h-full font-sans">
      {/* Left Sidebar */}
      <div className="w-[35%] bg-slate-800 text-white p-6 flex flex-col">
        {/* Photo */}
        {personalInfo.photo && (
          <div className="mb-5 flex justify-center">
            <img
              src={personalInfo.photo}
              alt={personalInfo.fullName}
              className="w-28 h-28 rounded-lg object-cover border-2 border-sky-400 shadow-lg"
            />
          </div>
        )}

        {/* Contact */}
        <div className="mb-6">
          <h2 className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-3 border-b border-sky-400/30 pb-1">Contact</h2>
          <div className="space-y-2 text-sm">
            {personalInfo.email && (
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                <span className="text-slate-300 break-all text-xs">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                <span className="text-slate-300 text-xs">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                <span className="text-slate-300 text-xs">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-start gap-2">
                <Linkedin className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                <span className="text-slate-300 text-xs break-all">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-start gap-2">
                <Globe className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                <span className="text-slate-300 text-xs break-all">{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-3 border-b border-sky-400/30 pb-1">Skills</h2>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <span className="text-xs text-slate-300">{skill.name}</span>
                   <div className="w-full bg-slate-600 h-1.5 mt-1">
                     <div
                       className="bg-sky-400 h-1.5"
                      style={{
                        width: skill.level === 'expert' ? '95%' : skill.level === 'advanced' ? '80%' : skill.level === 'intermediate' ? '60%' : '40%',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-3 border-b border-sky-400/30 pb-1">Education</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-sm font-semibold text-white">{edu.degree}</p>
                  <p className="text-xs text-sky-300">{edu.institution}</p>
                  <p className="text-xs text-slate-400">{edu.field}</p>
                  <p className="text-xs text-slate-500">
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                    {edu.gpa && ` • ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-[65%] bg-white p-7">
        {/* Name & Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-lg text-sky-600 font-medium mt-1">
            {personalInfo.title || 'Professional Title'}
          </p>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-sm uppercase tracking-widest text-slate-800 font-bold mb-2 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-sky-500" />
              Profile
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm uppercase tracking-widest text-slate-800 font-bold mb-3 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-sky-500" />
              Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-sky-200">
                  <div className="absolute left-[-5px] top-1 w-2 h-2 bg-sky-500 rounded-sm" />
                  <h3 className="font-semibold text-slate-800">{exp.position}</h3>
                  <p className="text-sm text-sky-600 font-medium">{exp.company}</p>
                  <p className="text-xs text-slate-400 mb-1">
                    {exp.location} • {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                  {exp.description && (
                    <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
