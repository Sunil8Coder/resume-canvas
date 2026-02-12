import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { CoverLetterData } from '@/types/coverLetter';

export const exportCoverLetterToPDF = async () => {
  const element = document.getElementById('cover-letter-preview');
  if (!element) return;

  const originalTransform = element.style.transform;
  const originalWidth = element.style.width;
  const originalMinHeight = element.style.minHeight;
  const originalHeight = element.style.height;
  const originalMaxHeight = element.style.maxHeight;
  const originalOverflow = element.style.overflow;

  element.style.transform = 'none';
  element.style.width = '210mm';
  element.style.minHeight = '297mm';
  element.style.height = 'auto';
  element.style.maxHeight = 'none';
  element.style.overflow = 'visible';

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

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidthMM = 210;
    const pageHeightMM = 297;
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const scaledHeightMM = (imgHeight * pageWidthMM) / imgWidth;

    if (scaledHeightMM <= pageHeightMM + 3) {
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      pdf.addImage(imgData, 'JPEG', 0, 0, pageWidthMM, Math.min(scaledHeightMM, pageHeightMM));
    } else {
      const scaleFactor = imgWidth / pageWidthMM;
      const pageHeightPx = pageHeightMM * scaleFactor;
      const totalPages = Math.ceil(imgHeight / pageHeightPx);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();
        const srcY = page * pageHeightPx;
        const srcH = Math.min(pageHeightPx, imgHeight - srcY);
        const destH = srcH / scaleFactor;
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

    pdf.save('cover-letter.pdf');
  } finally {
    element.style.transform = originalTransform;
    element.style.width = originalWidth;
    element.style.height = originalHeight;
    element.style.minHeight = originalMinHeight;
    element.style.maxHeight = originalMaxHeight;
    element.style.overflow = originalOverflow;
  }
};

export const exportCoverLetterToWord = async (data: CoverLetterData) => {
  const lines = data.body.split('\n').filter(line => line.trim() !== '');

  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Sender info
        new Paragraph({
          children: [new TextRun({ text: data.senderName, bold: true, size: 28 })],
          alignment: AlignmentType.LEFT,
        }),
        new Paragraph({
          children: [new TextRun({ text: data.senderTitle, size: 22, color: '555555' })],
          spacing: { after: 50 },
        }),
        new Paragraph({
          children: [new TextRun({ text: `${data.senderEmail} | ${data.senderPhone}`, size: 20, color: '666666' })],
        }),
        new Paragraph({
          children: [new TextRun({ text: data.senderAddress, size: 20, color: '666666' })],
          spacing: { after: 300 },
        }),
        // Date
        new Paragraph({
          children: [new TextRun({ text: data.date, size: 22 })],
          spacing: { after: 200 },
        }),
        // Recipient
        new Paragraph({
          children: [new TextRun({ text: data.recipientName, bold: true, size: 22 })],
        }),
        new Paragraph({
          children: [new TextRun({ text: data.recipientTitle, size: 22 })],
        }),
        new Paragraph({
          children: [new TextRun({ text: data.companyName, size: 22 })],
        }),
        new Paragraph({
          children: [new TextRun({ text: data.companyAddress, size: 22 })],
          spacing: { after: 300 },
        }),
        // Body
        ...lines.map(line => new Paragraph({
          children: [new TextRun({ text: line, size: 22 })],
          spacing: { after: 150 },
        })),
        // Closing
        new Paragraph({
          children: [new TextRun({ text: data.closing + ',', size: 22 })],
          spacing: { before: 300 },
        }),
        new Paragraph({
          children: [new TextRun({ text: data.senderName, bold: true, size: 22 })],
          spacing: { before: 200 },
        }),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'cover-letter.docx');
};
