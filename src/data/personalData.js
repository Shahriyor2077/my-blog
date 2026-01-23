// Personal information and resume data
export const personalInfo = {
  name: "Shahriyor Zaripov",
  title: "Fullstack Developer",
  location: "Tashkent, Uzbekistan",
  phone: "+998 (91) 012 2077",
  email: "zaripovshahriyor91@gmail.com",
  avatar: "/avatar.jpg", // You can add your photo later
  bio: "Passionate fullstack developer with expertise in modern web technologies. I create beautiful, functional, and user-friendly applications with a focus on clean code and exceptional user experience.",
  resume: "/zaripov_shahriyor_resume.pdf", // You can add your resume PDF later
};

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Shahriyor2077",
    icon: "Github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/shahriyor-zaripov-51b399346",
    icon: "Linkedin",
  },
  {
    name: "Telegram",
    url: "https://t.me/shahriyorjs",
    icon: "Send",
  },
];

export const skills = {
  softSkills: [
    {
      name: "Teamwork & Friendly Communication",
      description:
        "Strong collaborative skills with ability to work effectively in diverse teams",
    },
    {
      name: "Fast & Independent Learning",
      description:
        "Quick adaptation to new technologies and self-directed learning approach",
    },
    {
      name: "Creative Thinking",
      description:
        "Innovative problem-solving and creative approach to development challenges",
    },
    {
      name: "Patience",
      description:
        "Persistent and methodical approach to debugging and problem resolution",
    },
  ],
  technicalSkills: [
    {
      category: "Programming Languages",
      skills: [
        { name: "TypeScript" },
        { name: "JavaScript" },
        { name: "Python" },
        { name: "C" },
        { name: "C++" },
        { name: "HTML5" },
        { name: "CSS3" },
      ],
    },
    {
      category: "Frontend",
      skills: [
        { name: "React.js" },
        { name: "Next.js" },
        { name: "Tailwind CSS" },
        { name: "Ant Design" },
        { name: "Shadcn" },
      ],
    },
    {
      category: "Backend & Databases",
      skills: [
        { name: "Node.js" },
        { name: "Express.js" },
        { name: "Nest.js" },
        { name: "MongoDB" },
        { name: "MySQL" },
        { name: "PostgreSQL" },
      ],
    },
    {
      category: "Tools & Others",
      skills: [
        { name: "Git" },
        { name: "Github" },
        { name: "Gitlab" },
        { name: "Docker" },
        { name: "Swagger" },
        { name: "Postman" },
        { name: "CI/CD" },
        { name: "GraphQL" },
      ],
    },
  ],
};

export const workExperience = [
  {
    id: 1,
    position: "Web Developer",
    company: "WebGrade",
    location: "Tashkent, Uzbekistan",
    duration: "2025 - Present",
    type: "Full-time",
    description:
      "Developing modern web applications and maintaining existing projects using latest web technologies.",
    responsibilities: [
      "Building responsive web applications",
      "Collaborating with design and backend teams",
      "Implementing new features and bug fixes",
      "Code optimization and performance improvement",
      "Testing and quality assurance",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "PostgreSQL",
    ],
    highlights: [],
  },
];

export const education = [
  {
    id: 1,
    institution: "Najot Ta'lim",
    program: "Bootcamp Foundation",
    duration: "2024-2025",
    status: "Completed",
    description:
      "Foundation bootcamp program covering fundamentals of web development and programming basics",
    skills: [
      "Web Development Basics",
      "Programming Fundamentals",
      "HTML & CSS",
      "JavaScript Basics",
    ],
  },
  {
    id: 2,
    institution: "Najot Ta'lim",
    program: "Bootcamp Fullstack",
    duration: "2025-2026",
    status: "In Progress",
    description:
      "Intensive web development program focusing on full-stack development with modern technologies",
    skills: [
      "Full Stack Development",
      "Modern Web Technologies",
      "Project Management",
      "Team Collaboration",
    ],
  },
  {
    id: 3,
    institution: "Cambridge",
    program: "English Language Course",
    duration: "2025-2026",
    status: "Completed",
    description:
      "Advanced English language program with focus on professional communication and academic writing",
    skills: [
      "English Language",
      "Professional Communication",
      "Academic Writing",
      "Business English",
    ],
  },
];

export const certificates = [
  {
    id: 1,
    name: "Students Conference Certificate",
    issuer: "Najot Ta'lim",
    date: "2025",
    description:
      "Recognition for active participation and contribution in students conference",
  },
];

export const awards = [
  {
    id: 1,
    title: "Cambridge Grant Winner",
    description: "Won competitive grant from Cambridge for academic excellence and innovation",
    date: "2025",
    issuer: "Cambridge",
  },
  {
    id: 2,
    title: "Najot Ta'lim Grant Winner",
    description: "Received grant from Najot Ta'lim for outstanding performance and dedication",
    date: "2025",
    issuer: "Najot Ta'lim",
  },
];

// Projects
export const projects = [
  {
    id: 1,
    title: "Ayoqsh web",
    description: "Platform for managing operators and moderators with role-based access control and real-time dashboard.",
    image: "/ayoqsh.png",
    url: "https://ayoqsh-frontend.vercel.app/operator",
    technologies: ["React", "NestJS", "Prisma", "Radix"],
  },
  {
    id: 2,
    title: "Clinic site",
    description: "Comprehensive clinic management system with secure authentication and separate portals for doctors and administrators.",
    image: "/klinika.png",
    url: "https://orfan.uz/auth/doctor/login",
    technologies: ["Express", "JavaScript", "MongoDB", "Handlebars"],
  },
  {
    id: 3,
    title: "Debt web",
    description: "Convenient web service for calculating and managing store debts. Track customer debts and maintain payment records efficiently.",
    image: "/debt.png",
    url: "https://debt-market.vercel.app/login",
    technologies: ["React", "Shadcn", "Express", "Prisma"],
  },
  {
    id: 4,
    title: "Movie App",
    description: "Modern movie catalog application with search, filtering, and detailed information about each film.",
    image: "/movie.png",
    url: "https://film-uz.vercel.app/",
    technologies: ["React", "TypeScript", "AntDesign", "Translator"],
  },
  {
    id: 5,
    title: "E-Commerce",
    description: "Full-featured e-commerce store with product catalog, shopping cart, and complete checkout process.",
    image: "/ecomerce.png",
    url: "https://ecommerce-uz.vercel.app/",
    technologies: ["React", "Redux", "TypeScript", "Tailwind"],
  },
  {
    id: 6,
    title: "Food Landing",
    description: "Modern landing page for food delivery service with menu, service features, and call-to-action.",
    image: "/food.png",
    url: "https://food-uz.vercel.app/",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 7,
    title: "Interview questions",
    description: "Platform for interview preparation with curated professional questions and answers.",
    image: "/stackbek.png",
    url: "https://stackbek.vercel.app/",
    technologies: ["Next", "React", "TypeScript", "Tailwind"],
  },
  {
    id: 8,
    title: "Mini marketplace",
    description: "Small marketplace built using ready-made API to demonstrate functionality and features.",
    image: "/marketplace.png",
    url: "https://marketplace-uz.vercel.app/",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 9,
    title: "Landing page",
    description: "Professional landing page for a Japanese company with service information and contact details.",
    image: "/langdingUravo.png",
    url: "https://uravo-net.vercel.app/",
    technologies: ["HTML", "SCSS", "JavaScript"],
  },
];

// SEO and Meta data
export const seoData = {
  title: "ShahriyorZaripov - Fullstack Developer",
  description:
    "Experienced Fullstack Developer specializing in React.js, Next.js, Node.js, and modern web technologies. Creating beautiful, functional, and user-friendly applications.",
  keywords:
    "fullstack developer, react developer, next.js developer, web developer, frontend developer, backend developer, javascript, typescript, nodejs, tashkent developer",
  author: "ShahriyorZaripov",
  url: "https://shahriyor-zaripov",
  image: "/og-image.jpg", // You can add Open Graph image later
};
