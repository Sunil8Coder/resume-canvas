import { ResumeData } from '@/types/resume';
import defaultAvatar from '@/assets/default-avatar.jpg';

// Convert the imported image URL to a base64 data URL for embedding
const loadDefaultPhoto = async (): Promise<string> => {
  try {
    const response = await fetch(defaultAvatar);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch {
    return '';
  }
};

// We'll use the URL directly since html2canvas handles it fine
// and convert to base64 only when needed for export
export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: 'John Anderson',
    email: 'john.anderson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    title: 'Senior Software Engineer',
    summary: 'Passionate software engineer with 8+ years of experience building scalable web applications. Expertise in React, TypeScript, and cloud technologies. Led teams of 5-10 engineers and delivered projects that increased user engagement by 40%.',
    linkedin: 'linkedin.com/in/johnanderson',
    website: 'johnanderson.dev',
    photo: defaultAvatar,
  },
  experiences: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: '',
      current: true,
      description: '• Led development of microservices architecture serving 2M+ users\n• Mentored junior developers and conducted code reviews\n• Reduced API response time by 60% through optimization',
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Software Engineer',
      location: 'New York, NY',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      description: '• Built real-time collaboration features using WebSocket\n• Implemented CI/CD pipelines reducing deployment time by 75%\n• Developed mobile-responsive interfaces with React',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'Stanford University',
      degree: 'Master of Science',
      field: 'Computer Science',
      startDate: '2016-09',
      endDate: '2018-05',
      gpa: '3.9',
    },
    {
      id: '2',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2012-09',
      endDate: '2016-05',
      gpa: '3.7',
    },
  ],
  skills: [
    { id: '1', name: 'React', level: 'expert' },
    { id: '2', name: 'TypeScript', level: 'expert' },
    { id: '3', name: 'Node.js', level: 'advanced' },
    { id: '4', name: 'Python', level: 'advanced' },
    { id: '5', name: 'AWS', level: 'intermediate' },
    { id: '6', name: 'Docker', level: 'intermediate' },
  ],
  sectionOrder: ['experience', 'education', 'skills'],
};
