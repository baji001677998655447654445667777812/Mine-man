import { Check, Copy, Play } from 'lucide-react';
import { useState } from 'react';
import type { DeploymentTarget } from '../types/portfolio';
import { getDeploymentSteps } from '../utils/portfolioLogic';

const DEPLOY_TARGETS: { id: DeploymentTarget; label: string }[] = [
  { id: 'local', label: 'Local FastAPI' },
  { id: 'docker', label: 'Docker Container' },
  { id: 'cloud', label: 'Cloud Hosting' },
];

export function DeploymentSection() {
  const [target, setTarget] = useState<DeploymentTarget>('local');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [apiCheckState, setApiCheckState] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [apiResponseText, setApiResponseText] = useState<string>('');

  const steps = getDeploymentSteps(target);

  async function handleCopy(command: string, index: number) {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedIndex(index);
      window.setTimeout(() => setCopiedIndex(null), 1800);
    } catch {
      setCopiedIndex(null);
    }
  }

  async function handleCheckPythonApi() {
    setApiCheckState('loading');
    try {
      const response = await fetch('/api/health');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.detail || 'API check failed');
      }
      setApiResponseText(JSON.stringify(data));
      setApiCheckState('success');
    } catch (err) {
      setApiResponseText(
        err instanceof Error ? err.message : 'Unable to reach /api/health'
      );
      setApiCheckState('error');
    }
  }

  return (
    <section
      id="deployment"
      className="scroll-mt-20 border-t border-slate-200/80 bg-[#F8FAFC] py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-lg">
            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              07. Architecture &amp; Deployment
            </p>
            <h2 className="text-balance mt-2 font-display text-2xl font-bold tracking-tight text-[#152946] sm:text-3xl">
              Python FastAPI &amp; TypeScript Deployment Guide
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              Built with a Python FastAPI backend (<span className="font-mono text-xs">backend/main.py</span>) and a TypeScript + Tailwind CSS frontend compiled by Vite.
            </p>
          </div>

          <div
            role="group"
            aria-label="Deployment environment"
            className="flex shrink-0 flex-wrap items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 sm:flex-nowrap"
          >
            {DEPLOY_TARGETS.map((item) => {
              const active = target === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setTarget(item.id)}
                  className={`shrink-0 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] sm:text-sm ${
                    active
                      ? 'bg-[#152946] text-white'
                      : 'text-slate-600 hover:text-[#152946]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Deployment steps */}
          <div className="space-y-4 lg:col-span-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-base font-semibold text-[#152946] sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">{step.detail}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(step.command, index)}
                    aria-label={`Copy command for ${step.title}`}
                    className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="mt-4 overflow-x-auto whitespace-pre-wrap break-all rounded-lg bg-[#0F172A] px-4 py-3 font-mono text-xs leading-relaxed text-slate-100 sm:break-normal">
                  <code>{step.command}</code>
                </pre>
              </div>
            ))}
          </div>

          {/* API Endpoints & Live Python check */}
          <aside className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-4">
            <div>
              <h3 className="font-display text-lg font-bold text-[#152946]">
                FastAPI Endpoints
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Pydantic-validated JSON endpoints exposed by{' '}
                <span className="font-mono text-xs text-[#152946]">
                  backend/main.py
                </span>
                .
              </p>

              <dl className="mt-5 divide-y divide-slate-200 text-xs">
                <div className="flex items-center justify-between py-2.5">
                  <dt className="font-mono font-medium text-[#152946]">
                    GET /api/portfolio
                  </dt>
                  <dd className="text-slate-500">Resume JSON</dd>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <dt className="font-mono font-medium text-[#152946]">
                    GET /api/projects
                  </dt>
                  <dd className="text-slate-500">Filtered works</dd>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <dt className="font-mono font-medium text-[#152946]">
                    POST /api/contact
                  </dt>
                  <dd className="text-slate-500">Save inquiry</dd>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <dt className="font-mono font-medium text-[#152946]">
                    GET /api/health
                  </dt>
                  <dd className="text-slate-500">Runtime check</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-5">
              <button
                type="button"
                onClick={handleCheckPythonApi}
                disabled={apiCheckState === 'loading'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-[#EBF1F6] px-4 py-2.5 text-sm font-semibold text-[#152946] transition-colors hover:bg-slate-200/80 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
              >
                <Play className="h-4 w-4" aria-hidden="true" />
                <span>
                  {apiCheckState === 'loading'
                    ? 'Checking Python API...'
                    : 'Test Live Python Backend'}
                </span>
              </button>

              {apiCheckState !== 'idle' && (
                <div
                  role="status"
                  className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-xs text-slate-700"
                >
                  {apiResponseText}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
