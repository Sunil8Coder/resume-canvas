import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface CreativeTemplateProps {
  data: ResumeData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const skillLevelDots = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
};

export const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <div className="bg-white text-gray-900 min-h-full" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Vibrant Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600"></div>
        <div className="absolute inset-0 opacity-20">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-lg -translate-y-1/2 translate-x-1/2"></div>
           <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-lg translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="relative px-8 py-10 text-white">
          <div className="flex items-center gap-6">
            {personalInfo.photo && (
              <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-24 h-24 rounded-2xl object-cover border-2 border-white/30" />
            )}
            <div>
              <h1 className="text-4xl font-black mb-2">
                {personalInfo.fullName || 'Your Name'}
              </h1>
              <p className="text-xl text-purple-200 font-light mb-6">
                {personalInfo.title || 'Professional Title'}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            {personalInfo.email && (
               <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-sm">
                <Mail className="w-4 h-4" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
               <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-sm">
                <Phone className="w-4 h-4" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
               <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-sm">
                <MapPin className="w-4 h-4" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
               <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-sm">
                <Linkedin className="w-4 h-4" />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-sm">
                <Globe className="w-4 h-4" />
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="px-8 py-6">
        {/* About */}
        {personalInfo.summary && (
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                ✦
              </span>
              <h2 className="text-xl font-bold text-gray-900">About Me</h2>
            </div>
            <p className="text-gray-700 leading-relaxed pl-13">
              {personalInfo.summary}
            </p>
          </section>
        )}

        <div className="grid grid-cols-3 gap-6">
          {/* Experience - Takes 2 columns */}
          <div className="col-span-2">
            {experiences.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    💼
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">Experience</h2>
                </div>
                <div className="space-y-5">
                  {experiences.map((exp, index) => (
                    <div key={exp.id} className="relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-400 to-fuchsia-400 rounded-sm"></div>
                      <div className="pl-5">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-bold text-gray-900">{exp.position}</h3>
                            <p className="text-violet-600 font-medium text-sm">{exp.company}</p>
                          </div>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs mb-2">{exp.location}</p>
                        {exp.description && (
                          <p className="text-gray-700 text-sm whitespace-pre-line">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    🎓
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">Education</h2>
                </div>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="bg-gradient-to-r from-violet-50 to-fuchsia-50 p-4 rounded-xl">
                      <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                      <p className="text-violet-700 text-sm">{edu.degree} in {edu.field}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                        {edu.gpa && ` • GPA: ${edu.gpa}`}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Skills - Takes 1 column */}
          <div>
            {skills.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    ⚡
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">Skills</h2>
                </div>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.id} className="bg-gray-50 p-3 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900 text-sm">{skill.name}</span>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((dot) => (
                          <div
                            key={dot}
                            className={`w-3 h-3 rounded-sm ${
                              dot <= skillLevelDots[skill.level]
                                ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500'
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
