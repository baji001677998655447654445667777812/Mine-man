/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { DeploymentSection } from './components/DeploymentSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeModal } from './components/ResumeModal';
import { DEFAULT_PORTFOLIO } from './data/defaultPortfolio';
import type { PortfolioData } from './types/portfolio';

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioData>(DEFAULT_PORTFOLIO);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    let active = true;
    fetch('/api/portfolio')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: PortfolioData | null) => {
        if (active && data && data.name) {
          setPortfolio(data);
        }
      })
      .catch(() => {
        // Retain deterministic seed data if offline
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <div className={resumeOpen ? 'no-print' : ''}>
        <Navbar name={portfolio.name} onOpenResume={() => setResumeOpen(true)} />
        <main>
          <HeroSection
            portfolio={portfolio}
            onOpenResume={() => setResumeOpen(true)}
          />
          <AboutSection portfolio={portfolio} />
          <ProjectsSection projects={portfolio.projects} />
          <DeploymentSection />
          <ContactSection portfolio={portfolio} />
        </main>
        <Footer portfolio={portfolio} />
      </div>

      <ResumeModal
        isOpen={resumeOpen}
        portfolio={portfolio}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
