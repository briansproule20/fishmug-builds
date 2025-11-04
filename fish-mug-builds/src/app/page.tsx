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

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-16 text-center">
        <h1 className="mb-4 font-bold text-5xl tracking-tight">
          fishmug builds
        </h1>
        <p className="mx-auto max-w-2xl text-gray-500 text-lg">
          english lit grad turned dev
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-gray-600 text-xl">
          apps I've built to spark creativity, solve problems, and have fun
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        <Card className="flex flex-col transition-all hover:shadow-xl">
          <CardHeader>
            <div className="mb-4 flex items-center justify-center rounded-lg bg-orange-100 p-4 w-fit">
              <FolderOpen className="size-10 text-orange-600" />
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
            <div className="mb-4 flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 p-4 w-fit">
              <Sparkles className="size-10 text-purple-600" />
            </div>
            <CardTitle className="text-3xl">Echo Studio</CardTitle>
            <CardDescription className="text-lg">
              explore{' '}
              <a
                href="https://echo.merit.systems/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
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
  );
}
