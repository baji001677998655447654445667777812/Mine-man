import type {
  ContactPayload,
  ContactValidationErrors,
  DeploymentGuideStep,
  DeploymentTarget,
  ProjectCategory,
  ProjectItem,
} from '../types/portfolio';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All',
  'Design Thinking',
  'Game Concept',
  'Research',
];

export function filterProjects(
  projects: ProjectItem[],
  category: ProjectCategory
): ProjectItem[] {
  if (category === 'All') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
}

export function countProjectsByCategory(
  projects: ProjectItem[]
): Record<ProjectCategory, number> {
  const counts: Record<ProjectCategory, number> = {
    All: projects.length,
    'Design Thinking': 0,
    'Game Concept': 0,
    Research: 0,
  };

  for (const project of projects) {
    counts[project.category] += 1;
  }

  return counts;
}

export function validateContactForm(
  payload: ContactPayload
): ContactValidationErrors {
  const errors: ContactValidationErrors = {};
  const name = payload.name.trim();
  const email = payload.email.trim();
  const subject = payload.subject.trim();
  const message = payload.message.trim();

  if (name.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (subject.length < 3) {
    errors.subject = 'Please provide a short subject (at least 3 characters).';
  }
  if (message.length < 10) {
    errors.message = 'Please write a message of at least 10 characters.';
  }

  return errors;
}

export function hasValidationErrors(errors: ContactValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function getDeploymentSteps(
  target: DeploymentTarget
): DeploymentGuideStep[] {
  if (target === 'local') {
    return [
      {
        title: '1. Create Python environment & install FastAPI',
        detail:
          'Set up an isolated virtual environment and install FastAPI, Uvicorn, and Pydantic from backend/requirements.txt.',
        command:
          'python3 -m venv .venv && source .venv/bin/activate && pip install -r backend/requirements.txt',
      },
      {
        title: '2. Run the FastAPI server',
        detail:
          'Start Uvicorn with hot-reload on port 8000. Interactive Swagger documentation is served automatically at /docs.',
        command: 'uvicorn backend.main:app --reload --port 8000',
      },
      {
        title: '3. Build or run the TypeScript & CSS frontend',
        detail:
          'Install Node dependencies and run Vite in dev mode or generate the production dist/ bundle served by FastAPI.',
        command: 'npm install && npm run build',
      },
    ];
  }

  if (target === 'docker') {
    return [
      {
        title: '1. Build the multi-stage Docker image',
        detail:
          'Stage 1 compiles TypeScript & CSS via Vite; Stage 2 installs Python FastAPI and serves both the API and static UI.',
        command: 'docker build -t mbaji-portfolio .',
      },
      {
        title: '2. Run the FastAPI container',
        detail:
          'Expose port 8000 to access both the responsive portfolio UI and FastAPI endpoints from a single origin.',
        command: 'docker run -p 8000:8000 mbaji-portfolio',
      },
    ];
  }

  return [
    {
      title: '1. Configure Render or Railway build command',
      detail:
        'Compile the TypeScript frontend bundle first so FastAPI mounts dist/ and serves it alongside /api/* routes.',
      command:
        'npm ci && npm run build && pip install -r backend/requirements.txt',
    },
    {
      title: '2. Configure production ASGI start command',
      detail:
        'Bind Uvicorn to 0.0.0.0 and the platform-injected PORT environment variable.',
      command: 'uvicorn backend.main:app --host 0.0.0.0 --port $PORT',
    },
    {
      title: '3. Deploy via Google Cloud Run (alternative)',
      detail:
        'Deploy directly from the included Dockerfile with zero manual server provisioning.',
      command:
        'gcloud run deploy mbaji-portfolio --source . --platform managed --region asia-south1 --allow-unauthenticated',
    },
  ];
}
