import { Printer, X } from 'lucide-react';
import { useEffect } from 'react';
import type { PortfolioData } from '../types/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  portfolio: PortfolioData;
  onClose: () => void;
}

export function ResumeModal({ isOpen, portfolio, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-sheet-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="print-only-sheet max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal toolbar (hidden when printing) */}
        <div className="no-print sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3.5">
          <p className="text-xs font-semibold tracking-wide text-slate-600 uppercase">
            Resume Sheet Preview
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#152946] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1E3A8A]"
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume sheet"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Resume Monograph matching M. Baji's Canva template */}
        <div className="px-6 py-8 sm:px-12 sm:py-10">
          <div className="text-center">
            <h2
              id="resume-sheet-title"
              className="font-display text-3xl font-bold tracking-tight text-[#152946]"
            >
              M. BAJI
            </h2>
            <p className="mt-1 text-xs font-medium tracking-widest text-slate-500 uppercase">
              STUDENT PORTFOLIO | CSE — ARTIFICIAL INTELLIGENCE &amp; MACHINE LEARNING
            </p>
            <p className="mt-1.5 text-xs font-medium text-[#1E3A8A]">
              {portfolio.email}
            </p>
          </div>

          {/* 3-column metadata band */}
          <div className="mt-6 grid grid-cols-1 divide-y divide-slate-200 bg-[#EBF1F6] text-xs sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="p-3.5">
              <p className="font-semibold text-[#152946]">Location</p>
              <p className="mt-0.5 text-slate-700">{portfolio.location}</p>
            </div>
            <div className="p-3.5">
              <p className="font-semibold text-[#152946]">Academic Programme</p>
              <p className="mt-0.5 text-slate-700">{portfolio.academicProgramme}</p>
            </div>
            <div className="p-3.5">
              <p className="font-semibold text-[#152946]">Focus</p>
              <p className="mt-0.5 text-slate-700">
                {portfolio.focusAreas.join(' • ')}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5 text-sm leading-relaxed text-slate-700">
            <section>
              <h3 className="border-b border-slate-200 pb-1 text-xs font-bold tracking-wider text-[#152946] uppercase">
                Profile
              </h3>
              <p className="mt-2">{portfolio.profile}</p>
            </section>

            <section>
              <h3 className="border-b border-slate-200 pb-1 text-xs font-bold tracking-wider text-[#152946] uppercase">
                Career Objective
              </h3>
              <p className="mt-2">{portfolio.careerObjective}</p>
            </section>

            <section>
              <h3 className="border-b border-slate-200 pb-1 text-xs font-bold tracking-wider text-[#152946] uppercase">
                Technical Interests &amp; Skills in Development
              </h3>
              <div className="mt-2 grid grid-cols-1 gap-2 bg-[#F8FAFC] p-3.5 sm:grid-cols-3">
                {portfolio.skills.map((skill) => (
                  <p key={skill.id} className="text-xs font-medium text-slate-800">
                    • {skill.title}
                  </p>
                ))}
              </div>
            </section>

            <section>
              <h3 className="border-b border-slate-200 pb-1 text-xs font-bold tracking-wider text-[#152946] uppercase">
                Selected Projects
              </h3>
              <div className="mt-2 space-y-2.5">
                {portfolio.projects.map((project) => (
                  <p key={project.id}>
                    <span className="font-semibold text-[#152946]">
                      {project.title}
                    </span>{' '}
                    — {project.summary}
                  </p>
                ))}
              </div>
            </section>

            <section>
              <h3 className="border-b border-slate-200 pb-1 text-xs font-bold tracking-wider text-[#152946] uppercase">
                Learning &amp; Development
              </h3>
              <p className="mt-2">{portfolio.learningAndDevelopment}</p>
            </section>

            <section>
              <h3 className="border-b border-slate-200 pb-1 text-xs font-bold tracking-wider text-[#152946] uppercase">
                Future Goals
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-700">
                {portfolio.futureGoals.map((g) => `• ${g}`).join('  ')}
              </p>
            </section>

            <section>
              <h3 className="border-b border-slate-200 pb-1 text-xs font-bold tracking-wider text-[#152946] uppercase">
                Personal Statement
              </h3>
              <p className="mt-2">{portfolio.personalStatement}</p>
            </section>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-4 text-center text-xs text-slate-500">
            <p className="font-semibold text-[#152946]">
              M. BAJI | CSE-AIML | {portfolio.location}
            </p>
            <p className="mt-1 italic">{portfolio.motto}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
