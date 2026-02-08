import React from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Globe, Linkedin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useResume } from '@/contexts/ResumeContext';

export const PersonalInfoForm: React.FC = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const personalInfo = resumeData?.personalInfo ?? {
    fullName: '', email: '', phone: '', location: '', title: '', summary: '', linkedin: '', website: ''
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="fullName"
              value={personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
              placeholder="John Doe"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-foreground">
            Professional Title
          </Label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="title"
              value={personalInfo.title}
              onChange={(e) => updatePersonalInfo('title', e.target.value)}
              placeholder="Software Engineer"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              placeholder="john@example.com"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-foreground">
            Phone
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium text-foreground">
            Location
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="location"
              value={personalInfo.location}
              onChange={(e) => updatePersonalInfo('location', e.target.value)}
              placeholder="San Francisco, CA"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin" className="text-sm font-medium text-foreground">
            LinkedIn
          </Label>
          <div className="relative">
            <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="linkedin"
              value={personalInfo.linkedin || ''}
              onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
              placeholder="linkedin.com/in/johndoe"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="website" className="text-sm font-medium text-foreground">
            Website
          </Label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="website"
              value={personalInfo.website || ''}
              onChange={(e) => updatePersonalInfo('website', e.target.value)}
              placeholder="johndoe.com"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="summary" className="text-sm font-medium text-foreground">
            Professional Summary
          </Label>
          <Textarea
            id="summary"
            value={personalInfo.summary}
            onChange={(e) => updatePersonalInfo('summary', e.target.value)}
            placeholder="Brief summary of your professional background..."
            rows={4}
            className="resize-none"
          />
        </div>
      </div>
    </div>
  );
};
