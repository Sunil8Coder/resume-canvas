import React from 'react';
import { ResumeData } from '@/types/resume';

interface BiodataTemplateProps {
  data: ResumeData;
}

export const BiodataTemplate: React.FC<BiodataTemplateProps> = ({ data }) => {
  const { personalInfo, education, skills } = data;

  return (
    <div className="p-10 font-serif text-gray-800 bg-gradient-to-br from-amber-50 to-orange-50 min-h-full">
      {/* Decorative Header */}
      <div className="text-center mb-8 relative">
        <div className="absolute left-0 right-0 top-1/2 border-t-2 border-amber-400" />
        <div className="relative inline-block bg-gradient-to-br from-amber-50 to-orange-50 px-6">
          {personalInfo.photo ? (
             <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-24 h-24 mx-auto mb-4 rounded-sm object-cover border-4 border-amber-500" />
           ) : (
             <div className="w-20 h-20 mx-auto mb-4 rounded-sm border-4 border-amber-500 bg-amber-100 flex items-center justify-center">
              <span className="text-3xl text-amber-700">
                {personalInfo.fullName.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-amber-800 tracking-wide mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-lg text-amber-600 italic">Biodata</p>
        <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto mt-4 rounded-sm" />
      </div>

      {/* Personal Information Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-amber-800 border-b-2 border-amber-300 pb-2 mb-4">
          Personal Information
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex">
            <span className="font-semibold text-amber-700 w-32">Full Name:</span>
            <span>{personalInfo.fullName || 'Not specified'}</span>
          </div>
          <div className="flex">
            <span className="font-semibold text-amber-700 w-32">Email:</span>
            <span>{personalInfo.email || 'Not specified'}</span>
          </div>
          <div className="flex">
            <span className="font-semibold text-amber-700 w-32">Phone:</span>
            <span>{personalInfo.phone || 'Not specified'}</span>
          </div>
          <div className="flex">
            <span className="font-semibold text-amber-700 w-32">Location:</span>
            <span>{personalInfo.location || 'Not specified'}</span>
          </div>
          <div className="flex">
            <span className="font-semibold text-amber-700 w-32">Profession:</span>
            <span>{personalInfo.title || 'Not specified'}</span>
          </div>
          {personalInfo.linkedin && (
            <div className="flex">
              <span className="font-semibold text-amber-700 w-32">LinkedIn:</span>
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>

      {/* About Section */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-amber-800 border-b-2 border-amber-300 pb-2 mb-4">
            About Me
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line bg-white/50 p-4 rounded-lg border border-amber-200">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-amber-800 border-b-2 border-amber-300 pb-2 mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="bg-white/50 p-4 rounded-lg border border-amber-200">
                <div className="font-semibold text-amber-800">{edu.institution}</div>
                <div className="text-gray-700">
                  {edu.degree} in {edu.field}
                </div>
                <div className="text-sm text-gray-500">
                  {edu.startDate} - {edu.endDate}
                  {edu.gpa && ` | GPA: ${edu.gpa}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills/Interests Section */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-amber-800 border-b-2 border-amber-300 pb-2 mb-4">
            Skills & Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-300 text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Declaration */}
      <div className="mt-12 pt-8 border-t-2 border-amber-300">
        <p className="text-gray-600 italic mb-8">
          I hereby declare that the above information is true to the best of my knowledge and belief.
        </p>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-gray-600">Date: _______________</p>
            <p className="text-gray-600 mt-2">Place: {personalInfo.location || '_______________'}</p>
          </div>
          <div className="text-center">
            <div className="w-40 border-b border-gray-400 mb-2" />
            <p className="text-gray-600">Signature</p>
          </div>
        </div>
      </div>

      {/* Decorative Footer */}
      <div className="mt-8 text-center">
        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto rounded-sm" />
      </div>
    </div>
  );
};
