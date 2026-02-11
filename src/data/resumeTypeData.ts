import { ResumeData, ResumeType } from '@/types/resume';
import defaultAvatar from '@/assets/default-avatar.jpg';
import maleAvatar from '@/assets/male-avatar.jpg';
import femaleAvatar from '@/assets/female-avatar.jpg';

const sectionOrder = ['experience', 'education', 'skills'];

const technicalData: ResumeData = {
  personalInfo: {
    fullName: 'Arjun Mehta',
    email: 'arjun.mehta@email.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    title: 'Senior Full Stack Developer',
    summary: 'Full Stack Developer with 6+ years of experience in building scalable web applications using React, Node.js, and AWS. Passionate about clean architecture, performance optimization, and mentoring teams.',
    linkedin: 'linkedin.com/in/arjunmehta',
    website: 'arjunmehta.dev',
    photo: maleAvatar,
  },
  experiences: [
    {
      id: '1', company: 'CloudNine Technologies', position: 'Senior Full Stack Developer',
      location: 'Bangalore, India', startDate: '2021-06', endDate: '', current: true,
      description: '• Architected microservices handling 5M+ daily requests using Node.js and Kubernetes\n• Reduced API response time by 40% using Redis caching and query optimization\n• Led migration from monolith to event-driven architecture using Kafka\n• Mentored 4 junior developers through code reviews and pair programming',
    },
    {
      id: '2', company: 'DataStream Inc.', position: 'Software Engineer',
      location: 'Hyderabad, India', startDate: '2018-01', endDate: '2021-05', current: false,
      description: '• Built real-time analytics dashboard with React and D3.js serving 500+ enterprise clients\n• Implemented CI/CD pipelines reducing deployment time by 75%\n• Developed RESTful APIs with Express.js and PostgreSQL',
    },
  ],
  education: [
    { id: '1', institution: 'IIT Bombay', degree: 'B.Tech', field: 'Computer Science', startDate: '2014-07', endDate: '2018-05', gpa: '8.5/10' },
  ],
  skills: [
    { id: '1', name: 'React / TypeScript', level: 'expert' },
    { id: '2', name: 'Node.js / Express', level: 'expert' },
    { id: '3', name: 'AWS / Docker / K8s', level: 'advanced' },
    { id: '4', name: 'PostgreSQL / Redis', level: 'advanced' },
    { id: '5', name: 'Python', level: 'intermediate' },
    { id: '6', name: 'System Design', level: 'advanced' },
  ],
  sectionOrder,
};

const salesData: ResumeData = {
  personalInfo: {
    fullName: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 99887 76655',
    location: 'Mumbai, India',
    title: 'Senior Sales Executive',
    summary: 'Results-driven Sales Executive with 7+ years of experience in B2B sales and business development. Consistently exceeded annual targets by 20-30%. Skilled in consultative selling, key account management, and building long-term client relationships.',
    linkedin: 'linkedin.com/in/priyasharma',
    photo: femaleAvatar,
  },
  experiences: [
    {
      id: '1', company: 'SalesForce India', position: 'Senior Sales Executive',
      location: 'Mumbai, India', startDate: '2020-04', endDate: '', current: true,
      description: '• Increased regional sales by 28% YoY, generating ₹15Cr in annual revenue\n• Managed portfolio of 50+ enterprise accounts with 95% retention rate\n• Closed largest deal in company history worth ₹2.5Cr\n• Trained and mentored team of 8 sales associates',
    },
    {
      id: '2', company: 'TechSolutions Pvt Ltd', position: 'Business Development Manager',
      location: 'Pune, India', startDate: '2017-01', endDate: '2020-03', current: false,
      description: '• Achieved 135% of annual sales target for 3 consecutive years\n• Acquired 200+ new clients through cold outreach and networking\n• Improved conversion rate from 12% to 22% through consultative selling approach',
    },
  ],
  education: [
    { id: '1', institution: 'Symbiosis International University', degree: 'MBA', field: 'Sales & Marketing', startDate: '2015-06', endDate: '2017-05', gpa: '' },
    { id: '2', institution: 'Mumbai University', degree: 'B.Com', field: 'Commerce', startDate: '2012-06', endDate: '2015-05', gpa: '' },
  ],
  skills: [
    { id: '1', name: 'B2B / Enterprise Sales', level: 'expert' },
    { id: '2', name: 'Key Account Management', level: 'expert' },
    { id: '3', name: 'Salesforce CRM', level: 'advanced' },
    { id: '4', name: 'Negotiation & Closing', level: 'expert' },
    { id: '5', name: 'Territory Planning', level: 'advanced' },
    { id: '6', name: 'Client Relationship Mgmt', level: 'advanced' },
  ],
  sectionOrder,
};

const marketingData: ResumeData = {
  personalInfo: {
    fullName: 'Sneha Kapoor',
    email: 'sneha.kapoor@email.com',
    phone: '+91 98765 11223',
    location: 'Delhi, India',
    title: 'Digital Marketing Manager',
    summary: 'Creative Digital Marketing Manager with 5+ years driving brand growth through data-driven campaigns. Expertise in SEO, SEM, social media strategy, and performance marketing. Delivered 3x ROI on ad spend across multiple channels.',
    linkedin: 'linkedin.com/in/snehakapoor',
    website: 'snehakapoor.com',
    photo: femaleAvatar,
  },
  experiences: [
    {
      id: '1', company: 'BrandGrowth Agency', position: 'Digital Marketing Manager',
      location: 'Delhi, India', startDate: '2021-01', endDate: '', current: true,
      description: '• Managed ₹50L+ monthly ad budget across Google Ads, Meta, and LinkedIn\n• Increased organic traffic by 180% through SEO strategy and content optimization\n• Achieved 4.2x ROAS on performance marketing campaigns\n• Grew social media following from 10K to 150K across platforms',
    },
    {
      id: '2', company: 'ClickMedia Solutions', position: 'SEO & Content Specialist',
      location: 'Gurugram, India', startDate: '2018-07', endDate: '2020-12', current: false,
      description: '• Improved website CTR by 45% through A/B testing and UX improvements\n• Created content strategy that generated 500+ leads monthly\n• Managed email marketing campaigns with 32% open rate',
    },
  ],
  education: [
    { id: '1', institution: 'MICA Ahmedabad', degree: 'PGDM', field: 'Digital Marketing & Communications', startDate: '2016-06', endDate: '2018-05', gpa: '' },
  ],
  skills: [
    { id: '1', name: 'Google Ads / Meta Ads', level: 'expert' },
    { id: '2', name: 'SEO / SEM', level: 'expert' },
    { id: '3', name: 'Google Analytics', level: 'advanced' },
    { id: '4', name: 'Content Strategy', level: 'advanced' },
    { id: '5', name: 'Social Media Marketing', level: 'expert' },
    { id: '6', name: 'HubSpot / Mailchimp', level: 'intermediate' },
  ],
  sectionOrder,
};

const financeData: ResumeData = {
  personalInfo: {
    fullName: 'Rahul Jain',
    email: 'rahul.jain@email.com',
    phone: '+91 98123 45678',
    location: 'Mumbai, India',
    title: 'Chartered Accountant & Financial Analyst',
    summary: 'Chartered Accountant with 6+ years of experience in financial reporting, tax compliance, and audit management. Expert in GST, Income Tax, and IFRS. Proficient in SAP FICO and Tally ERP for streamlined financial operations.',
    linkedin: 'linkedin.com/in/rahuljain',
    photo: maleAvatar,
  },
  experiences: [
    {
      id: '1', company: 'Deloitte India', position: 'Senior Financial Analyst',
      location: 'Mumbai, India', startDate: '2020-08', endDate: '', current: true,
      description: '• Managed financial reporting for 12 clients with combined revenue of ₹500Cr+\n• Reduced tax liability by 18% through strategic tax planning and GST optimization\n• Led quarterly audit processes ensuring 100% compliance with IFRS standards\n• Automated monthly MIS reports saving 40 man-hours per month using SAP',
    },
    {
      id: '2', company: 'KPMG India', position: 'Audit Associate',
      location: 'Pune, India', startDate: '2017-07', endDate: '2020-07', current: false,
      description: '• Conducted statutory audits for 20+ SMEs and listed companies\n• Identified and resolved discrepancies worth ₹2Cr+ in financial statements\n• Prepared budget forecasts with 97% accuracy for client organizations',
    },
  ],
  education: [
    { id: '1', institution: 'ICAI', degree: 'Chartered Accountant (CA)', field: 'Accounting & Finance', startDate: '2014-06', endDate: '2017-06', gpa: '' },
    { id: '2', institution: 'Delhi University', degree: 'B.Com (Hons)', field: 'Commerce', startDate: '2011-07', endDate: '2014-05', gpa: '' },
  ],
  skills: [
    { id: '1', name: 'Financial Reporting / IFRS', level: 'expert' },
    { id: '2', name: 'GST / Income Tax', level: 'expert' },
    { id: '3', name: 'SAP FICO', level: 'advanced' },
    { id: '4', name: 'Tally ERP 9', level: 'expert' },
    { id: '5', name: 'Budget Forecasting', level: 'advanced' },
    { id: '6', name: 'Risk Assessment', level: 'intermediate' },
  ],
  sectionOrder,
};

const fresherData: ResumeData = {
  personalInfo: {
    fullName: 'Ananya Singh',
    email: 'ananya.singh@email.com',
    phone: '+91 87654 32109',
    location: 'Chennai, India',
    title: 'B.Tech Graduate — Computer Science',
    summary: 'Motivated B.Tech graduate in Computer Science with strong academic record and hands-on project experience. Proficient in Java, Python, and web development. Eager to apply theoretical knowledge and fresh perspectives in a dynamic work environment.',
    linkedin: 'linkedin.com/in/ananyasingh',
    photo: femaleAvatar,
  },
  experiences: [
    {
      id: '1', company: 'Infosys', position: 'Software Intern',
      location: 'Mysuru, India', startDate: '2023-01', endDate: '2023-06', current: false,
      description: '• Developed a student management module using Java Spring Boot\n• Created REST APIs consumed by 3 frontend teams\n• Wrote unit tests achieving 85% code coverage',
    },
  ],
  education: [
    { id: '1', institution: 'Anna University', degree: 'B.Tech', field: 'Computer Science & Engineering', startDate: '2019-08', endDate: '2023-05', gpa: '8.7/10' },
    { id: '2', institution: 'DAV Public School', degree: 'Higher Secondary (XII)', field: 'Science (PCM)', startDate: '2017-04', endDate: '2019-03', gpa: '92%' },
  ],
  skills: [
    { id: '1', name: 'Java / Spring Boot', level: 'intermediate' },
    { id: '2', name: 'Python', level: 'intermediate' },
    { id: '3', name: 'HTML / CSS / JavaScript', level: 'intermediate' },
    { id: '4', name: 'MySQL', level: 'beginner' },
    { id: '5', name: 'Git / GitHub', level: 'intermediate' },
    { id: '6', name: 'Data Structures & Algos', level: 'intermediate' },
  ],
  sectionOrder: ['education', 'experience', 'skills'],
};

const hrData: ResumeData = {
  personalInfo: {
    fullName: 'Kavita Reddy',
    email: 'kavita.reddy@email.com',
    phone: '+91 99001 22334',
    location: 'Hyderabad, India',
    title: 'Senior HR Business Partner',
    summary: 'HR professional with 8+ years of experience in talent acquisition, employee engagement, and organizational development. Reduced attrition by 25% through data-driven retention strategies. Skilled in HR analytics, policy design, and performance management systems.',
    linkedin: 'linkedin.com/in/kavitareddy',
    photo: femaleAvatar,
  },
  experiences: [
    {
      id: '1', company: 'Wipro Technologies', position: 'Senior HR Business Partner',
      location: 'Hyderabad, India', startDate: '2020-03', endDate: '', current: true,
      description: '• Managed end-to-end HR operations for a business unit of 2,000+ employees\n• Reduced employee attrition from 22% to 14% through engagement initiatives\n• Designed and implemented competency-based performance management system\n• Led campus hiring program recruiting 150+ graduates annually',
    },
    {
      id: '2', company: 'Tech Mahindra', position: 'HR Executive',
      location: 'Pune, India', startDate: '2016-07', endDate: '2020-02', current: false,
      description: '• Handled talent acquisition for IT division, filling 200+ positions annually\n• Implemented employee wellness program improving satisfaction scores by 30%\n• Drafted and rolled out 15+ HR policies aligned with labor law compliance',
    },
  ],
  education: [
    { id: '1', institution: 'XLRI Jamshedpur', degree: 'MBA', field: 'Human Resource Management', startDate: '2014-06', endDate: '2016-05', gpa: '' },
  ],
  skills: [
    { id: '1', name: 'Talent Acquisition', level: 'expert' },
    { id: '2', name: 'Employee Engagement', level: 'expert' },
    { id: '3', name: 'HR Analytics', level: 'advanced' },
    { id: '4', name: 'Policy Design', level: 'advanced' },
    { id: '5', name: 'SAP SuccessFactors', level: 'intermediate' },
    { id: '6', name: 'Labor Law Compliance', level: 'advanced' },
  ],
  sectionOrder,
};

const operationsData: ResumeData = {
  personalInfo: {
    fullName: 'Vikram Patel',
    email: 'vikram.patel@email.com',
    phone: '+91 98234 56789',
    location: 'Ahmedabad, India',
    title: 'Operations Manager',
    summary: 'Operations Manager with 9+ years of experience in process optimization, supply chain management, and cost reduction. Achieved 30% improvement in operational efficiency through lean methodologies and vendor management strategies.',
    linkedin: 'linkedin.com/in/vikrampatel',
    photo: maleAvatar,
  },
  experiences: [
    {
      id: '1', company: 'Reliance Industries', position: 'Operations Manager',
      location: 'Ahmedabad, India', startDate: '2019-01', endDate: '', current: true,
      description: '• Managed end-to-end operations for manufacturing unit with 500+ workforce\n• Reduced operational costs by 22% through lean manufacturing and process re-engineering\n• Improved supply chain efficiency by 35% through vendor consolidation\n• Implemented quality management system achieving ISO 9001:2015 certification',
    },
    {
      id: '2', company: 'Tata Motors', position: 'Assistant Operations Manager',
      location: 'Pune, India', startDate: '2015-06', endDate: '2018-12', current: false,
      description: '• Supervised production line with daily output of 200+ units\n• Reduced defect rate from 3.5% to 0.8% using Six Sigma methodology\n• Managed inventory worth ₹50Cr+ with 99.2% accuracy',
    },
  ],
  education: [
    { id: '1', institution: 'IIM Lucknow', degree: 'MBA', field: 'Operations Management', startDate: '2013-06', endDate: '2015-05', gpa: '' },
    { id: '2', institution: 'NIT Surat', degree: 'B.Tech', field: 'Mechanical Engineering', startDate: '2009-07', endDate: '2013-05', gpa: '' },
  ],
  skills: [
    { id: '1', name: 'Lean / Six Sigma', level: 'expert' },
    { id: '2', name: 'Supply Chain Mgmt', level: 'expert' },
    { id: '3', name: 'Vendor Management', level: 'advanced' },
    { id: '4', name: 'SAP MM / PP', level: 'advanced' },
    { id: '5', name: 'Quality Management', level: 'advanced' },
    { id: '6', name: 'Cost Optimization', level: 'expert' },
  ],
  sectionOrder,
};

const managementData: ResumeData = {
  personalInfo: {
    fullName: 'Deepak Gupta',
    email: 'deepak.gupta@email.com',
    phone: '+91 98765 00112',
    location: 'Bangalore, India',
    title: 'Director of Product & Engineering',
    summary: 'Strategic leader with 12+ years of experience driving product strategy, engineering excellence, and cross-functional team management. Delivered products impacting 10M+ users. Skilled in stakeholder management, agile transformation, and P&L ownership.',
    linkedin: 'linkedin.com/in/deepakgupta',
    photo: maleAvatar,
  },
  experiences: [
    {
      id: '1', company: 'Flipkart', position: 'Director of Product & Engineering',
      location: 'Bangalore, India', startDate: '2020-01', endDate: '', current: true,
      description: '• Led product and engineering org of 60+ across 5 teams\n• Launched loyalty program generating ₹200Cr+ incremental revenue\n• Improved delivery SLA from 85% to 97% through cross-functional initiatives\n• Managed annual budget of ₹30Cr and quarterly OKR planning',
    },
    {
      id: '2', company: 'Amazon India', position: 'Senior Product Manager',
      location: 'Hyderabad, India', startDate: '2015-08', endDate: '2019-12', current: false,
      description: '• Owned product roadmap for marketplace seller tools used by 500K+ sellers\n• Increased seller onboarding rate by 40% through UX redesign\n• Led agile transformation for 3 engineering teams (30+ engineers)',
    },
  ],
  education: [
    { id: '1', institution: 'IIM Ahmedabad', degree: 'MBA', field: 'Strategy & Operations', startDate: '2013-06', endDate: '2015-05', gpa: '' },
    { id: '2', institution: 'BITS Pilani', degree: 'B.E.', field: 'Computer Science', startDate: '2009-08', endDate: '2013-05', gpa: '' },
  ],
  skills: [
    { id: '1', name: 'Product Strategy', level: 'expert' },
    { id: '2', name: 'Team Leadership (60+)', level: 'expert' },
    { id: '3', name: 'Agile / Scrum / SAFe', level: 'expert' },
    { id: '4', name: 'Stakeholder Mgmt', level: 'expert' },
    { id: '5', name: 'P&L Ownership', level: 'advanced' },
    { id: '6', name: 'Data-Driven Decisions', level: 'advanced' },
  ],
  sectionOrder,
};

const healthcareData: ResumeData = {
  personalInfo: {
    fullName: 'Dr. Meera Nair',
    email: 'meera.nair@email.com',
    phone: '+91 99887 11223',
    location: 'Kochi, India',
    title: 'Senior Physician — Internal Medicine',
    summary: 'Experienced physician with 10+ years in internal medicine, patient care, and clinical research. Published 8 research papers in peer-reviewed journals. Committed to evidence-based practice and compassionate patient care with expertise in chronic disease management.',
    linkedin: 'linkedin.com/in/drmeera',
    photo: femaleAvatar,
  },
  experiences: [
    {
      id: '1', company: 'Apollo Hospitals', position: 'Senior Consultant — Internal Medicine',
      location: 'Kochi, India', startDate: '2019-04', endDate: '', current: true,
      description: '• Managing 30+ patients daily with complex multi-system disorders\n• Led COVID-19 response team treating 2,000+ patients during pandemic\n• Implemented telemedicine program increasing patient reach by 60%\n• Mentoring 5 resident doctors in clinical rotations',
    },
    {
      id: '2', company: 'AIIMS Delhi', position: 'Resident Doctor',
      location: 'New Delhi, India', startDate: '2014-07', endDate: '2019-03', current: false,
      description: '• Completed 5-year residency in Internal Medicine\n• Published 8 research papers in peer-reviewed national and international journals\n• Managed ICU with 20-bed capacity handling critical care patients',
    },
  ],
  education: [
    { id: '1', institution: 'AIIMS Delhi', degree: 'MD', field: 'Internal Medicine', startDate: '2014-07', endDate: '2019-03', gpa: '' },
    { id: '2', institution: 'Government Medical College, Trivandrum', degree: 'MBBS', field: 'Medicine', startDate: '2008-08', endDate: '2014-06', gpa: '' },
  ],
  skills: [
    { id: '1', name: 'Internal Medicine', level: 'expert' },
    { id: '2', name: 'Critical Care / ICU', level: 'advanced' },
    { id: '3', name: 'Clinical Research', level: 'advanced' },
    { id: '4', name: 'Telemedicine', level: 'intermediate' },
    { id: '5', name: 'Patient Counseling', level: 'expert' },
    { id: '6', name: 'Chronic Disease Mgmt', level: 'expert' },
  ],
  sectionOrder,
};

const creativeData: ResumeData = {
  personalInfo: {
    fullName: 'Nisha Verma',
    email: 'nisha.verma@email.com',
    phone: '+91 99001 55667',
    location: 'Mumbai, India',
    title: 'Senior UI/UX Designer',
    summary: 'Creative UI/UX Designer with 6+ years crafting delightful digital experiences. Portfolio includes 50+ shipped products across web and mobile. Expert in design systems, user research, and prototyping. Passionate about accessibility and human-centered design.',
    linkedin: 'linkedin.com/in/nishaverma',
    website: 'nishaverma.design',
    photo: femaleAvatar,
  },
  experiences: [
    {
      id: '1', company: 'Razorpay', position: 'Senior UI/UX Designer',
      location: 'Bangalore, India', startDate: '2021-02', endDate: '', current: true,
      description: '• Designed and maintained design system used across 15+ products\n• Improved checkout conversion rate by 18% through UX optimization\n• Led user research sessions with 200+ participants for product discovery\n• Created motion design language increasing user engagement by 25%',
    },
    {
      id: '2', company: 'Zomato', position: 'UI Designer',
      location: 'Gurugram, India', startDate: '2018-03', endDate: '2021-01', current: false,
      description: '• Redesigned restaurant listing page improving time-on-page by 35%\n• Created 100+ illustrations and icons for the brand design library\n• Collaborated with 4 product teams on mobile-first responsive designs',
    },
  ],
  education: [
    { id: '1', institution: 'NID Ahmedabad', degree: 'M.Des', field: 'Interaction Design', startDate: '2016-07', endDate: '2018-05', gpa: '' },
    { id: '2', institution: 'Sir JJ School of Art', degree: 'BFA', field: 'Applied Arts', startDate: '2012-07', endDate: '2016-05', gpa: '' },
  ],
  skills: [
    { id: '1', name: 'Figma / Sketch', level: 'expert' },
    { id: '2', name: 'Adobe Creative Suite', level: 'expert' },
    { id: '3', name: 'Prototyping / Framer', level: 'advanced' },
    { id: '4', name: 'User Research', level: 'advanced' },
    { id: '5', name: 'Design Systems', level: 'expert' },
    { id: '6', name: 'Motion Design', level: 'intermediate' },
  ],
  sectionOrder,
};

const governmentData: ResumeData = {
  personalInfo: {
    fullName: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 94567 89012',
    location: 'New Delhi, India',
    title: 'Administrative Officer — Government Services',
    summary: 'Dedicated administrative officer with 10+ years in public sector management. Experienced in policy implementation, public grievance redressal, and e-governance initiatives. Cleared UPSC Civil Services Examination and served in multiple government departments.',
    linkedin: 'linkedin.com/in/rajeshkumar',
    photo: maleAvatar,
  },
  experiences: [
    {
      id: '1', company: 'Ministry of Rural Development', position: 'Under Secretary',
      location: 'New Delhi, India', startDate: '2019-06', endDate: '', current: true,
      description: '• Overseeing implementation of MGNREGA scheme across 5 states\n• Managed budget allocation of ₹5,000Cr+ for rural development programs\n• Drafted 3 policy amendments adopted at the national level\n• Led digital transformation of grievance redressal system, reducing resolution time by 50%',
    },
    {
      id: '2', company: 'District Administration — Lucknow', position: 'Sub-Divisional Magistrate',
      location: 'Lucknow, India', startDate: '2014-08', endDate: '2019-05', current: false,
      description: '• Administered sub-division with 500K+ population\n• Supervised revenue collection achieving 98% target realization\n• Coordinated disaster relief operations during floods affecting 50K+ families',
    },
  ],
  education: [
    { id: '1', institution: 'LBSNAA, Mussoorie', degree: 'IAS Training', field: 'Public Administration', startDate: '2013-09', endDate: '2014-07', gpa: '' },
    { id: '2', institution: 'Jawaharlal Nehru University', degree: 'M.A.', field: 'Political Science', startDate: '2010-07', endDate: '2012-05', gpa: '' },
  ],
  skills: [
    { id: '1', name: 'Policy Implementation', level: 'expert' },
    { id: '2', name: 'Public Administration', level: 'expert' },
    { id: '3', name: 'Budget Management', level: 'advanced' },
    { id: '4', name: 'E-Governance', level: 'advanced' },
    { id: '5', name: 'Stakeholder Coordination', level: 'expert' },
    { id: '6', name: 'Disaster Management', level: 'intermediate' },
  ],
  sectionOrder,
};

export const resumeTypeDataMap: Partial<Record<ResumeType, ResumeData>> = {
  technical: technicalData,
  sales: salesData,
  marketing: marketingData,
  finance: financeData,
  fresher: fresherData,
  hr: hrData,
  operations: operationsData,
  management: managementData,
  healthcare: healthcareData,
  creative: creativeData,
  government: governmentData,
};
