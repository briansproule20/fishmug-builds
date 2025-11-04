import SignInButton from '@/app/_components/echo/sign-in-button';
import { isSignedIn } from '@/echo';
import { Video, Image as ImageIcon, Sparkles, MessageSquare } from 'lucide-react';
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
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-4xl tracking-tight">
          AI Home
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600 text-lg">
          Choose your AI tool below to start creating
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col transition-all hover:shadow-lg">
          <CardHeader>
            <div className="mb-4 flex items-center justify-center rounded-lg bg-green-100 p-3 w-fit">
              <MessageSquare className="size-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">AI Chat</CardTitle>
            <CardDescription className="text-base">
              Have conversations with powerful AI assistants
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Link href="/chat">
              <Button className="w-full" size="lg">
                <Sparkles className="mr-2 size-4" />
                Start Chatting
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="flex flex-col transition-all hover:shadow-lg">
          <CardHeader>
            <div className="mb-4 flex items-center justify-center rounded-lg bg-purple-100 p-3 w-fit">
              <Video className="size-8 text-purple-600" />
            </div>
            <CardTitle className="text-2xl">Video Generation</CardTitle>
            <CardDescription className="text-base">
              Create stunning videos from text prompts and images
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Link href="/video">
              <Button className="w-full" size="lg">
                <Sparkles className="mr-2 size-4" />
                Generate Videos
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="flex flex-col transition-all hover:shadow-lg">
          <CardHeader>
            <div className="mb-4 flex items-center justify-center rounded-lg bg-blue-100 p-3 w-fit">
              <ImageIcon className="size-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Image Generation</CardTitle>
            <CardDescription className="text-base">
              Generate beautiful images from your imagination
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Link href="/image">
              <Button className="w-full" size="lg">
                <Sparkles className="mr-2 size-4" />
                Generate Images
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
