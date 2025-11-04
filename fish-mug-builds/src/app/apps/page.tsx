'use client';
import { FolderOpen, Sparkles, Image, Video, MessageSquare, Palette, Code, Zap, X, ExternalLink, Github } from 'lucide-react';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function AppsPage() {
  const [selectedApp, setSelectedApp] = useState<any>(null);
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 font-bold text-4xl tracking-tight">
          App Directory
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
          explore what I've built to spark creativity and solve problems
        </p>
      </div>

      {/* Featured Bento Grids */}
      <div className="mb-20">
        <h2 className="mb-8 font-semibold text-2xl text-foreground">Featured Apps</h2>
        <BentoGrid className="mb-4">
          {featuredApps.map((item, i) => (
            <div
              key={i}
              onClick={() => item.modalInfo && setSelectedApp(item)}
              className={cn(
                i === 3 || i === 6 ? "md:col-span-2" : "",
                item.modalInfo && "cursor-pointer"
              )}
            >
              <BentoGridItem
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
                className="h-full"
              />
            </div>
          ))}
        </BentoGrid>

        <Dialog open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                {selectedApp?.icon}
                {selectedApp?.title || selectedApp?.name}
              </DialogTitle>
              <DialogDescription className="text-base">
                {selectedApp?.modalInfo?.fullDescription}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {selectedApp?.modalInfo?.features && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Features</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {selectedApp.modalInfo.features.map((feature: string, i: number) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex gap-3 pt-4">
                {selectedApp?.modalInfo?.liveUrl && (
                  <a
                    href={selectedApp.modalInfo.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="size-4" />
                    Visit Site
                  </a>
                )}
                {selectedApp?.modalInfo?.githubUrl && (
                  <a
                    href={selectedApp.modalInfo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-foreground hover:bg-secondary transition-colors"
                  >
                    <Github className="size-4" />
                    View Code
                  </a>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <BentoGrid>
          {moreApps.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>

      {/* Full App List */}
      <div>
        <h2 className="mb-8 font-semibold text-2xl text-foreground">All Apps</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allApps.map((app, i) => (
            app.modalInfo ? (
              <div
                key={i}
                onClick={() => setSelectedApp(app)}
                className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md cursor-pointer"
              >
                <div className="flex size-14 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                  {app.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-foreground text-sm leading-tight group-hover:text-primary transition-colors">
                    {app.name}
                  </h3>
                </div>
              </div>
            ) : (
              <a
                key={i}
                href={app.href}
                className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
              >
                <div className="flex size-14 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                  {app.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-foreground text-sm leading-tight group-hover:text-primary transition-colors">
                    {app.name}
                  </h3>
                </div>
              </a>
            )
          ))}
        </div>

        <div className="mt-16 text-center text-foreground/70 text-base leading-relaxed">
          <p>All my apps are open source.</p>
          <p className="mt-1">
            Find the code on{' '}
            <a
              href="https://github.com/briansproule20"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:text-primary/80 transition-colors underline decoration-primary/30 underline-offset-2"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-secondary to-muted"></div>
);

const TriviaWizardPreview = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 items-center justify-center">
    <img
      src="/app-icons/trivia-wizard.png"
      alt="Trivia Wizard"
      className="size-24 object-contain"
    />
  </div>
);

const featuredApps = [
  {
    title: "Trivia Wizard",
    description: "AI-powered trivia with ranks, profiles, and daily challenges",
    header: <TriviaWizardPreview />,
    icon: <img src="/app-icons/trivia-wizard.png" alt="Trivia Wizard" className="h-4 w-4" />,
    modalInfo: {
      fullDescription: "An AI-powered trivia game with ranking systems, player profiles, achievements, and daily challenges to test your knowledge.",
      features: [
        "AI-generated trivia questions",
        "Trivia ranks and leaderboards",
        "Player profiles with achievements",
        "Daily challenge mode",
        "Multiple difficulty levels",
      ],
      liveUrl: "https://www.trivwiz.com",
      githubUrl: "https://github.com/briansproule20/echo-trivia",
    },
  },
  {
    title: "Interstellar Weather Bureau",
    description: "300 years monitoring the cosmos across 400 million star systems",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 items-center justify-center">
      <img src="/app-icons/IWB-favicon.png" alt="Interstellar Weather Bureau" className="size-24 object-contain" />
    </div>,
    icon: <img src="/app-icons/IWB-favicon.png" alt="IWB" className="h-4 w-4" />,
    modalInfo: {
      fullDescription: "For 300 years across 400 million star systems, your weatherman has faithfully monitored the cosmos. Featuring the legendary Aetherscope visualization engine, track real-time conditions from Mercury's scorched surface to the outer solar system—powered by NASA and Open-Meteo APIs.",
      features: [
        "Real-time solar system weather data (NASA API)",
        "Earth weather forecasting (Open-Meteo API)",
        "Aetherscope cosmos visualization engine",
        "Spacecraft tracking across the void",
        "Planetary conditions monitoring",
        "300 years of service, 400 million star systems",
      ],
      liveUrl: "https://iwb-one.vercel.app/",
      githubUrl: "https://github.com/briansproule20/IWB",
    },
  },
  {
    title: "Image Generation",
    description: "Bring your visual ideas to life with AI",
    header: <Skeleton />,
    icon: <Image className="h-4 w-4 text-primary" />,
  },
  {
    title: "Video Creation",
    description: "Transform prompts and images into motion",
    header: <Skeleton />,
    icon: <Video className="h-4 w-4 text-primary" />,
  },
  {
    title: "Creative Studio",
    description: "A complete toolkit for bringing your creative projects to life",
    header: <Skeleton />,
    icon: <Palette className="h-4 w-4 text-primary" />,
  },
  {
    title: "Code Assistant",
    description: "Get help with coding challenges and solutions",
    header: <Skeleton />,
    icon: <Code className="h-4 w-4 text-primary" />,
  },
  {
    title: "Quick Tools",
    description: "Handy utilities for everyday tasks",
    header: <Skeleton />,
    icon: <Zap className="h-4 w-4 text-primary" />,
  },
];

const moreApps = [
  {
    title: "Text Editor",
    description: "Write and edit with powerful formatting tools",
    header: <Skeleton />,
    icon: <FolderOpen className="h-4 w-4 text-primary" />,
  },
  {
    title: "Design Tools",
    description: "Create stunning visuals and graphics",
    header: <Skeleton />,
    icon: <Palette className="h-4 w-4 text-primary" />,
  },
  {
    title: "Productivity Hub",
    description: "Organize tasks and boost your workflow",
    header: <Skeleton />,
    icon: <Zap className="h-4 w-4 text-primary" />,
  },
  {
    title: "Development Suite",
    description: "A comprehensive toolkit for developers building modern applications",
    header: <Skeleton />,
    icon: <Code className="h-4 w-4 text-primary" />,
  },
  {
    title: "Media Manager",
    description: "Organize and optimize your media files",
    header: <Skeleton />,
    icon: <Image className="h-4 w-4 text-primary" />,
  },
  {
    title: "Analytics",
    description: "Track and understand your data",
    header: <Skeleton />,
    icon: <Sparkles className="h-4 w-4 text-primary" />,
  },
  {
    title: "Collaboration Tools",
    description: "Work together seamlessly with your team on any project",
    header: <Skeleton />,
    icon: <MessageSquare className="h-4 w-4 text-primary" />,
  },
];

const allApps = [
  {
    name: "Trivia Wizard",
    icon: <img src="/app-icons/trivia-wizard.png" alt="Trivia Wizard" className="size-8" />,
    href: "https://www.trivwiz.com",
    modalInfo: {
      fullDescription: "An AI-powered trivia game with ranking systems, player profiles, achievements, and daily challenges to test your knowledge.",
      features: [
        "AI-generated trivia questions",
        "Trivia ranks and leaderboards",
        "Player profiles with achievements",
        "Daily challenge mode",
        "Multiple difficulty levels",
      ],
      liveUrl: "https://www.trivwiz.com",
      githubUrl: "https://github.com/briansproule20/echo-trivia",
    },
  },
  {
    name: "Interstellar Weather Bureau",
    icon: <img src="/app-icons/IWB-favicon.png" alt="IWB" className="size-8" />,
    href: "https://iwb-one.vercel.app/",
    modalInfo: {
      fullDescription: "For 300 years across 400 million star systems, your weatherman has faithfully monitored the cosmos. Featuring the legendary Aetherscope visualization engine, track real-time conditions from Mercury's scorched surface to the outer solar system—powered by NASA and Open-Meteo APIs.",
      features: [
        "Real-time solar system weather data (NASA API)",
        "Earth weather forecasting (Open-Meteo API)",
        "Aetherscope cosmos visualization engine",
        "Spacecraft tracking across the void",
        "Planetary conditions monitoring",
        "300 years of service, 400 million star systems",
      ],
      liveUrl: "https://iwb-one.vercel.app/",
      githubUrl: "https://github.com/briansproule20/IWB",
    },
  },
  { name: "Image Gen", icon: <Image className="size-8" />, href: "/image" },
  { name: "Video Gen", icon: <Video className="size-8" />, href: "/video" },
  { name: "AI Studio", icon: <Sparkles className="size-8" />, href: "/ai" },
  { name: "Code Tools", icon: <Code className="size-8" />, href: "#" },
  { name: "Design Kit", icon: <Palette className="size-8" />, href: "#" },
  { name: "Quick Tools", icon: <Zap className="size-8" />, href: "#" },
  { name: "Text Editor", icon: <FolderOpen className="size-8" />, href: "#" },
  { name: "Media Hub", icon: <Image className="size-8" />, href: "#" },
  { name: "Analytics", icon: <Sparkles className="size-8" />, href: "#" },
  { name: "Collab", icon: <MessageSquare className="size-8" />, href: "#" },
  { name: "Tasks", icon: <Zap className="size-8" />, href: "#" },
  { name: "Notes", icon: <FolderOpen className="size-8" />, href: "#" },
  { name: "Calendar", icon: <Code className="size-8" />, href: "#" },
  { name: "Files", icon: <FolderOpen className="size-8" />, href: "#" },
  { name: "Music", icon: <Sparkles className="size-8" />, href: "#" },
  { name: "Photos", icon: <Image className="size-8" />, href: "#" },
  { name: "Videos", icon: <Video className="size-8" />, href: "#" },
  { name: "Docs", icon: <FolderOpen className="size-8" />, href: "#" },
  { name: "Sheets", icon: <Code className="size-8" />, href: "#" },
  { name: "Slides", icon: <Palette className="size-8" />, href: "#" },
  { name: "Forms", icon: <MessageSquare className="size-8" />, href: "#" },
  { name: "Email", icon: <MessageSquare className="size-8" />, href: "#" },
  { name: "Contacts", icon: <FolderOpen className="size-8" />, href: "#" },
  { name: "Maps", icon: <Zap className="size-8" />, href: "#" },
  { name: "Weather", icon: <Sparkles className="size-8" />, href: "#" },
  { name: "News", icon: <FolderOpen className="size-8" />, href: "#" },
  { name: "Podcasts", icon: <Sparkles className="size-8" />, href: "#" },
  { name: "Books", icon: <FolderOpen className="size-8" />, href: "#" },
  { name: "Shopping", icon: <Zap className="size-8" />, href: "#" },
  { name: "Travel", icon: <Sparkles className="size-8" />, href: "#" },
  { name: "Health", icon: <Zap className="size-8" />, href: "#" },
  { name: "Fitness", icon: <Zap className="size-8" />, href: "#" },
  { name: "Finance", icon: <Code className="size-8" />, href: "#" },
  { name: "Banking", icon: <Code className="size-8" />, href: "#" },
  { name: "Invest", icon: <Sparkles className="size-8" />, href: "#" },
  { name: "Crypto", icon: <Zap className="size-8" />, href: "#" },
  { name: "Games", icon: <Palette className="size-8" />, href: "#" },
  { name: "Social", icon: <MessageSquare className="size-8" />, href: "#" },
];
