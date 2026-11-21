import type { PortfolioData } from '../types/portfolio';

export const DEFAULT_PORTFOLIO: PortfolioData = {
  name: 'M. Baji',
  headline: 'Student Portfolio | CSE — Artificial Intelligence & Machine Learning',
  portraitUrl: '/assets/aistudio/Professional_Black_Suit_Headshot_eeb6b428.png',
  location: 'Vijayawada, Andhra Pradesh, India',
  academicProgramme: 'Undergraduate Engineering — CSE-AIML',
  focusAreas: ['Technology', 'AI/ML', 'Software', 'Game Development'],
  email: 'nnjj10601@gmail.com',
  motto: 'Learning. Building. Innovating.',
  profile:
    'I am M. Baji, a Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning. I am interested in technology, software development, AI, game development, and creative digital solutions. I enjoy exploring new technologies and turning ideas into practical projects.',
  careerObjective:
    'To build strong skills in programming, software engineering, and AI/ML, and use them to develop useful applications and original interactive experiences. My long-term aim is to become a capable software developer and contribute to meaningful technology projects.',
  skills: [
    {
      id: 'programming-fundamentals',
      title: 'Programming fundamentals',
      area: 'Core Engineering',
      summary:
        'Building clean logical structures, data handling, and algorithmic problem-solving habits in Python and TypeScript.',
    },
    {
      id: 'ai-ml',
      title: 'Artificial Intelligence & Machine Learning',
      area: 'Specialization',
      summary:
        'Studying foundational machine learning concepts, pattern reasoning, and intelligent application workflows.',
    },
    {
      id: 'web-development',
      title: 'Web development',
      area: 'Full-Stack',
      summary:
        'Creating responsive interfaces with TypeScript and CSS backed by FastAPI REST endpoints.',
    },
    {
      id: 'game-development',
      title: 'Game development',
      area: 'Interactive Media',
      summary:
        'Designing original interactive worlds, narrative progression, and action-adventure player systems.',
    },
    {
      id: 'logical-thinking',
      title: 'Logical thinking & problem solving',
      area: 'Methodology',
      summary:
        'Breaking open-ended requirements into clear, testable steps through experimentation and iteration.',
    },
    {
      id: 'ui-ux',
      title: 'UI/UX and design thinking',
      area: 'Product Design',
      summary:
        'Mapping user journeys, reducing friction in everyday digital services, and structuring clear layouts.',
    },
  ],
  projects: [
    {
      id: 'smart-bike-rental',
      title: 'Smart College & Urban Bike Rental Platform',
      category: 'Design Thinking',
      year: '2026',
      role: 'Product & UX Concept',
      summary:
        'A design-thinking project exploring a convenient digital bike-rental experience for college students and urban users, with a focus on easy access and user-friendly booking.',
      highlights: [
        'Mapped campus-to-city commute friction points for undergraduate students.',
        'Designed a streamlined pickup, reservation, and return flow for rapid daily access.',
        'Structured transparent student pricing and station availability indicators.',
      ],
      focusTags: ['Design Thinking', 'Mobility UX', 'Booking Workflow'],
      visualType: 'mobility',
    },
    {
      id: 'genesis-india',
      title: 'GENESIS: INDIA',
      category: 'Game Concept',
      year: '2026',
      role: 'Narrative & World Designer',
      summary:
        'An original futuristic game concept inspired by action-adventure experiences, with an emphasis on an original storyline, character development, and world-building.',
      highlights: [
        'Authored an original sci-fi narrative arc grounded in futuristic Indian settings.',
        'Defined protagonist progression, faction lore, and atmospheric environmental zones.',
        'Outlined core action-adventure exploration loops and encounter pacing.',
      ],
      focusTags: ['World-Building', 'Character Design', 'Action-Adventure'],
      visualType: 'game',
    },
    {
      id: 'samsung-smart-tv',
      title: 'Samsung Smart TV - Academic Report',
      category: 'Research',
      year: '2026',
      role: 'Technical Researcher',
      summary:
        'An academic report exploring smart television technology, its features, components, and everyday applications.',
      highlights: [
        'Examined display panel architecture, processing units, and smart operating ecosystems.',
        'Documented connectivity protocols, voice interfaces, and home automation integration.',
        'Evaluated everyday consumer usability and practical household applications.',
      ],
      focusTags: ['Consumer Tech', 'Hardware Systems', 'Technical Writing'],
      visualType: 'hardware',
    },
  ],
  learningAndDevelopment:
    'I am continuously building my knowledge in computer science concepts, programming, project planning, communication, presentation skills, and creative problem solving. I value learning through practice, experimentation, and feedback.',
  futureGoals: [
    'Strengthen programming and software development skills',
    'Learn advanced AI/ML concepts',
    'Build real-world projects',
    'Develop original games and interactive experiences',
    'Contribute to innovative technology solutions',
  ],
  personalStatement:
    'I believe learning is a continuous process. Every project and challenge is an opportunity to improve. My goal is not only to learn technology, but also to understand it, experiment with it, and use it to create something meaningful.',
};
