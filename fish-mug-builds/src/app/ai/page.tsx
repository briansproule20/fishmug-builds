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
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-4xl tracking-tight">
          What do you want to make?
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600 text-lg">
          Pick a tool and start creating
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col transition-all hover:shadow-lg">
          <CardHeader>
            <div className="mb-4 flex items-center justify-center rounded-lg bg-green-100 p-3 w-fit">
              <MessageSquare className="size-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Have a conversation</CardTitle>
            <CardDescription className="text-base">
              Ask questions, brainstorm ideas, write together
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Link href="/chat">
              <Button className="w-full" size="lg">
                <Sparkles className="mr-2 size-4" />
                Start chatting
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="flex flex-col transition-all hover:shadow-lg">
          <CardHeader>
            <div className="mb-4 flex items-center justify-center rounded-lg bg-blue-100 p-3 w-fit">
              <ImageIcon className="size-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Generate an image</CardTitle>
            <CardDescription className="text-base">
              Bring your ideas to life
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Link href="/image">
              <Button className="w-full" size="lg">
                <Sparkles className="mr-2 size-4" />
                Generate image
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="flex flex-col transition-all hover:shadow-lg">
          <CardHeader>
            <div className="mb-4 flex items-center justify-center rounded-lg bg-purple-100 p-3 w-fit">
              <Video className="size-8 text-purple-600" />
            </div>
            <CardTitle className="text-2xl">Make a video</CardTitle>
            <CardDescription className="text-base">
              From prompts and images to motion
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Link href="/video">
              <Button className="w-full" size="lg">
                <Sparkles className="mr-2 size-4" />
                Generate video
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mx-auto mt-16 max-w-3xl space-y-4 text-center">
        <p className="text-gray-600 text-sm leading-relaxed">
          Powered by{' '}
          <a
            href="https://echo.merit.systems/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
          >
            Merit Systems Echo
          </a>
          . Looking for more? There are{' '}
          <a
            href="https://echo.merit.systems/top-apps"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
          >
            hundreds of purpose-built apps in the Echo app store
          </a>
          .
        </p>
        <p className="text-gray-500 text-xs">
          One credit pool. All Echo apps. Never expires.
        </p>
      </div>
    </div>
  );
}
