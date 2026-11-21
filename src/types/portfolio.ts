export type ProjectCategory = 'All' | 'Design Thinking' | 'Game Concept' | 'Research';

export type ProjectVisualType = 'mobility' | 'game' | 'hardware';

export interface SkillItem {
  id: string;
  title: string;
  area: string;
  summary: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  year: string;
  role: string;
  summary: string;
  highlights: string[];
  focusTags: string[];
  visualType: ProjectVisualType;
}

export interface PortfolioData {
  name: string;
  headline: string;
  portraitUrl: string;
  location: string;
  academicProgramme: string;
  focusAreas: string[];
  email: string;
  motto: string;
  profile: string;
  careerObjective: string;
  skills: SkillItem[];
  projects: ProjectItem[];
  learningAndDevelopment: string;
  futureGoals: string[];
  personalStatement: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactValidationErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
}

export type DeploymentTarget = 'local' | 'docker' | 'cloud';

export interface DeploymentGuideStep {
  title: string;
  detail: string;
  command: string;
}
