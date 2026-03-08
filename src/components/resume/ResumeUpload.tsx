import React, { useRef, useState } from 'react';
import { Upload, FileText, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useResume } from '@/contexts/ResumeContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const EXTRACT_PDF_URL = 'https://trocr-api-51797395525.us-central1.run.app/extract-text-from-pdf';
const EXTRACT_DOCX_URL = 'https://trocr-api-51797395525.us-central1.run.app/extract-text-from-docx';
const AI_CHAT_URL = 'https://back-end.scriptimiz.com/api/chat';

const PARSE_SYSTEM_PROMPT = `You are a resume parser. Given resume text, extract and return ONLY valid JSON matching this exact structure (no markdown, no explanation):
{
  "personalInfo": {
    "fullName": "",
    "email": "",
    "phone": "",
    "location": "",
    "title": "",
    "summary": "",
    "linkedin": "",
    "website": ""
  },
  "experiences": [
    {
      "company": "",
      "position": "",
      "location": "",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "current": false,
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "gpa": ""
    }
  ],
  "skills": [
    { "name": "", "level": "intermediate" }
  ]
}
Fill in as much as possible from the resume text. Use "YYYY-MM" date format. For skill levels use: beginner, intermediate, advanced, or expert. If a field is not found, leave it as empty string. Return ONLY the JSON object.`;

export const ResumeUpload: React.FC = () => {
  const { setResumeData } = useResume();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const processFile = async (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'pdf' && ext !== 'docx') {
      toast.error('Please upload a PDF or DOCX file.');
      return;
    }

    setIsProcessing(true);
    setFileName(file.name);

    try {
      // Step 1: Extract text
      const formData = new FormData();
      formData.append('file', file);

      const extractUrl = ext === 'pdf' ? EXTRACT_PDF_URL : EXTRACT_DOCX_URL;
      const extractRes = await fetch(extractUrl, {
        method: 'POST',
        body: formData,
      });

      if (!extractRes.ok) {
        throw new Error('Failed to extract text from file.');
      }

      const extractData = await extractRes.json();
      const resumeText = extractData.text || extractData.content || JSON.stringify(extractData);

      if (!resumeText || resumeText.trim().length < 20) {
        throw new Error('Could not extract meaningful text from the file.');
      }

      // Step 2: AI parse to JSON
      const aiRes = await fetch(AI_CHAT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Parse this resume text into JSON:\n\n${resumeText}`,
          systemPrompt: PARSE_SYSTEM_PROMPT,
        }),
      });

      if (!aiRes.ok) {
        throw new Error('AI service unavailable.');
      }

      const aiData = await aiRes.json();
      const aiText = aiData.answer || aiData.response || aiData.data || '';

      // Extract JSON from response (handle markdown code blocks)
      let jsonStr = aiText;
      const jsonMatch = aiText.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1];
      }
      // Find first { to last } to isolate JSON object
      const firstBrace = jsonStr.indexOf('{');
      const lastBrace = jsonStr.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        jsonStr = jsonStr.slice(firstBrace, lastBrace + 1);
      }
      // Clean common AI JSON issues: trailing commas, single quotes
      jsonStr = jsonStr
        .replace(/,\s*([}\]])/g, '$1')        // trailing commas
        .replace(/(['"])?(\w+)(['"])?\s*:/g, '"$2":') // unquoted keys
        .replace(/:\s*'([^']*)'/g, ': "$1"');  // single-quoted values

      let parsed: any;
      try {
        parsed = JSON.parse(jsonStr.trim());
      } catch {
        throw new Error('AI returned invalid format. Please try again.');
      }

      // Step 3: Populate resume data with IDs
      const resumeData = {
        personalInfo: {
          fullName: parsed.personalInfo?.fullName || '',
          email: parsed.personalInfo?.email || '',
          phone: parsed.personalInfo?.phone || '',
          location: parsed.personalInfo?.location || '',
          title: parsed.personalInfo?.title || '',
          summary: parsed.personalInfo?.summary || '',
          linkedin: parsed.personalInfo?.linkedin || '',
          website: parsed.personalInfo?.website || '',
          photo: '',
        },
        experiences: (parsed.experiences || []).map((exp: any, i: number) => ({
          id: `upload-exp-${Date.now()}-${i}`,
          company: exp.company || '',
          position: exp.position || '',
          location: exp.location || '',
          startDate: exp.startDate || '',
          endDate: exp.endDate || '',
          current: exp.current || false,
          description: exp.description || '',
        })),
        education: (parsed.education || []).map((edu: any, i: number) => ({
          id: `upload-edu-${Date.now()}-${i}`,
          institution: edu.institution || '',
          degree: edu.degree || '',
          field: edu.field || '',
          startDate: edu.startDate || '',
          endDate: edu.endDate || '',
          gpa: edu.gpa || '',
        })),
        skills: (parsed.skills || []).map((skill: any, i: number) => ({
          id: `upload-skill-${Date.now()}-${i}`,
          name: skill.name || '',
          level: skill.level || 'intermediate',
        })),
        sectionOrder: ['personal', 'experience', 'education', 'skills'],
      };

      setResumeData(resumeData);
      toast.success('Resume imported successfully! Review and edit the fields.');
    } catch (error) {
      console.error('Resume upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process resume.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={cn(
        'relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200',
        dragOver
          ? 'border-primary bg-primary/5'
          : 'border-muted-foreground/25 hover:border-primary/50',
        isProcessing && 'pointer-events-none opacity-70'
      )}
    >
      {isProcessing ? (
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Processing {fileName}...</p>
            <p className="text-xs text-muted-foreground mt-1">Extracting text & parsing with AI</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Upload your existing resume</p>
            <p className="text-xs text-muted-foreground mt-1">PDF or DOCX • Drag & drop or click to browse</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="gap-2"
          >
            <FileText className="w-4 h-4" />
            Choose File
          </Button>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
