import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { PulsingDot } from '@/components/ui/current-role-card';
import { HeroFishmug } from './_components/hero-fishmug';

type PillStatus = 'ongoing' | 'completed' | 'concept';

function StatusPill({ status, label }: { status?: PillStatus; label?: string }) {
  const dotClass =
    status === 'ongoing'
      ? 'bg-accent'
      : status === 'completed'
        ? 'bg-muted-foreground/60'
        : status === 'concept'
          ? 'bg-primary/50'
          : '';
  const text =
    label ??
    (status === 'ongoing'
      ? 'Ongoing'
      : status === 'completed'
        ? 'Completed'
        : status === 'concept'
          ? 'Concept'
          : '');
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-wider text-foreground">
      {dotClass && <span className={`size-2 rounded-full ${dotClass}`} />}
      {text}
    </span>
  );
}

function CollapseSection({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <details className="group">
      <summary className="flex cursor-pointer items-center justify-between gap-4 list-none [&::-webkit-details-marker]:hidden hover:text-primary/80 transition-colors">
        <h3 className="text-2xl font-medium text-primary">{title}</h3>
        <ChevronDown className="size-5 text-primary/70 transition-transform group-open:rotate-180" />
      </summary>
      <div className="mt-4 text-lg leading-relaxed">{children}</div>
    </details>
  );
}

function CollapseRow({
  title,
  pill,
  meta,
  children,
}: {
  title: React.ReactNode;
  pill?: React.ReactNode;
  meta?: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group border-b border-border/60 py-3">
      <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold list-none [&::-webkit-details-marker]:hidden hover:text-primary transition-colors">
        <span className="min-w-0">{title}</span>
        <div className="flex items-center gap-3 shrink-0 text-sm font-normal">
          {meta && <span className="text-muted-foreground hidden sm:inline">{meta}</span>}
          <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
        </div>
      </summary>
      <div className="mt-4 pl-1 pb-2">
        {pill ? (
          <div className="mb-3 flex flex-wrap items-center gap-3">
            {pill}
            {meta && <span className="text-sm text-muted-foreground sm:hidden">{meta}</span>}
          </div>
        ) : (
          meta && (
            <div className="mb-3 flex flex-wrap items-center gap-3 sm:hidden">
              <span className="text-sm text-muted-foreground">{meta}</span>
            </div>
          )
        )}
        {children}
      </div>
    </details>
  );
}

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero: pixelated fishmug as the statement piece */}
      <div className="mb-16 flex flex-col items-center text-center">
        <HeroFishmug />
        <h1 className="mb-4 font-bold text-5xl tracking-tight">
          fishmug
        </h1>
      </div>

      {/* About Me */}
      <div className="mx-auto max-w-3xl font-serif">
        <div className="space-y-12">
          {/* Current Role */}
          <section>
            <h3 className="text-2xl font-medium mb-4 text-primary flex items-center gap-2">
              <PulsingDot />
              Current Role
            </h3>
            <div className="text-lg leading-relaxed">
              <p className="font-semibold text-xl">
                Product Sourcing & Inquiry Coordinator @ <a href="https://maden.co/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Maden</a>
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-muted-foreground">
                <span>Jan 2026 – Present</span>
              </div>
              <ul className="mt-3 space-y-1 list-disc list-inside">
                <li>Sourced U.S. manufacturers and matched them to buyer requests, expanding Maden's supplier network</li>
                <li>Designed front-ends for internal tools, <a href="https://tryatlas.maden.co/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-2">Maden Atlas</a>, and observability dashboards</li>
                <li>Built an autonomous research agent that continuously feeds Maden's data layer</li>
                <li>Owned the PostgreSQL layer backing internal services</li>
              </ul>
            </div>
          </section>

          {/* Experience (collapsible — role + type + date) */}
          <section>
            <CollapseSection title="Experience">
              <CollapseRow
                title="Editorial Associate & Builder @ Merit Systems"
                meta="2024 – 2025"
              >
                <ul className="ml-5 space-y-1.5 list-disc list-outside marker:text-primary/60">
                  <li>Designed and typeset the <a href="https://github.com/briansproule20/merit-manifesto" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-2">company manifesto</a></li>
                  <li>AI app development for Echo; built analytical tools to identify platform gaps</li>
                </ul>
              </CollapseRow>

              <CollapseRow
                title="English Teacher @ Boyd H. Anderson High School"
                meta="2023 – 2024"
              >
                <ul className="ml-5 space-y-1.5 list-disc list-outside marker:text-primary/60">
                  <li>Taught AP Language, Cambridge English, and IB English</li>
                  <li>Set school record for AP Lang pass rate</li>
                  <li>Raised FAST ELA scores 32%</li>
                </ul>
              </CollapseRow>

              <CollapseRow
                title="Writer @ Recurrent Ventures"
                meta="2023"
              >
                <ul className="ml-5 space-y-1.5 list-disc list-outside marker:text-primary/60">
                  <li>Wrote essays on international geopolitical conflict</li>
                </ul>
              </CollapseRow>

              <CollapseRow
                title="Editorial & Journals Intern @ Ohio State University Press"
                meta="2021 – 2023"
              >
                <ul className="ml-5 space-y-1.5 list-disc list-outside marker:text-primary/60">
                  <li>Line-edited and typeset 32 manuscripts</li>
                  <li>Managed social media for five scholarly journals</li>
                </ul>
              </CollapseRow>
            </CollapseSection>
          </section>

          {/* Education (collapsible — institution + credential + date) */}
          <section>
            <CollapseSection title="Education">
              <CollapseRow
                title="Columbia University Journalism School"
                pill={<StatusPill label="Course" />}
                meta="Summer 2023"
              >
                <p>Publishing Course: book, magazine, and digital</p>
              </CollapseRow>

              <CollapseRow
                title="The Ohio State University"
                pill={<StatusPill label="B.A." />}
                meta="2019 – 2023"
              >
                <p>B.A. English, Minor in Military History</p>
                <p className="italic text-muted-foreground">Magna cum laude, University Honors</p>
              </CollapseRow>

              <CollapseRow
                title="Pittsburgh Central Catholic High School"
                pill={<StatusPill label="Diploma" />}
                meta="Class of 2019"
              >
                <p>Pittsburgh, PA</p>
              </CollapseRow>
            </CollapseSection>
          </section>

          {/* Side Projects (collapsible — name + status + date) */}
          <section>
            <CollapseSection title="Side Projects">
              <CollapseRow
                title="Agential Commerce"
                pill={<StatusPill status="ongoing" />}
                meta="2025 – present"
              >
                <p>Agent-readable commerce primitives — APIs that accept micropayments via x402 / MPP, so an agent (or a human) can transact directly without a checkout dance.</p>
                <ul className="mt-4 ml-5 space-y-3 list-disc list-outside marker:text-primary/60">
                  <li>
                    <a href="https://coolcoozie.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline decoration-primary/50 decoration-2 underline-offset-4 hover:decoration-primary transition-colors">
                      Cool Coozie
                      <ArrowUpRight className="size-4" />
                    </a>
                    <span className="text-muted-foreground"> — image-to-coozie API, $16 per coozie via x402 micropayment, dye-sublimated and shipped</span>
                  </li>
                  <li>
                    <a href="https://poim.io/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline decoration-primary/50 decoration-2 underline-offset-4 hover:decoration-primary transition-colors">
                      Proof of Intelligence Mint (POIM)
                      <ArrowUpRight className="size-4" />
                    </a>
                    <span className="text-muted-foreground"> — x402-powered trivia on Base; correct answers mint POIC tokens</span>
                  </li>
                </ul>
              </CollapseRow>

              <CollapseRow
                title="AEGIS"
                pill={<StatusPill status="ongoing" />}
                meta="2025 – present"
              >
                <p>A multi-phase study.</p>
                <ul className="mt-2 ml-4 space-y-1.5 list-disc list-outside">
                  <li><span className="font-semibold">Phase one</span> — understanding the internet: how systems, networks, and the critical infrastructure that underpin everything I build actually work, through the lens of defensive security.</li>
                  <li><span className="font-semibold">Phase two</span> — finding out what I'm actually capable of shipping with coding agents at my side, once I understand the layer beneath them.</li>
                </ul>
                <p className="mt-3">The work spans network hardening, threat intelligence analysis, secure application development, cryptographic implementation, and DevSecOps pipeline integration.</p>
              </CollapseRow>

              <CollapseRow
                title="3D Printing"
                pill={<StatusPill status="ongoing" />}
                meta="2025 – present"
              >
                <p>Modeling with <a href="https://tryponcho.com/r/bsproule" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-2">Poncho</a>, printing on the Bambu Labs A1.</p>
              </CollapseRow>

              <CollapseRow
                title="URSA MARIS"
                pill={<StatusPill status="concept" />}
                meta="2025"
              >
                <p>Tethered, sensor-heavy survey class ROV designed to execute precise transects of the sea floor, collect sensory data for bathymetric visualizations, capture stable video of marine wildlife, and perform seawall and underwater infrastructure analysis</p>
              </CollapseRow>

              <CollapseRow
                title="Echo App Building"
                pill={<StatusPill status="completed" />}
                meta="2024 – 2025"
              >
                <p>AI-powered apps with usage-based billing</p>
                <ul className="mt-4 ml-5 space-y-3 list-disc list-outside marker:text-primary/60">
                  <li>
                    <a href="https://trivwiz.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline decoration-primary/50 decoration-2 underline-offset-4 hover:decoration-primary transition-colors">
                      Trivia Wizard
                      <ArrowUpRight className="size-4" />
                    </a>
                    <span className="text-muted-foreground"> — trivia app development</span>
                  </li>
                  <li>
                    <a href="https://litparlor.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline decoration-primary/50 decoration-2 underline-offset-4 hover:decoration-primary transition-colors">
                      Lit Parlor
                      <ArrowUpRight className="size-4" />
                    </a>
                    <span className="text-muted-foreground"> — literary discovery and tech ed platform</span>
                  </li>
                  <li>
                    <a href="https://bigcorpinc.company" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline decoration-primary/50 decoration-2 underline-offset-4 hover:decoration-primary transition-colors">
                      Big Corp Inc.
                      <ArrowUpRight className="size-4" />
                    </a>
                    <span className="text-muted-foreground"> — corporate satire</span>
                  </li>
                  <li>
                    <a href="https://iwb-one.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline decoration-primary/50 decoration-2 underline-offset-4 hover:decoration-primary transition-colors">
                      Interstellar Weather Bureau
                      <ArrowUpRight className="size-4" />
                    </a>
                    <span className="text-muted-foreground"> — NASA APIs and satirical weatherman</span>
                  </li>
                </ul>
              </CollapseRow>

              <CollapseRow
                title="White Horse Mountain Home"
                pill={<StatusPill status="completed" />}
                meta="2024"
              >
                <p>Branding, design, and digital marketing</p>
              </CollapseRow>
            </CollapseSection>
          </section>

          {/* Closing line */}
          <section className="!mt-6">
            <p className="border-t border-border pt-4 italic text-center text-lg leading-relaxed text-muted-foreground">
              Think freely. Build cool things. Be nice.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
