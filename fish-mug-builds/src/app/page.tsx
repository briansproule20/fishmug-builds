import { FolderOpen, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        <Card className="flex flex-col transition-all hover:shadow-xl">
          <CardHeader>
            <div className="mb-4 flex items-center justify-center rounded-lg bg-secondary p-4 w-fit">
              <FolderOpen className="size-10 text-primary" />
            </div>
            <CardTitle className="text-3xl">App Directory</CardTitle>
            <CardDescription className="text-lg">
              Browse and explore all available applications
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

        <Card className="flex flex-col transition-all hover:shadow-xl">
          <CardHeader>
            <div className="mb-4 flex items-center justify-center rounded-lg bg-accent p-4 w-fit">
              <Sparkles className="size-10 text-accent-foreground" />
            </div>
            <CardTitle className="text-3xl">Echo Studio</CardTitle>
            <CardDescription className="text-lg">
              explore{' '}
              <a
                href="https://echo.merit.systems/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Echo
              </a>{' '}
              chat, image, and video templates
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Link href="/ai">
              <Button className="w-full" size="lg">
                <Sparkles className="mr-2 size-5" />
                Enter Echo Studio
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
}
