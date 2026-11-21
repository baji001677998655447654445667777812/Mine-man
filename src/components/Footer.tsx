import type { PortfolioData } from '../types/portfolio';

interface FooterProps {
  portfolio: PortfolioData;
}

export function Footer({ portfolio }: FooterProps) {
  return (
    <footer className="no-print border-t border-slate-200 bg-[#F8FAFC] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <p className="font-display text-sm font-bold tracking-wide text-[#152946] uppercase">
            {portfolio.name} · CSE-AIML · {portfolio.location}
          </p>
          <p className="mt-1 text-sm text-slate-600">{portfolio.motto}</p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
          <a
            href={`mailto:${portfolio.email}`}
            className="font-medium text-[#152946] hover:underline"
          >
            {portfolio.email}
          </a>
          <a href="#top" className="hover:text-[#152946]">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
