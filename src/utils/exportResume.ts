import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, ImageRun } from 'docx';
import { saveAs } from 'file-saver';
import { ResumeData } from '@/types/resume';

const dataUrlToBuffer = async (dataUrl: string): Promise<ArrayBuffer> => {
  const response = await fetch(dataUrl);
  return response.arrayBuffer();
};

const urlToBuffer = async (url: string): Promise<ArrayBuffer> => {
  if (url.startsWith('data:')) return dataUrlToBuffer(url);
  const response = await fetch(url);
  return response.arrayBuffer();
};

export const exportToPDF = async () => {
  const element = document.getElementById('resume-preview');
  if (!element) return;

  // Store original styles
  const originalTransform = element.style.transform;
  const originalTransformOrigin = element.style.transformOrigin;
  const originalWidth = element.style.width;
  const originalMinHeight = element.style.minHeight;
  const originalHeight = element.style.height;
  const originalMaxHeight = element.style.maxHeight;
  const originalOverflow = element.style.overflow;

  // Reset transform for accurate capture - allow full content height
  element.style.transform = 'none';
  element.style.transformOrigin = 'top left';
  element.style.width = '210mm';
  element.style.minHeight = '297mm';
  element.style.height = 'auto';
  element.style.maxHeight = 'none';
  element.style.overflow = 'visible';

  // Wait for styles to apply
  await new Promise(resolve => setTimeout(resolve, 150));

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      scrollY: 0,
      scrollX: 0,
      width: element.offsetWidth,
      height: element.scrollHeight,
      windowWidth: element.offsetWidth,
      windowHeight: element.scrollHeight,
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidthMM = 210;
    const pageHeightMM = 297;
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Calculate how tall the image is in mm when scaled to page width
    const scaledHeightMM = (imgHeight * pageWidthMM) / imgWidth;

    if (scaledHeightMM <= pageHeightMM) {
      // Fits on one page - fill the page
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      pdf.addImage(imgData, 'JPEG', 0, 0, pageWidthMM, scaledHeightMM);
    } else {
      // Multi-page: slice the canvas into page-sized chunks
      const scaleFactor = imgWidth / pageWidthMM;
      const pageHeightPx = pageHeightMM * scaleFactor;
      const totalPages = Math.ceil(imgHeight / pageHeightPx);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();

        const srcY = page * pageHeightPx;
        const srcH = Math.min(pageHeightPx, imgHeight - srcY);
        const destH = (srcH / scaleFactor);

        // Create a canvas for this page slice
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = imgWidth;
        pageCanvas.height = srcH;
        const ctx = pageCanvas.getContext('2d');
        if (!ctx) continue;
        ctx.drawImage(canvas, 0, srcY, imgWidth, srcH, 0, 0, imgWidth, srcH);

        const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.98);
        pdf.addImage(pageImgData, 'JPEG', 0, 0, pageWidthMM, destH);
      }
    }

    pdf.save('resume.pdf');
  } finally {
    // Restore original styles
    element.style.transform = originalTransform;
    element.style.transformOrigin = originalTransformOrigin;
    element.style.width = originalWidth;
    element.style.height = originalHeight;
    element.style.minHeight = originalMinHeight;
    element.style.maxHeight = originalMaxHeight;
    element.style.overflow = originalOverflow;
  }
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const exportToWord = async (data: ResumeData) => {
  const { personalInfo, experiences, education, skills } = data;

  // Photo
  const photoChildren: Paragraph[] = [];
  if (personalInfo.photo) {
    try {
      const imageBuffer = await urlToBuffer(personalInfo.photo);
      photoChildren.push(
        new Paragraph({
          children: [
            new ImageRun({
              data: imageBuffer,
              transformation: { width: 100, height: 100 },
              type: 'jpg',
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        })
      );
    } catch {
      // Skip photo if it fails to load
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Photo
          ...photoChildren,

          // Name
          new Paragraph({
            children: [
              new TextRun({
                text: personalInfo.fullName || 'Your Name',
                bold: true,
                size: 48,
              }),
            ],
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
          }),
          
          // Title
          new Paragraph({
            children: [
              new TextRun({
                text: personalInfo.title || 'Professional Title',
                size: 28,
                color: '666666',
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),

          // Contact Info
          new Paragraph({
            children: [
              new TextRun({
                text: [
                  personalInfo.email,
                  personalInfo.phone,
                  personalInfo.location,
                ].filter(Boolean).join(' | '),
                size: 22,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          // Summary
          ...(personalInfo.summary ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'PROFESSIONAL SUMMARY',
                  bold: true,
                  size: 26,
                }),
              ],
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 300, after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: personalInfo.summary,
                  size: 22,
                }),
              ],
              spacing: { after: 300 },
            }),
          ] : []),

          // Experience
          ...(experiences.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'WORK EXPERIENCE',
                  bold: true,
                  size: 26,
                }),
              ],
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 300, after: 100 },
            }),
            ...experiences.flatMap((exp) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: exp.position,
                    bold: true,
                    size: 24,
                  }),
                  new TextRun({
                    text: ` at ${exp.company}`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${exp.location} | ${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}`,
                    size: 20,
                    color: '666666',
                  }),
                ],
                spacing: { after: 100 },
              }),
              ...(exp.description ? [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: exp.description,
                      size: 22,
                    }),
                  ],
                  spacing: { after: 200 },
                }),
              ] : []),
            ]),
          ] : []),

          // Education
          ...(education.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'EDUCATION',
                  bold: true,
                  size: 26,
                }),
              ],
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 300, after: 100 },
            }),
            ...education.flatMap((edu) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: edu.institution,
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${edu.degree} in ${edu.field}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}`,
                    size: 22,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`,
                    size: 20,
                    color: '666666',
                  }),
                ],
                spacing: { after: 200 },
              }),
            ]),
          ] : []),

          // Skills
          ...(skills.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'SKILLS',
                  bold: true,
                  size: 26,
                }),
              ],
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 300, after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: skills.map((s) => s.name).join(' • '),
                  size: 22,
                }),
              ],
            }),
          ] : []),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'resume.docx');
};
