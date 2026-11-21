import { ArrowUpRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ProjectCategory, ProjectItem, ProjectVisualType } from '../types/portfolio';
import {
  countProjectsByCategory,
  filterProjects,
  PROJECT_CATEGORIES,
} from '../utils/portfolioLogic';

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

function ProjectVisual({ type }: { type: ProjectVisualType }) {
  if (type === 'mobility') {
    return (
      <svg
        viewBox="0 0 360 180"
        className="h-full w-full"
        aria-hidden="true"
      >
        <rect width="360" height="180" fill="#EBF1F6" />
        <path
          d="M28 132 H332"
          stroke="#CBD5E1"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <circle cx="96" cy="122" r="24" fill="none" stroke="#152946" strokeWidth="3.5" />
        <circle cx="236" cy="122" r="24" fill="none" stroke="#152946" strokeWidth="3.5" />
        <path
          d="M96 122 L148 76 L204 76 L236 122 M148 76 L168 122 L236 122 M148 76 L138 56 H160 M204 76 L216 54 H238"
          fill="none"
          stroke="#1D4ED8"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="262" y="34" width="66" height="44" rx="8" fill="#FFFFFF" stroke="#CBD5E1" />
        <path d="M276 50 H314 M276 62 H302" stroke="#152946" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'game') {
    return (
      <svg
        viewBox="0 0 360 180"
        className="h-full w-full"
        aria-hidden="true"
      >
        <rect width="360" height="180" fill="#152946" />
        <circle cx="180" cy="90" r="56" fill="none" stroke="#334155" strokeWidth="1.5" />
        <circle cx="180" cy="90" r="36" fill="none" stroke="#1D4ED8" strokeWidth="2" />
        <polygon
          points="180,38 228,124 132,124"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M44 138 L92 104 L132 124 M316 138 L268 104 L228 124"
          fill="none"
          stroke="#64748B"
          strokeWidth="2"
        />
        <circle cx="180" cy="90" r="6" fill="#3B82F6" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 360 180"
      className="h-full w-full"
      aria-hidden="true"
    >
      <rect width="360" height="180" fill="#EEF2F6" />
      <rect x="64" y="32" width="232" height="104" rx="8" fill="#152946" />
      <rect x="74" y="42" width="212" height="84" rx="4" fill="#1E293B" />
      <rect x="92" y="58" width="76" height="52" rx="4" fill="#1D4ED8" opacity="0.85" />
      <rect x="182" y="58" width="84" height="22" rx="3" fill="#334155" />
      <rect x="182" y="88" width="84" height="22" rx="3" fill="#334155" />
      <path d="M150 136 L142 152 H218 L210 136" fill="none" stroke="#475569" strokeWidth="3" />
    </svg>
  );
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const visibleProjects = filterProjects(projects, selectedCategory);
  const categoryCounts = countProjectsByCategory(projects);

  useEffect(() => {
    if (!activeProject) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeProject]);

  return (
    <section id="projects" className="scroll-mt-20 border-t border-slate-200/80 bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-lg">
            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              06. Selected Works
            </p>
            <h2 className="text-balance mt-2 font-display text-2xl font-bold tracking-tight text-[#152946] sm:text-3xl">
              Selected Projects &amp; Research
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Explorations across user-centered mobility design, interactive game world-building, and consumer hardware research.
            </p>
          </div>

          {/* Interactive segmented filter bar */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex shrink-0 flex-wrap items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1 sm:flex-nowrap"
          >
            {PROJECT_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] sm:text-sm ${
                    isActive
                      ? 'bg-white text-[#152946] shadow-xs'
                      : 'text-slate-600 hover:text-[#152946]'
                  }`}
                >
                  {category}{' '}
                  <span className="ml-1 font-mono text-xs tabular-nums text-slate-400">
                    {categoryCounts[category]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project cards grid */}
        <div
          data-testid="projects-grid"
          className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-[#F8FAFC] transition-colors duration-150 hover:border-slate-300"
            >
              <div className="aspect-[2/1] w-full overflow-hidden border-b border-slate-200">
                <ProjectVisual type={project.visualType} />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500">
                    <span className="whitespace-nowrap font-medium text-[#1E3A8A]">
                      {project.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="whitespace-nowrap">{project.role}</span>
                    <span aria-hidden="true">·</span>
                    <span className="whitespace-nowrap tabular-nums">{project.year}</span>
                  </div>

                  <h3 className="mt-2.5 font-display text-xl font-bold text-[#152946]">
                    {project.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                  <span className="truncate text-xs text-slate-500">
                    {project.focusTags.join(' · ')}
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    aria-label={`Inspect ${project.title}`}
                    className="ml-3 inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold text-[#152946] transition-colors hover:bg-slate-200/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Accessible Project Detail Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  {activeProject.category} · {activeProject.role} ·{' '}
                  <span className="tabular-nums">{activeProject.year}</span>
                </p>
                <h3
                  id="project-modal-title"
                  className="mt-1.5 font-display text-2xl font-bold text-[#152946]"
                >
                  {activeProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close project details"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
              <div className="aspect-[2/1] w-full">
                <ProjectVisual type={activeProject.visualType} />
              </div>
            </div>

            <p className="mt-5 text-base leading-relaxed text-slate-600">
              {activeProject.summary}
            </p>

            <div className="mt-6">
              <h4 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Key Focus &amp; Outcomes
              </h4>
              <ul className="mt-3 space-y-2.5">
                {activeProject.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-slate-700"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1D4ED8]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-5">
              <p className="text-xs font-medium text-slate-500">
                Areas: {activeProject.focusTags.join(' · ')}
              </p>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="rounded-lg bg-[#152946] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1E3A8A]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
