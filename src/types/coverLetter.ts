export type CoverLetterProfession = 'it' | 'sales' | 'accountant' | 'marketing' | 'fresher';

export interface CoverLetterProfessionInfo {
  id: CoverLetterProfession;
  name: string;
  icon: string;
  description: string;
  focusAreas: string[];
}

export interface CoverLetterData {
  profession: CoverLetterProfession;
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  companyAddress: string;
  senderName: string;
  senderTitle: string;
  senderEmail: string;
  senderPhone: string;
  senderAddress: string;
  date: string;
  body: string;
  closing: string;
}
