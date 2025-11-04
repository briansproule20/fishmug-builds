import SignInButton from '@/app/_components/echo/sign-in-button';
import { isSignedIn } from '@/echo';
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
  const signedIn = await isSignedIn();

  if (!signedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br p-4 dark:from-gray-900 dark:to-gray-800">
        <div className="w-full max-w-md space-y-8 text-center">
          <div>
            <h2 className="mt-6 font-bold text-3xl text-gray-900 tracking-tight dark:text-white">
              fishmug builds
            </h2>
            <p className="mt-2 text-gray-600 text-sm dark:text-gray-400">
              AI-powered applications and tools
            </p>
          </div>

          <div className="space-y-4">
            <SignInButton />

            <div className="text-gray-500 text-xs dark:text-gray-400">
              Secure authentication with built-in AI billing
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-16 text-center">
        <h1 className="mb-4 font-bold text-5xl tracking-tight">
          fishmug builds
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600 text-xl">
          Apps I've built to spark creativity, solve problems, and have fun.
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
            <CardTitle className="text-3xl">AI Studio</CardTitle>
            <CardDescription className="text-lg">
              Access powerful AI tools for creation and automation
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Link href="/ai">
              <Button className="w-full" size="lg">
                <Sparkles className="mr-2 size-5" />
                Enter AI Studio
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
