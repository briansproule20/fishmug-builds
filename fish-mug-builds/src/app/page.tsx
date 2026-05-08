import { ChevronDown, FolderOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CometCard } from '@/components/ui/comet-card';
import { CurrentRoleCard, PulsingDot } from '@/components/ui/current-role-card';
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
        {(pill || meta) && (
          <div className="mb-3 flex flex-wrap items-center gap-3">
            {pill}
            {meta && <span className="text-sm text-muted-foreground sm:hidden">{meta}</span>}
          </div>
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
            <CurrentRoleCard>
              <div className="text-lg leading-relaxed">
                <p className="font-semibold text-xl">
                  Product Sourcing & Inquiry Coordinator @ <a href="https://maden.co/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Maden</a>
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-muted-foreground">
                  <span>Jan 2026 – Present</span>
                </div>
                <ul className="mt-3 space-y-1 list-disc list-inside">
                  <li>Source and qualify U.S. manufacturers and component suppliers</li>
                  <li>Match seller requirements to domestic production capacity</li>
                  <li>Design and build front-ends for internal tools and <a href="https://tryatlas.maden.co/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-2">marketing sites</a></li>
                  <li>Built internal observability dashboards and the integration services that feed them</li>
                  <li>Built an autonomous research agent that continuously feeds Maden's data layer</li>
                  <li>Manage and maintain PostgreSQL databases</li>
                </ul>
              </div>
            </CurrentRoleCard>
          </section>

          {/* Experience (collapsible — role + type + date) */}
          <section>
            <h3 className="text-2xl font-medium mb-4 text-primary">Experience</h3>
            <div className="text-lg leading-relaxed">
              <CollapseRow
                title={<>Editorial Associate & Builder @ <a href="https://www.merit.systems/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Merit Systems</a></>}
                pill={<StatusPill label="Builder" />}
                meta="2024 – 2025"
              >
                <p>Design, typesetting, and editorial work for company communications and <a href="https://github.com/briansproule20/merit-manifesto" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-2">company manifesto</a></p>
                <p className="mt-1">AI app development for Echo. Built analytical tools to identify platform gaps</p>
              </CollapseRow>

              <CollapseRow
                title="English Teacher @ Boyd H. Anderson High School"
                pill={<StatusPill label="Teacher" />}
                meta="2023 – 2024"
              >
                <p>AP Language, Cambridge English, and IB English. Set school record for AP Lang pass rate. Raised FAST ELA scores 32%</p>
              </CollapseRow>

              <CollapseRow
                title="Writer @ Recurrent Ventures"
                pill={<StatusPill label="Writer" />}
                meta="2023"
              >
                <p>Wrote essays on international geopolitical conflict</p>
              </CollapseRow>

              <CollapseRow
                title="Editorial & Journals Intern @ Ohio State University Press"
                pill={<StatusPill label="Intern" />}
                meta="2021 – 2023"
              >
                <p>Line-edited and typeset 32 manuscripts. Managed social media for five scholarly journals</p>
              </CollapseRow>
            </div>
          </section>

          {/* Education (collapsible — institution + credential + date) */}
          <section>
            <h3 className="text-2xl font-medium mb-4 text-primary">Education</h3>
            <div className="text-lg leading-relaxed">
              <CollapseRow
                title="Columbia University Journalism School"
                pill={<StatusPill label="Course" />}
                meta="Summer 2023"
              >
                <p>Publishing Course</p>
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
            </div>
          </section>

          {/* Side Projects (collapsible — name + status + date) */}
          <section>
            <h3 className="text-2xl font-medium mb-4 text-primary">Side Projects</h3>
            <div className="text-lg leading-relaxed">
              <CollapseRow
                title="Agential Commerce"
                pill={<StatusPill status="ongoing" />}
                meta="2025 – present"
              >
                <p>Agent-readable commerce primitives — APIs that accept micropayments via x402 / MPP, so an agent (or a human) can transact directly without a checkout dance.</p>
                <ul className="mt-2 ml-4 space-y-1 text-base">
                  <li><a href="https://poim.io/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Proof of Intelligence Mint (POIM)</a> — x402-powered trivia on Base; correct answers mint POIC tokens</li>
                  <li><a href="https://coolcoozie.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Cool Coozie</a> — image-to-coozie API, $16 per coozie via x402 micropayment, dye-sublimated and shipped</li>
                </ul>
              </CollapseRow>

              <CollapseRow
                title="AEGIS"
                pill={<StatusPill status="ongoing" />}
                meta="2025 – present"
              >
                <p>A multi-phase study.</p>
                <ul className="mt-2 ml-4 space-y-1.5 list-disc list-outside">
                  <li><span className="font-semibold">Phase one</span> — defensive security as the way I learn the systems and critical infrastructure that underpin everything I build.</li>
                  <li><span className="font-semibold">Phase two</span> — finding out what I'm actually capable of shipping with coding agents at my side, once I understand the layer beneath them.</li>
                </ul>
                <p className="mt-3">The work spans network hardening, penetration testing, threat intelligence analysis, secure application development, cryptographic implementation, and DevSecOps pipeline integration.</p>
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
                <ul className="mt-2 ml-4 space-y-1 text-base">
                  <li><a href="https://trivwiz.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Trivia Wizard</a> — trivia app development</li>
                  <li><a href="https://litparlor.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Lit Parlor</a> — literary discovery and tech ed platform</li>
                  <li><a href="https://bigcorpinc.company" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Big Corp Inc.</a> — corporate satire</li>
                  <li><a href="https://iwb-one.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Interstellar Weather Bureau</a> — NASA APIs and satirical weatherman</li>
                </ul>
                <p className="mt-3 text-base">
                  <Link href="/apps" className="text-primary hover:text-primary/80 transition-colors underline decoration-primary/30 underline-offset-2">
                    View the full app directory →
                  </Link>
                </p>
              </CollapseRow>

              <CollapseRow
                title="White Horse Mountain Home"
                pill={<StatusPill status="completed" />}
                meta="2023"
              >
                <p>Branding, design, and digital marketing</p>
              </CollapseRow>
            </div>
          </section>
        </div>
      </div>

      {/* App Directory — pushed to the bottom */}
      <div className="mx-auto flex max-w-2xl justify-center mt-24">
        <CometCard className="w-full">
          <Card className="flex flex-col">
            <CardHeader>
              <div className="mb-4 flex items-center justify-center rounded-lg bg-secondary p-4 w-fit">
                <FolderOpen className="size-10 text-primary" />
              </div>
              <CardTitle className="text-3xl">App Directory</CardTitle>
              <CardDescription className="text-lg">
                Check out the apps I've built
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Link href="/apps">
                <Button className="w-full" size="lg" variant="outline">
                  <FolderOpen className="mr-2 size-5" />
                  View Apps
                </Button>
              </Link>
            </CardContent>
          </Card>
        </CometCard>
      </div>

      {/* Closing line */}
      <div className="mx-auto max-w-3xl mt-20 px-4 font-serif">
        <p className="border-t border-border pt-8 italic text-center text-lg leading-relaxed text-muted-foreground">
          Think freely. Build cool things. Be nice.
        </p>
      </div>
    </div>
  );
}
