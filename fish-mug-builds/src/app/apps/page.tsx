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
          Explore what I've built to spark creativity, solve problems, and have fun:
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
            <DialogHeader className="text-left">
              <DialogTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                {selectedApp?.icon}
                {selectedApp?.title || selectedApp?.name}
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base text-left">
                {selectedApp?.modalInfo?.fullDescription}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {selectedApp?.modalInfo?.features && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Features</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm sm:text-base">
                    {selectedApp.modalInfo.features.map((feature: string, i: number) => (
                      <li key={i}>{feature}</li>
                    ))}
                    {selectedApp?.modalInfo?.additionalLinks?.map((link: any, i: number) => (
                      <li key={`link-${i}`}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors underline decoration-primary/30 underline-offset-2"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex flex-wrap gap-2 sm:gap-3 pt-4">
                {selectedApp?.modalInfo?.liveUrl && (
                  <a
                    href={selectedApp.modalInfo.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 sm:px-4 text-primary-foreground hover:bg-primary/90 transition-colors text-sm"
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
                    className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 sm:px-4 text-foreground hover:bg-secondary transition-colors text-sm"
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

const ShirtslopPreview = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 items-center justify-center">
    <img
      src="/app-icons/shirtslop.png"
      alt="Shirtslop"
      className="size-24 object-contain"
    />
  </div>
);

const BigCorpIncPreview = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 items-center justify-center flex-col gap-3">
    <img
      src="/app-icons/bigcorpinc.png"
      alt="Big Corp Inc"
      className="size-16 object-contain"
    />
    <p className="font-semibold text-foreground text-xs text-center px-4">
      Moving Forward, Together, Towards More Forward™
    </p>
  </div>
);

const LitParlorPreview = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 items-center justify-center">
    <img
      src="/app-icons/litparlor-logo.png"
      alt="LitParlor"
      className="size-32 object-contain"
    />
  </div>
);

const HistoryTutorPreview = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 items-center justify-center">
    <img
      src="/app-icons/history-tutor-chat.png"
      alt="History Tutor"
      className="size-24 object-contain"
    />
  </div>
);

const CaseStudyPreview = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 items-center justify-center">
    <img
      src="/app-icons/casestudy-favicon.png"
      alt="Case Study"
      className="size-24 object-contain"
    />
  </div>
);

const CodeExplainerPreview = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 items-center justify-center">
    <img
      src="/app-icons/code-explainer.png"
      alt="Code Explainer"
      className="size-24 object-contain"
    />
  </div>
);

const ColorForgePreview = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 items-center justify-center">
    <img
      src="/app-icons/color-forge.png"
      alt="ColorForge"
      className="size-24 object-contain"
    />
  </div>
);

const ArtifexPreview = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/40 to-primary/60 items-center justify-center">
    <img
      src="/app-icons/Artifex_Favicon.png"
      alt="Artifex"
      className="size-24 object-contain"
    />
  </div>
);

const AphorizePreview = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 items-center justify-center">
    <img
      src="/app-icons/aphorize-favicon.png"
      alt="Aphorize"
      className="size-24 object-contain"
    />
  </div>
);

const SlopShopPreview = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 items-center justify-center">
    <img
      src="/app-icons/slopshop favicon.png"
      alt="Slop Shop"
      className="size-24 object-contain"
    />
  </div>
);

const ProofOfIntelligencePreview = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 items-center justify-center">
    <img
      src="/app-icons/poic-favicon.png"
      alt="Proof of Intelligence Mint"
      className="size-24 object-contain"
    />
  </div>
);

const HeyBarkeepPreview = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 items-center justify-center">
    <img
      src="/app-icons/hey-bartender favicon.png"
      alt="Hey Barkeep"
      className="size-24 object-contain"
    />
  </div>
);

const YesChefPreview = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 items-center justify-center">
    <img
      src="/app-icons/yes-chef favicon.png"
      alt="Yes Chef"
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
    title: "Shirtslop",
    description: "From image to shirt faster than you can say SLOP",
    header: <ShirtslopPreview />,
    icon: <img src="/app-icons/shirtslop.png" alt="Shirtslop" className="h-4 w-4" />,
    modalInfo: {
      fullDescription: "The fastest way to turn your images into custom shirts. Upload or create, preview, and order—faster than you can say SLOP.",
      features: [
        "Lightning-fast image to shirt conversion",
        "Real-time preview on shirt mockups",
        "Multiple shirt styles and colors",
        "High-quality print production",
        "Simple ordering process",
      ],
      liveUrl: "https://www.shirtslop.com/",
      githubUrl: "https://github.com/rsproule/shirtslop",
    },
  },
  {
    title: "Case Study",
    description: "AI-powered law school companion for mastering case law and legal concepts",
    header: <CaseStudyPreview />,
    icon: <img src="/app-icons/casestudy-favicon.png" alt="Case Study" className="h-4 w-4" />,
    modalInfo: {
      fullDescription: "AI-powered law school companion that helps you master case law and legal concepts through interactive learning. Upload your materials or access millions of legal cases to enhance your legal education.",
      features: [
        "Document analysis with AI-powered case briefs",
        "Practice quizzes with instant feedback",
        "Auto-generated flashcards for legal concepts",
        "Case library with millions of legal cases",
        "Issue spotting and IRAC framework practice",
        "Legal chat powered by Claude AI",
      ],
      liveUrl: "https://case-study-rho-plum.vercel.app/",
      githubUrl: "https://github.com/briansproule20/case-study",
    },
  },
  {
    title: "LitParlor",
    description: "Transform long-form narratives into digestible insights",
    header: <LitParlorPreview />,
    icon: <img src="/app-icons/litparlor.png" alt="LitParlor" className="h-4 w-4" />,
    modalInfo: {
      fullDescription: "Transform lengthy written content into accessible, condensed summaries. LitParlor helps you extract and understand the main points from long-form narratives quickly and efficiently.",
      features: [
        "AI-powered text summarization",
        "Extract key insights from long-form content",
        "Fast and accurate processing",
        "Clean, intuitive interface",
        "Support for various content types",
      ],
      liveUrl: "https://litparlor.com",
      githubUrl: "https://github.com/briansproule20/lit-parlor",
      additionalLinks: [
        { label: "Literary Movements", url: "https://www.litparlor.com/lit-movements" },
        { label: "Glossary of Terms", url: "https://www.litparlor.com/glossary" },
      ],
    },
  },
  {
    title: "History Tutor",
    description: "Explore historical context, varying perspectives, and how our world was shaped",
    header: <HistoryTutorPreview />,
    icon: <img src="/app-icons/history-tutor-chat.png" alt="History Tutor" className="h-4 w-4" />,
    modalInfo: {
      fullDescription: "Explore historical context, varying perspectives, and how the world around us was shaped. History Tutor by LitParlor helps you understand pivotal moments through comprehensive analysis and multiple viewpoints.",
      features: [
        "Interactive historical exploration",
        "Multiple perspectives on historical events",
        "Contextual analysis of key moments",
        "Educational AI-powered discussions",
        "Deep dive into world history",
      ],
      liveUrl: "https://historytutor.litparlor.com/",
      githubUrl: "https://github.com/briansproule20/historytutor",
    },
  },
  {
    title: "Code Explainer",
    description: "Paste code snippets, get plain English explanations instantly",
    header: <CodeExplainerPreview />,
    icon: <img src="/app-icons/code-explainer.png" alt="Code Explainer" className="h-4 w-4" />,
    modalInfo: {
      fullDescription: "Paste code snippets and receive clear, straightforward explanations in plain English. Perfect for learning new languages, understanding unfamiliar syntax, or quickly documenting code.",
      features: [
        "Instant code explanations in plain English",
        "Support for multiple programming languages",
        "Clean, simple interface",
        "Fast AI-powered analysis",
        "Great for learning and documentation",
      ],
      liveUrl: "https://code-explainer-nu.vercel.app",
      githubUrl: "https://github.com/briansproule20/code-explainer",
    },
  },
];

const moreApps = [
  {
    title: "ColorForge",
    description: "AI-powered color palette generator using advanced color theory",
    header: <ColorForgePreview />,
    icon: <img src="/app-icons/color-forge.png" alt="ColorForge" className="h-4 w-4" />,
    modalInfo: {
      fullDescription: "AI-powered color palette generator that creates beautiful, harmonious color schemes for any project. Generate palettes from text descriptions or images using advanced color theory.",
      features: [
        "AI-powered palette generation",
        "Text-based palette creation from descriptions",
        "Image upload for color extraction",
        "Interactive Poline playground",
        "Save and manage your palettes",
        "Advanced color theory algorithms",
      ],
      liveUrl: "https://color-forge-rust.vercel.app",
      githubUrl: "https://github.com/briansproule20/color-forge",
    },
  },
  {
    title: "Yes Chef",
    description: "AI-powered culinary assistant for recipes and cooking guidance",
    header: <YesChefPreview />,
    icon: <img src="/app-icons/yes-chef favicon.png" alt="Yes Chef" className="h-4 w-4" />,
    modalInfo: {
      fullDescription: "Your AI-powered culinary assistant providing recipe suggestions, alterations, and cooking guidance. Chat with an expert chef assistant to discover new dishes, learn cooking techniques, and perfect your culinary skills. The cousin app of Hey Barkeep.",
      features: [
        "AI-powered recipe recommendations and alterations",
        "Interactive cooking advice and guidance",
        "Chat-based interface for easy conversation",
        "Secure authentication with Echo integration",
        "Personalized recipe suggestions",
        "Expert culinary knowledge at your fingertips",
      ],
      liveUrl: "https://yeschef-carrot.vercel.app/",
      githubUrl: "https://github.com/briansproule20/yeschef",
    },
  },
  {
    title: "Aphorize",
    description: "Find and create memorable quotes with AI, turn them into beautiful posters",
    header: <AphorizePreview />,
    icon: <img src="/app-icons/aphorize-favicon.png" alt="Aphorize" className="h-4 w-4" />,
    modalInfo: {
      fullDescription: "Find and create memorable quotes with AI, then turn them into beautiful posters. Discover inspirational quotes or generate your own, and transform them into shareable visual content.",
      features: [
        "AI-powered quote discovery",
        "Generate custom quotes with AI",
        "Create beautiful poster designs",
        "Extensive quote library",
        "Export and share creations",
      ],
      liveUrl: "https://aphorizequotes.vercel.app",
      githubUrl: "https://github.com/briansproule20/aphorize",
    },
  },
  {
    title: "Proof of Intelligence Mint",
    description: "Blockchain trivia game on Base powered by x402",
    header: <ProofOfIntelligencePreview />,
    icon: <img src="/app-icons/poic-favicon.png" alt="Proof of Intelligence Mint" className="h-4 w-4" />,
    modalInfo: {
      fullDescription: "A blockchain-based trivia game on the Base network where players answer AI-generated questions to earn POIC cryptocurrency tokens. Wrapped in satirical dystopian framing, it's a straightforward play-to-earn trivia experience.",
      features: [
        "AI-powered trivia questions by Claude Sonnet 4.5",
        "Earn 5,000 POIC tokens per correct answer",
        "Built on Base blockchain network",
        "Wallet integration (Coinbase, MetaMask, WalletConnect)",
        "Optional automated Intelligence Miner Agent",
        "Dystopian satire meets blockchain trivia",
      ],
      liveUrl: "https://poim.io/",
      githubUrl: "https://github.com/briansproule20/proof-of-intelligence-mint",
    },
  },
  {
    title: "Slop Shop",
    description: "The nano banana to gift pipeline—Shirtslop's little brother for custom gifts",
    header: <SlopShopPreview />,
    icon: <img src="/app-icons/slopshop favicon.png" alt="Slop Shop" className="h-4 w-4" />,
    modalInfo: {
      fullDescription: "The nano banana to gift pipeline. Slop Shop is Shirtslop's little brother, bringing the same fast custom printing experience to a wide range of gifts and products.",
      features: [
        "Fast custom gift creation",
        "Wide variety of product options",
        "Real-time preview on product mockups",
        "High-quality print production",
        "Simple ordering process",
      ],
      liveUrl: "https://www.theslopshop.app/",
      githubUrl: "https://github.com/briansproule20/slop-shop",
      additionalLinks: [
        { label: "Slop Shop Store", url: "https://slopshop-app.myshopify.com/" },
      ],
    },
  },
  {
    title: "Big Corp Inc",
    description: "Business is our Business™—leveraging synergy to synergize leverage",
    header: <BigCorpIncPreview />,
    icon: <img src="/app-icons/bigcorpinc.png" alt="Big Corp Inc" className="h-4 w-4" />,
    modalInfo: {
      fullDescription: "Big Corp Inc: where business is our business. We leverage synergy to synergize leverage, monetize paradigms, and empower dynamic deliverables through cutting-edge buzzword integration. Moving Forward, Together, Towards More Forward™",
      features: [
        "Synergy-focused services that synergize leverage",
        "Scalable paradigm ecosystem for dynamic deliverables",
        "Cross-functional innovation matrix alignment",
        "Corporate-branded apparel solutions for enterprise stakeholders",
        "Cutting-edge buzzword integration technology",
        "Strategic forward-movement initiatives",
      ],
      liveUrl: "https://www.bigcorpinc.company/",
      githubUrl: "https://github.com/briansproule20/big-corp-inc",
    },
  },
  {
    title: "Hey Barkeep",
    description: "AI-powered bartender for cocktail recipes and mixology advice",
    header: <HeyBarkeepPreview />,
    icon: <img src="/app-icons/hey-bartender favicon.png" alt="Hey Barkeep" className="h-4 w-4" />,
    modalInfo: {
      fullDescription: "Your AI-powered bartender providing cocktail recipes and expert mixology guidance. Chat with a knowledgeable bartender assistant to discover new drinks, learn mixing techniques, and perfect your cocktail craft.",
      features: [
        "AI-powered cocktail recipe recommendations",
        "Interactive mixology advice and guidance",
        "Chat-based interface for easy conversation",
        "Secure authentication with Echo integration",
        "Personalized cocktail suggestions",
        "Expert bartending knowledge at your fingertips",
      ],
      liveUrl: "https://hey-barkeep.vercel.app/",
      githubUrl: "https://github.com/briansproule20/hey-barkeep",
    },
  },
];

const allApps = [
  {
    name: "Astrologer's Almanac",
    icon: <img src="/app-icons/astrology favicon.png" alt="Astrologer's Almanac" className="size-8" />,
    href: "https://astrologers-almanac.vercel.app/",
    modalInfo: {
      fullDescription: "An AI-powered astrological guidance platform providing personalized cosmic insights. Discover your cosmic path through daily horoscopes, birth chart analysis, and celestial guidance tailored to your astrological profile.",
      features: [
        "Personalized astrological insights powered by AI",
        "Daily horoscopes and cosmic forecasts",
        "Detailed birth chart analysis and interpretations",
        "Celestial guidance and astrological counsel",
        "Secure authentication with Echo integration",
        "Chat-based interface for cosmic guidance",
      ],
      liveUrl: "https://astrologers-almanac.vercel.app/",
      githubUrl: "https://github.com/briansproule20/zodiac-lightning",
    },
  },
  {
    name: "Aphorize",
    icon: <img src="/app-icons/aphorize-favicon.png" alt="Aphorize" className="size-8" />,
    href: "https://aphorizequotes.vercel.app",
    modalInfo: {
      fullDescription: "Find and create memorable quotes with AI, then turn them into beautiful posters. Discover inspirational quotes or generate your own, and transform them into shareable visual content.",
      features: [
        "AI-powered quote discovery",
        "Generate custom quotes with AI",
        "Create beautiful poster designs",
        "Extensive quote library",
        "Export and share creations",
      ],
      liveUrl: "https://aphorizequotes.vercel.app",
      githubUrl: "https://github.com/briansproule20/aphorize",
    },
  },
  {
    name: "Artifex",
    icon: <img src="/app-icons/Artifex_Favicon.png" alt="Artifex" className="size-8" />,
    href: "https://artifex-art.vercel.app/",
    modalInfo: {
      fullDescription: "An interactive AI art critic and co-creator. Chat with 10 distinct AI art critics about your work, artistic movements, or creative ideas—and generate new artwork in dozens of styles.",
      features: [
        "10 unique AI critic personas with distinct perspectives",
        "AI-powered art generation in multiple styles",
        "Museum collection exploration",
        "Deep art critique and analysis",
        "Creative collaboration with AI",
      ],
      liveUrl: "https://artifex-art.vercel.app/",
      githubUrl: "https://github.com/briansproule20/artifex",
    },
  },
  {
    name: "Big Corp Inc",
    icon: <img src="/app-icons/bigcorpinc.png" alt="Big Corp Inc" className="size-8" />,
    href: "https://www.bigcorpinc.company/",
    modalInfo: {
      fullDescription: "Big Corp Inc: where business is our business. We leverage synergy to synergize leverage, monetize paradigms, and empower dynamic deliverables through cutting-edge buzzword integration. Moving Forward, Together, Towards More Forward™",
      features: [
        "Synergy-focused services that synergize leverage",
        "Scalable paradigm ecosystem for dynamic deliverables",
        "Cross-functional innovation matrix alignment",
        "Corporate-branded apparel solutions for enterprise stakeholders",
        "Cutting-edge buzzword integration technology",
        "Strategic forward-movement initiatives",
      ],
      liveUrl: "https://www.bigcorpinc.company/",
      githubUrl: "https://github.com/briansproule20/big-corp-inc",
    },
  },
  { name: "Books", icon: <FolderOpen className="size-8" />, href: "#" },
  { name: "Calendar", icon: <Code className="size-8" />, href: "#" },
  {
    name: "Case Study",
    icon: <img src="/app-icons/casestudy-favicon.png" alt="Case Study" className="size-8" />,
    href: "https://case-study-rho-plum.vercel.app/",
    modalInfo: {
      fullDescription: "AI-powered law school companion that helps you master case law and legal concepts through interactive learning. Upload your materials or access millions of legal cases to enhance your legal education.",
      features: [
        "Document analysis with AI-powered case briefs",
        "Practice quizzes with instant feedback",
        "Auto-generated flashcards for legal concepts",
        "Case library with millions of legal cases",
        "Issue spotting and IRAC framework practice",
        "Legal chat powered by Claude AI",
      ],
      liveUrl: "https://case-study-rho-plum.vercel.app/",
      githubUrl: "https://github.com/briansproule20/case-study",
    },
  },
  {
    name: "Code Explainer",
    icon: <img src="/app-icons/code-explainer.png" alt="Code Explainer" className="size-8" />,
    href: "https://code-explainer-nu.vercel.app",
    modalInfo: {
      fullDescription: "Paste code snippets and receive clear, straightforward explanations in plain English. Perfect for learning new languages, understanding unfamiliar syntax, or quickly documenting code.",
      features: [
        "Instant code explanations in plain English",
        "Support for multiple programming languages",
        "Clean, simple interface",
        "Fast AI-powered analysis",
        "Great for learning and documentation",
      ],
      liveUrl: "https://code-explainer-nu.vercel.app",
      githubUrl: "https://github.com/briansproule20/code-explainer",
    },
  },
  { name: "Code Tools", icon: <Code className="size-8" />, href: "#" },
  {
    name: "ColorForge",
    icon: <img src="/app-icons/color-forge.png" alt="ColorForge" className="size-8" />,
    href: "https://color-forge-rust.vercel.app",
    modalInfo: {
      fullDescription: "AI-powered color palette generator that creates beautiful, harmonious color schemes for any project. Generate palettes from text descriptions or images using advanced color theory.",
      features: [
        "AI-powered palette generation",
        "Text-based palette creation from descriptions",
        "Image upload for color extraction",
        "Interactive Poline playground",
        "Save and manage your palettes",
        "Advanced color theory algorithms",
      ],
      liveUrl: "https://color-forge-rust.vercel.app",
      githubUrl: "https://github.com/briansproule20/color-forge",
    },
  },
  { name: "Collab", icon: <MessageSquare className="size-8" />, href: "#" },
  { name: "Contacts", icon: <FolderOpen className="size-8" />, href: "#" },
  { name: "Crypto", icon: <Zap className="size-8" />, href: "#" },
  { name: "Design Kit", icon: <Palette className="size-8" />, href: "#" },
  {
    name: "Echo Studio",
    icon: <img src="/logo/light.svg" alt="Echo Studio" className="size-8" />,
    href: "https://www.fishmug.dev/ai",
  },
  { name: "Email", icon: <MessageSquare className="size-8" />, href: "#" },
  { name: "Files", icon: <FolderOpen className="size-8" />, href: "#" },
  { name: "Finance", icon: <Code className="size-8" />, href: "#" },
  { name: "Fitness", icon: <Zap className="size-8" />, href: "#" },
  { name: "Games", icon: <Palette className="size-8" />, href: "#" },
  {
    name: "Hey Barkeep",
    icon: <img src="/app-icons/hey-bartender favicon.png" alt="Hey Barkeep" className="size-8" />,
    href: "https://hey-barkeep.vercel.app/",
    modalInfo: {
      fullDescription: "Your AI-powered bartender providing cocktail recipes and expert mixology guidance. Chat with a knowledgeable bartender assistant to discover new drinks, learn mixing techniques, and perfect your cocktail craft.",
      features: [
        "AI-powered cocktail recipe recommendations",
        "Interactive mixology advice and guidance",
        "Chat-based interface for easy conversation",
        "Secure authentication with Echo integration",
        "Personalized cocktail suggestions",
        "Expert bartending knowledge at your fingertips",
      ],
      liveUrl: "https://hey-barkeep.vercel.app/",
      githubUrl: "https://github.com/briansproule20/hey-barkeep",
    },
  },
  {
    name: "History Tutor",
    icon: <img src="/app-icons/history-tutor-chat.png" alt="History Tutor" className="size-8" />,
    href: "https://historytutor.litparlor.com/",
    modalInfo: {
      fullDescription: "Explore historical context, varying perspectives, and how the world around us was shaped. History Tutor by LitParlor helps you understand pivotal moments through comprehensive analysis and multiple viewpoints.",
      features: [
        "Interactive historical exploration",
        "Multiple perspectives on historical events",
        "Contextual analysis of key moments",
        "Educational AI-powered discussions",
        "Deep dive into world history",
      ],
      liveUrl: "https://historytutor.litparlor.com/",
      githubUrl: "https://github.com/briansproule20/historytutor",
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
  {
    name: "Yes Chef",
    icon: <img src="/app-icons/yes-chef favicon.png" alt="Yes Chef" className="size-8" />,
    href: "https://yeschef-carrot.vercel.app/",
    modalInfo: {
      fullDescription: "Your AI-powered culinary assistant providing recipe suggestions, alterations, and cooking guidance. Chat with an expert chef assistant to discover new dishes, learn cooking techniques, and perfect your culinary skills. The cousin app of Hey Barkeep.",
      features: [
        "AI-powered recipe recommendations and alterations",
        "Interactive cooking advice and guidance",
        "Chat-based interface for easy conversation",
        "Secure authentication with Echo integration",
        "Personalized recipe suggestions",
        "Expert culinary knowledge at your fingertips",
      ],
      liveUrl: "https://yeschef-carrot.vercel.app/",
      githubUrl: "https://github.com/briansproule20/yeschef",
    },
  },
  {
    name: "LitParlor",
    icon: <img src="/app-icons/litparlor.png" alt="LitParlor" className="size-8" />,
    href: "https://litparlor.com",
    modalInfo: {
      fullDescription: "Transform lengthy written content into accessible, condensed summaries. LitParlor helps you extract and understand the main points from long-form narratives quickly and efficiently.",
      features: [
        "AI-powered text summarization",
        "Extract key insights from long-form content",
        "Fast and accurate processing",
        "Clean, intuitive interface",
        "Support for various content types",
      ],
      liveUrl: "https://litparlor.com",
      githubUrl: "https://github.com/briansproule20/lit-parlor",
      additionalLinks: [
        { label: "Literary Movements", url: "https://www.litparlor.com/lit-movements" },
        { label: "Glossary of Terms", url: "https://www.litparlor.com/glossary" },
      ],
    },
  },
  { name: "Music", icon: <Sparkles className="size-8" />, href: "#" },
  { name: "News", icon: <FolderOpen className="size-8" />, href: "#" },
  { name: "Notes", icon: <FolderOpen className="size-8" />, href: "#" },
  { name: "Photos", icon: <Image className="size-8" />, href: "#" },
  {
    name: "Proof of Intelligence Mint",
    icon: <img src="/app-icons/poic-favicon.png" alt="Proof of Intelligence Mint" className="size-8" />,
    href: "https://poim.io/",
    modalInfo: {
      fullDescription: "A blockchain-based trivia game on the Base network where players answer AI-generated questions to earn POIC cryptocurrency tokens. Wrapped in satirical dystopian framing, it's a straightforward play-to-earn trivia experience.",
      features: [
        "AI-powered trivia questions by Claude Sonnet 4.5",
        "Earn 5,000 POIC tokens per correct answer",
        "Built on Base blockchain network",
        "Wallet integration (Coinbase, MetaMask, WalletConnect)",
        "Optional automated Intelligence Miner Agent",
        "Dystopian satire meets blockchain trivia",
      ],
      liveUrl: "https://poim.io/",
      githubUrl: "https://github.com/briansproule20/proof-of-intelligence-mint",
    },
  },
  {
    name: "Shirtslop",
    icon: <img src="/app-icons/shirtslop.png" alt="Shirtslop" className="size-8" />,
    href: "https://www.shirtslop.com/",
    modalInfo: {
      fullDescription: "The fastest way to turn your images into custom shirts. Upload or create, preview, and order—faster than you can say SLOP.",
      features: [
        "Lightning-fast image to shirt conversion",
        "Real-time preview on shirt mockups",
        "Multiple shirt styles and colors",
        "High-quality print production",
        "Simple ordering process",
      ],
      liveUrl: "https://www.shirtslop.com/",
      githubUrl: "https://github.com/rsproule/shirtslop",
    },
  },
  {
    name: "Slop Shop",
    icon: <img src="/app-icons/slopshop favicon.png" alt="Slop Shop" className="size-8" />,
    href: "https://www.theslopshop.app/",
    modalInfo: {
      fullDescription: "The nano banana to gift pipeline. Slop Shop is Shirtslop's little brother, bringing the same fast custom printing experience to a wide range of gifts and products.",
      features: [
        "Fast custom gift creation",
        "Wide variety of product options",
        "Real-time preview on product mockups",
        "High-quality print production",
        "Simple ordering process",
      ],
      liveUrl: "https://www.theslopshop.app/",
      githubUrl: "https://github.com/briansproule20/slop-shop",
      additionalLinks: [
        { label: "Slop Shop Store", url: "https://slopshop-app.myshopify.com/" },
      ],
    },
  },
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
];
