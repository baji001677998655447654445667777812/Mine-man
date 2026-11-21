import type { PortfolioData } from '../types/portfolio';

interface AboutSectionProps {
  portfolio: PortfolioData;
}

export function AboutSection({ portfolio }: AboutSectionProps) {
  return (
    <div className="divide-y divide-slate-200/80">
      {/* Career Objective & Learning & Development */}
      <section id="profile" className="scroll-mt-20 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                01. Career Objective
              </p>
              <h2 className="text-balance mt-2 font-display text-2xl font-bold tracking-tight text-[#152946] sm:text-3xl">
                Engineering Practical &amp; Interactive Software
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {portfolio.careerObjective}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                02. Learning &amp; Development
              </p>
              <h2 className="text-balance mt-2 font-display text-2xl font-bold tracking-tight text-[#152946] sm:text-3xl">
                Growth Through Experimentation
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {portfolio.learningAndDevelopment}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Interests & Skills in Development */}
      <section id="skills" className="scroll-mt-20 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              03. Core Capabilities
            </p>
            <h2 className="text-balance mt-2 font-display text-2xl font-bold tracking-tight text-[#152946] sm:text-3xl">
              Technical Interests &amp; Skills in Development
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.skills.map((skill, index) => (
              <article
                key={skill.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-[#F8FAFC] p-6 transition-colors duration-150 hover:border-slate-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                    <span className="font-medium uppercase tracking-wide">
                      {skill.area}
                    </span>
                    <span className="font-mono tabular-nums text-slate-400">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-[#152946]">
                    {skill.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {skill.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Future Goals & Personal Statement */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                04. Future Goals
              </p>
              <h2 className="text-balance mt-2 font-display text-2xl font-bold tracking-tight text-[#152946]">
                Roadmap Ahead
              </h2>
              <ul className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
                {portfolio.futureGoals.map((goal, idx) => (
                  <li
                    key={goal}
                    className="flex items-baseline gap-4 px-5 py-4 text-sm font-medium text-slate-700 sm:text-base"
                  >
                    <span className="font-mono text-xs font-semibold tabular-nums text-[#1E3A8A]">
                      0{idx + 1}
                    </span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#EBF1F6] p-7 sm:p-8 lg:col-span-5">
              <div>
                <p className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
                  05. Personal Statement
                </p>
                <blockquote className="mt-4 font-display text-lg font-medium leading-relaxed text-[#152946] sm:text-xl">
                  &ldquo;{portfolio.personalStatement}&rdquo;
                </blockquote>
              </div>
              <p className="mt-6 border-t border-slate-300/80 pt-4 text-xs font-semibold tracking-wide text-slate-600 uppercase">
                {portfolio.name} · {portfolio.motto}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
