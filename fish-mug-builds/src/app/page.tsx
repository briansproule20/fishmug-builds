import { FolderOpen, Presentation } from 'lucide-react';
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
import { MovingBorderButton } from '@/components/ui/moving-border';
import { WavyBackground } from '@/components/ui/wavy-background';

export default async function Home() {
  return (
    <div className="relative">
      <WavyBackground
        containerClassName="absolute inset-0 -z-10"
        colors={[
          "oklch(0.78 0.025 180)",
          "oklch(0.54 0.05 200)",
          "oklch(0.83 0.08 70)",
          "oklch(0.72 0.03 180)",
          "oklch(0.87 0.04 75)",
        ]}
        waveWidth={50}
        backgroundFill="oklch(0.87 0.04 75)"
        blur={10}
        speed="slow"
        waveOpacity={0.3}
      />
      <div className="container mx-auto px-4 py-16">
      <div className="mb-16 text-center">
        <h1 className="mb-4 font-bold text-5xl tracking-tight">
          fishmug
        </h1>
        <p className="mx-auto max-w-2xl text-foreground font-semibold text-2xl mb-3">
          english lit grad turned dev
        </p>
        <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
          apps I've built to spark creativity, solve problems, and have fun
        </p>
      </div>

      <div className="mx-auto flex max-w-2xl justify-center mb-20">
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

      {/* About Me */}
      <div className="mx-auto max-w-3xl font-serif">
        <h2 className="text-4xl font-medium mb-12 text-center tracking-wide">About Me</h2>

        <div className="space-y-12">
          {/* Education */}
          <section>
            <h3 className="text-2xl font-medium mb-4 text-primary">Education</h3>
            <div className="space-y-4 text-lg leading-relaxed">
              <div>
                <p className="font-semibold">Columbia University Journalism School</p>
                <p className="text-muted-foreground">Publishing Course, Summer 2023</p>
              </div>
              <div>
                <p className="font-semibold">The Ohio State University</p>
                <p className="text-muted-foreground">B.A. English, Minor in Military History, 2023</p>
                <p className="text-muted-foreground italic">Magna cum laude, University Honors</p>
              </div>
              <div>
                <p className="font-semibold">University of Seville</p>
                <p className="text-muted-foreground">Study Abroad, Summer 2022</p>
              </div>
              <div>
                <p className="font-semibold">Pittsburgh Central Catholic High School</p>
                <p className="text-muted-foreground">Class of 2019</p>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section>
            <h3 className="text-2xl font-medium mb-4 text-primary">Experience</h3>
            <div className="space-y-6 text-lg leading-relaxed">
              <div>
                <p className="font-semibold">Editorial Associate & Builder @ <a href="https://www.merit.systems/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Merit Systems</a></p>
                <p className="text-muted-foreground">2024 – 2026</p>
                <p className="mt-1">Design, typesetting, and editorial work for company communications and <a href="https://github.com/briansproule20/merit-manifesto" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-2">company manifesto</a></p>
                <p className="mt-1">AI app development for Echo. Built analytical tools to identify platform gaps</p>
              </div>
              <div>
                <p className="font-semibold">English Teacher @ Boyd H. Anderson High School</p>
                <p className="text-muted-foreground">2023 – 2024</p>
                <p className="mt-1">AP Language, Cambridge English, and IB English. Set school record for AP Lang pass rate. Raised FAST ELA scores 32%</p>
              </div>
              <div>
                <p className="font-semibold">Writer @ Recurrent Ventures</p>
                <p className="text-muted-foreground">2023</p>
                <p className="mt-1">Wrote essays on international geopolitical conflict</p>
              </div>
              <div>
                <p className="font-semibold">Editorial & Journals Intern @ Ohio State University Press</p>
                <p className="text-muted-foreground">2021 – 2023</p>
                <p className="mt-1">Line-edited and typeset 32 manuscripts. Managed social media for five scholarly journals</p>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section>
            <h3 className="text-2xl font-medium mb-4 text-primary">Projects</h3>
            <div className="space-y-4 text-lg leading-relaxed">
              <div>
                <Link href="/apps" className="font-semibold hover:text-primary transition-colors">Echo App Building</Link>
                <p className="mt-1">AI-powered apps with usage-based billing</p>
                <ul className="mt-2 ml-4 space-y-1 text-base">
                  <li><a href="https://trivwiz.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Trivia Wizard</a> — trivia app development</li>
                  <li><a href="https://litparlor.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Lit Parlor</a> — literary discovery and tech ed platform</li>
                  <li><a href="https://bigcorpinc.company" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Big Corp Inc.</a> — corporate satire</li>
                  <li><a href="https://iwb-one.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Interstellar Weather Bureau</a> — NASA APIs and satirical weatherman</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">White Horse Mountain Home</p>
                <p className="mt-1">Branding, design, and digital marketing</p>
              </div>
              <div>
                <p className="font-semibold">3D Modeling</p>
                <p className="mt-1">Design, printing, and prototyping via Bambu Labs</p>
              </div>
              <div>
                <p className="font-semibold">URSA MARIS</p>
                <p className="mt-1">Tethered, sensor-heavy survey class ROV designed to execute precise transects of the sea floor, collect sensory data for bathymetric visualizations, capture stable video of marine wildlife, and perform seawall and underwater infrastructure analysis</p>
              </div>
              <p className="mt-8 border-t border-border pt-8 italic">
                Building small, light weight apps that combine AI with thoughtful design. No subscriptions,
                ever, only pay for what you use. Think freely, be creative, build cool things, learn, have fun, and be nice.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/deck" className="w-full max-w-md">
            <MovingBorderButton
              as="div"
              borderRadius="1rem"
              containerClassName="h-14"
              className="gap-2"
            >
              <Presentation className="size-5" />
              View My Professional Deck
            </MovingBorderButton>
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
