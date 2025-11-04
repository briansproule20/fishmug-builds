import { isSignedIn } from '@/echo';
import Chat from '@/app/_components/chat';
import { EchoSignIn } from '@merit-systems/echo-next-sdk/client';

export default async function ChatPage() {
  const _isSignedIn = await isSignedIn();

  return (
    <div className="relative h-full">
      <Chat />

      {/* Overlay when not signed in */}
      {!_isSignedIn && (
        <div className="absolute inset-0 backdrop-blur-[2px] bg-white/30 flex items-center justify-center">
          <EchoSignIn />
        </div>
      )}
    </div>
  );
}
