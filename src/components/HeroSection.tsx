import { ArrowDownRight, ArrowUpRight, User } from 'lucide-react';
import { useState } from 'react';
import type { PortfolioData } from '../types/portfolio';

interface HeroSectionProps {
  portfolio: PortfolioData;
  onOpenResume: () => void;
}

export function HeroSection({ portfolio, onOpenResume }: HeroSectionProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section
      id="top"
      className="border-b border-slate-200/80 bg-white py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Typographic hierarchy */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#1E3A8A] uppercase">
                {portfolio.headline}
              </p>

              <h1 className="text-balance mt-4 font-display text-4xl font-bold tracking-tight text-[#152946] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
                {portfolio.name}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                {portfolio.profile}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#152946] px-6 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#1E3A8A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
              >
                <span>Explore Selected Projects</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-[#152946] transition-colors duration-150 hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
              >
                <span>Contact Info</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex shrink-0 items-center whitespace-nowrap px-2 py-2 text-sm font-medium text-slate-600 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-[#152946] hover:decoration-[#152946] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
              >
                View Printable Resume
              </button>
            </div>
          </div>

          {/* Right column: Portrait matching split height */}
          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-[#EDF2F7] sm:min-h-[420px]">
              {!imageFailed ? (
                <img
                  src={portfolio.portraitUrl}
                  alt={`Studio portrait of ${portfolio.name} in a black suit`}
                  referrerPolicy="no-referrer"
                  onError={() => setImageFailed(true)}
                  className="h-full w-full object-cover object-top lg:h-full"
                />
              ) : (
                <div className="flex h-full min-h-[340px] flex-col items-center justify-center bg-slate-100 p-8 text-center">
                  <User className="h-12 w-12 text-slate-400" aria-hidden="true" />
                  <p className="mt-3 font-display text-lg font-semibold text-[#152946]">
                    {portfolio.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    CSE — Artificial Intelligence &amp; Machine Learning
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full-width 3-column credential strip directly inspired by the resume header table */}
        <div className="mt-10 grid grid-cols-1 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-[#EBF1F6] md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="p-5 sm:px-6">
            <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
              Location
            </p>
            <p className="mt-1.5 text-sm font-semibold text-[#152946] sm:text-base">
              {portfolio.location}
            </p>
          </div>

          <div className="p-5 sm:px-6">
            <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
              Academic Programme
            </p>
            <p className="mt-1.5 text-sm font-semibold text-[#152946] sm:text-base">
              {portfolio.academicProgramme}
            </p>
          </div>

          <div className="p-5 sm:px-6">
            <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
              Focus
            </p>
            <p className="mt-1.5 text-sm font-semibold text-[#152946] sm:text-base">
              {portfolio.focusAreas.join(' · ')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
