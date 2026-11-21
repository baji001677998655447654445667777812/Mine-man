import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  name: string;
  onOpenResume: () => void;
}

const NAV_LINKS = [
  { href: '#profile', label: 'Profile' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#deployment', label: 'Deploy' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar({ name, onOpenResume }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-slate-200/80 bg-[#F8FAFC]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#top"
          className="shrink-0 whitespace-nowrap font-display text-lg font-bold tracking-tight text-[#152946] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8]"
        >
          {name}
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 whitespace-nowrap border-b border-transparent py-1 text-sm font-medium text-slate-600 transition-colors duration-150 hover:border-[#152946] hover:text-[#152946] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={onOpenResume}
            className="hidden shrink-0 whitespace-nowrap rounded-lg bg-[#152946] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#1E3A8A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] md:inline-flex"
          >
            Resume Sheet
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-slate-200 bg-white px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-[#152946]"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenResume();
              }}
              className="mt-2 w-full rounded-lg bg-[#152946] px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-[#1E3A8A]"
            >
              Resume Sheet
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
