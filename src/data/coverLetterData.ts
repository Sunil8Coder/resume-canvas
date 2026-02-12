import { CoverLetterProfession, CoverLetterProfessionInfo, CoverLetterData } from '@/types/coverLetter';

export const coverLetterProfessions: CoverLetterProfessionInfo[] = [
  {
    id: 'it',
    name: 'IT / Software Developer',
    icon: '💻',
    description: 'Technical, project-focused, result-oriented',
    focusAreas: ['Technical skills', 'Projects', 'Problem-solving', 'Technologies used', 'Business impact'],
  },
  {
    id: 'sales',
    name: 'Sales',
    icon: '📈',
    description: 'Numbers-driven, client-focused, persuasive',
    focusAreas: ['Targets achieved', 'Revenue generated', 'Communication skills', 'Client handling'],
  },
  {
    id: 'accountant',
    name: 'Accountant',
    icon: '📊',
    description: 'Accuracy-focused, compliance-driven, trustworthy',
    focusAreas: ['Accuracy', 'Financial compliance', 'Audits', 'Taxation knowledge'],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: '🎯',
    description: 'Creative, analytics-driven, growth-focused',
    focusAreas: ['Campaigns', 'Growth metrics', 'Social media impact', 'Branding strategy'],
  },
  {
    id: 'fresher',
    name: 'Fresher / Entry Level',
    icon: '🎓',
    description: 'Potential-focused, eager to learn, academically strong',
    focusAreas: ['Internships', 'Academic projects', 'Passion to learn', 'Soft skills'],
  },
];

const defaultCoverLetter: Omit<CoverLetterData, 'profession' | 'body'> = {
  recipientName: 'Hiring Manager',
  recipientTitle: 'HR Department',
  companyName: '[Company Name]',
  companyAddress: '[Company Address]',
  senderName: '[Your Name]',
  senderTitle: '[Your Title]',
  senderEmail: '[your.email@example.com]',
  senderPhone: '[Your Phone]',
  senderAddress: '[Your Address]',
  date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  closing: 'Sincerely',
};

export const coverLetterTemplates: Record<CoverLetterProfession, CoverLetterData> = {
  it: {
    ...defaultCoverLetter,
    profession: 'it',
    body: `Dear Hiring Manager,

I am writing to express my strong interest in the Software Developer position at [Company Name]. With a solid background in full-stack development and a passion for building scalable solutions, I am confident in my ability to contribute to your engineering team.

In my current role, I have successfully built scalable REST APIs using Spring Boot and microservices architecture, serving over 100,000 daily active users. I improved application performance by 30% through database query optimization and implementing Redis caching strategies. Additionally, I led the migration of a monolithic application to a cloud-native architecture on AWS, reducing deployment time by 60%.

I am proficient in Java, Python, JavaScript/TypeScript, React, Node.js, and cloud platforms (AWS, GCP). My experience with CI/CD pipelines, containerization with Docker, and agile methodologies has enabled me to deliver high-quality software consistently.

I am excited about the opportunity to bring my technical expertise and problem-solving skills to [Company Name]. I would welcome the chance to discuss how my experience aligns with your team's goals.

Thank you for considering my application. I look forward to hearing from you.`,
  },
  sales: {
    ...defaultCoverLetter,
    profession: 'sales',
    body: `Dear Hiring Manager,

I am thrilled to apply for the Sales Executive position at [Company Name]. With a proven track record of exceeding sales targets and building lasting client relationships, I am eager to contribute to your revenue growth.

In my previous role, I consistently exceeded quarterly sales targets by 120%, generating over $2.5M in annual revenue. I managed a portfolio of 50+ enterprise clients, maintaining a 95% client retention rate. By implementing a consultative selling approach, I increased the average deal size by 25% within six months.

My key strengths include strategic prospecting and pipeline management, negotiation and closing complex B2B deals, CRM expertise (Salesforce, HubSpot), and cross-functional collaboration with marketing and product teams.

I am passionate about understanding customer needs and delivering solutions that drive mutual success. I believe my results-driven approach and strong communication skills make me an ideal fit for [Company Name]'s sales team.

I would love the opportunity to discuss how I can help accelerate your company's growth. Thank you for your time and consideration.`,
  },
  accountant: {
    ...defaultCoverLetter,
    profession: 'accountant',
    body: `Dear Hiring Manager,

I am writing to apply for the Accountant position at [Company Name]. With extensive experience in financial reporting, tax compliance, and audit management, I bring a meticulous and reliable approach to financial management.

In my current role, I handle end-to-end GST filing and tax compliance for a portfolio of 30+ clients, ensuring 100% accuracy and timely submissions. I reduced financial discrepancies by 15% through implementing robust reconciliation processes and internal controls. I also managed external audits with zero material findings for three consecutive years.

My expertise includes financial statement preparation (GAAP/IFRS), advanced Excel and ERP systems (SAP, Tally, QuickBooks), tax planning and regulatory compliance, and budgeting and variance analysis.

I take pride in maintaining the highest standards of accuracy and integrity in all financial matters. I am confident that my analytical skills and attention to detail will be valuable to [Company Name]'s finance team.

I look forward to the opportunity to discuss how my qualifications align with your requirements. Thank you for considering my application.`,
  },
  marketing: {
    ...defaultCoverLetter,
    profession: 'marketing',
    body: `Dear Hiring Manager,

I am excited to apply for the Marketing Manager position at [Company Name]. With a strong blend of creative thinking and data-driven strategy, I have consistently delivered campaigns that drive brand growth and measurable ROI.

In my recent role, I grew Instagram engagement by 200% and increased followers from 10K to 50K within 8 months through a targeted content strategy. I reduced cost-per-click (CPC) by 35% on Google Ads while increasing conversion rates by 20%. I also led a product launch campaign that generated $500K in revenue within the first quarter.

My skill set spans digital marketing (SEO, SEM, Social Media, Email), marketing analytics (Google Analytics, Mixpanel, Tableau), content strategy and brand positioning, and A/B testing and conversion optimization.

I am passionate about creating compelling brand narratives that resonate with audiences and drive business results. I am confident that my creative approach combined with analytical rigor would make a meaningful impact at [Company Name].

I would be delighted to discuss how my marketing expertise can contribute to your team's success. Thank you for your consideration.`,
  },
  fresher: {
    ...defaultCoverLetter,
    profession: 'fresher',
    body: `Dear Hiring Manager,

I am writing to express my keen interest in the [Position] role at [Company Name]. As a recent graduate with a degree in [Your Degree] from [Your University], I am eager to launch my professional career and contribute my enthusiasm and fresh perspective to your team.

During my academic journey, I completed a 3-month internship at [Company Name] where I gained hands-on experience in [relevant area]. I led a capstone project on [project topic] that was recognized as the best project in my department. I also actively participated in coding competitions, hackathons, and technical workshops to continually build my skills.

While I may be early in my career, I bring strong analytical and problem-solving abilities, excellent communication and teamwork skills, proficiency in [relevant tools/technologies], and a genuine passion for learning and professional growth.

I am a quick learner with a strong work ethic, and I am excited about the opportunity to grow within [Company Name]. I believe my academic foundation, combined with my eagerness to learn, makes me a strong candidate for this role.

Thank you for considering my application. I would welcome the chance to discuss how I can contribute to your team.`,
  },
};
