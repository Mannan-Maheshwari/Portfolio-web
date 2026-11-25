import { projects } from './projects';
import innovateCertificate from '../assets/Jaypee_cirtificate (1).jpg';
import industrySolveCertificate from '../assets/IIITD_Cirtificate.jpg';

export const profile = {
  name: 'Mannan Maheshwari',
  role: 'Backend Software Engineer',
  focus: 'Applied AI integration',
  location: 'Delhi/NCR',
  email: 'mannanmaheshwari17@gmail.com',
  resumePath: '/resume/Mannan_Maheshwari_Resume.pdf',
  heroStatement: 'Building backend systems and integrating AI into practical products.',
  aboutIntro: "I'm a third-year Information Technology student at Bharati Vidyapeeth's College of Engineering (GGSIPU), working toward backend software engineering with applied AI integration. I like taking an idea beyond the interface: shaping the APIs, data flow, and practical features that help an application do its job.",
  aboutDetails: [
    'My projects range from AI-assisted interview preparation to an IoT water-purification system and tools for automating outreach.',
    'I am continuing to strengthen my foundations while exploring how LLMs and agents can fit into useful, dependable software.',
  ],
  missionQuote: 'Build infrastructure around LLMs and agents that works inside real systems.',
  pitch: [
    'I build backend systems and APIs for practical products.',
    'I integrate LLM capabilities into applications using real services and data.',
    'I care about maintainable implementation, validation, and useful user outcomes.',
  ],
  education: {
    degree: 'B.Tech, Information Technology',
    institution: "Bharati Vidyapeeth's College of Engineering (GGSIPU)",
    location: 'New Delhi',
    years: '2024–2028',
    cgpa: '8.7',
  },
  availability: '',
};
export const journey = [];

export const links = {
  github: 'https://github.com/Mannan-Maheshwari',
  linkedin: 'https://www.linkedin.com/in/mannan-maheshwari-70a29b311',
  leetcode: 'https://leetcode.com/u/Mannan_M',
  researchGate: 'https://www.researchgate.net/profile/Mannan-Maheshwari',
  email: `mailto:${profile.email}`,
};

export const skills = [
  {
    group: 'Strong',
    description: 'Daily use',
    items: ['JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'SQL', 'DBMS', 'JWT auth', 'C++ (DSA)'],
  },
  {
    group: 'Working',
    description: 'Used in projects',
    items: [
      'REST API design',
      'OOP',
      'Error handling',
      'File uploads',
      'Cloudinary',
      'Cookies and sessions',
      'React',
      'Git/GitHub',
      'Deployment',
      'Gemini/LLM API integration',
    ],
  },
  {
    group: 'Currently building toward',
    description: 'Learning next',
    items: ['TypeScript', 'Docker', 'Redis', 'Testing', 'AWS basics', 'RAG / vector databases / agents', 'Operating Systems', 'Computer Networks'],
  },
];

export const achievements = {
  codingPlatforms: [
    {
      name: 'LeetCode',
      solved: 240,
      label: 'problems solved',
      url: links.leetcode,
    },
  ],
  competitions: [
    { name: 'INNOVATE 3.0', organizer: 'JIIT Noida', result: '1st Place', certificate: innovateCertificate },
    { name: 'IndustrySolve Hackathon 2025', organizer: 'IIIT Delhi', result: 'First Runner-Up', certificate: industrySolveCertificate },
    { name: 'Hult Prize Sustainability Ideathon', organizer: 'Hult Prize', result: '3rd Place' },
  ],
  internships: [],
  academic: {
    degree: profile.education.degree,
    institution: profile.education.institution,
    location: profile.education.location,
    years: profile.education.years,
    cgpa: profile.education.cgpa,
  },
};

export const certifications = [];
export const pinnedRepos = [];
export { projects };
