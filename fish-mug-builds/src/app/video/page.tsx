/**
 * Next.js Video Generation Template with Echo SDK
 *
 * This template demonstrates how to build an AI video generation app using:
 * - Echo SDK for authentication and token management
 * - Google Veo models for video generation
 * - Next.js App Router for server-side rendering
 *
 * Key features:
 * 1. Authentication: Automatic login/logout with Echo SDK
 * 2. Video Generation: Support for Veo 3 Fast model
 * 3. Duration Control: Adjustable video length (1-60 seconds)
 * 4. History: Persistent video gallery with download/copy actions
 * 5. Responsive Design: Works on desktop and mobile
 */

import { isSignedIn } from '@/echo';
import VideoGenerator from '@/components/video-generator';
import { EchoAccount } from '@/components/echo-account-next';

export default async function VideoPage() {
  const _isSignedIn = await isSignedIn();

  return (
    <div className="flex flex-col h-screen p-2 sm:p-4 max-w-6xl mx-auto">
      {/* Main video generation interface */}
      <div className="relative">
        <VideoGenerator />

        {/* Overlay when not signed in */}
        {!_isSignedIn && (
          <div className="absolute inset-0 backdrop-blur-[2px] bg-white/30 flex items-center justify-center rounded-xl border border-gray-300">
            <EchoAccount />
          </div>
        )}
      </div>
    </div>
  );
}
