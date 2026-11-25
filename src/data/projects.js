// Edit one object here to add, reorder, or update a project.
// Example: { id: 'jobprep-ai', title: 'JobPrep-AI', tagline: 'Interview practice tailored to a job description and resume.', description: 'Generates tailored questions and feedback.', tech: ['MERN', 'Gemini API'], categories: ['featured', 'ai', 'fullstack'], featured: true, status: 'live', links: { live: 'https://job-prep-ai-pi.vercel.app/', github: 'https://github.com/Mannan-Maheshwari/JobPrep-AI' }, highlights: ['Resume parsing'], order: 1 }
export const projects = [
  {
    id: 'jobprep-ai',
    title: 'JobPrep-AI',
    tagline: 'Turn a job description and resume into a focused interview practice session.',
    description:
      'Candidates provide a job description, upload a resume, and add a self-description to generate tailored interview questions and feedback. The application includes resume parsing, interview feedback, JWT/OAuth authentication, Zod validation, and Puppeteer.',
    tech: ['MERN', 'Gemini API', 'JWT', 'OAuth', 'Zod', 'Puppeteer'],
    categories: ['featured', 'ai', 'backend', 'fullstack'],
    featured: true,
    status: 'live',
    links: {
      live: 'https://job-prep-ai-pi.vercel.app/',
      github: 'https://github.com/Mannan-Maheshwari/JobPrep-AI',
    },
    highlights: ['Tailored interview questions and feedback', 'Resume parsing'],
    order: 1,
  },
  {
    id: 'redrop',
    title: 'ReDrop',
    tagline: 'An IoT water purification system combining sensor monitoring and pre-filtration.',
    description:
      'The system monitors turbidity, flow, and TDS through sensors, REST APIs, and a dashboard. Its pre-filtration mix uses bentonite clay, moringa seed powder, and rice husk to help extend membrane life. Patent and research paper work is in progress; wastewater recycling is a concept, not an implemented feature.',
    tech: ['IoT', 'Sensors', 'REST APIs'],
    categories: ['iot', 'backend'],
    featured: false,
    status: 'live',
    links: {
      live: 'https://re-drop.netlify.app/',
      github: 'https://github.com/Mannan-Maheshwari/ReDrop',
    },
    highlights: ['Turbidity, flow, and TDS monitoring', 'Patent and research paper in progress'],
    order: 2,
  },
  {
    id: 'cold-email-pipeline',
    title: 'Cold Email Outreach Pipeline',
    tagline: 'Automates internship prospecting with email and LLM integrations.',
    description:
      'A Python pipeline for internship prospecting that integrates the Gmail API, Gemini API, and SQLite. The project is built and being tested.',
    tech: ['Python', 'Gmail API', 'Gemini API', 'SQLite'],
    categories: ['ai', 'backend', 'automation'],
    featured: false,
    status: '',
    links: { live: '', github: '' },
    order: 3,
  },
  {
    id: 'student-dashboard',
    title: 'Student Dashboard',
    tagline: 'A student dashboard built for a frontend internship application.',
    description:
      'A dashboard application built with Next.js App Router, Tailwind, Framer Motion, and Supabase.',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Supabase'],
    categories: ['frontend', 'fullstack'],
    featured: false,
    status: 'in-progress',
    links: { live: '', github: '' },
    order: 4,
  },
  {
    id: 'parknest',
    title: 'ParkNest',
    tagline: 'Smart Parking — find and reserve parking.',
    description: '',
    tech: [],
    categories: ['fullstack'],
    featured: false,
    status: 'live',
    links: {
      live: 'https://parknest-codec-i18.vercel.app/',
      github: 'https://github.com/Mannan-Maheshwari/ParkNest',
    },
    order: 5,
  },
  {
    id: 'trimzoid',
    title: 'Trimzoid',
    tagline: 'A live URL shortener.',
    description: 'A URL shortener deployed at trimzoid.vercel.app.',
    tech: [],
    categories: ['utility'],
    featured: false,
    status: 'live',
    links: {
      live: 'https://trimzoid.vercel.app/',
      github: 'https://github.com/Mannan-Maheshwari/URL-shortner',
    },
    order: 6,
  },
];

export default projects;
