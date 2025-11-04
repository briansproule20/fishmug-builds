'use client';

import { EchoAccount } from '@/components/echo-account-next';
import { NavigationMenu } from './navigation-menu';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

interface HeaderProps {
  title?: string;
  className?: string;
  signedIn?: boolean;
}

const Header: FC<HeaderProps> = ({
  title = 'fishmug builds',
  className = '',
  signedIn = false,
}) => {
  const pathname = usePathname();

  // Check if current page is in the AI section
  const isAISection = ['/ai', '/chat', '/video', '/image'].some(path =>
    pathname.startsWith(path)
  );

  return (
    <header
      className={`border-b border-border bg-card shadow-sm ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <Image
                src="/fishmug-builds.png"
                alt="fishmug builds logo"
                width={40}
                height={40}
                className="transition-transform group-hover:scale-105"
              />
              <h1 className="cursor-pointer font-semibold text-foreground text-xl group-hover:text-muted-foreground transition-colors">
                {title}
              </h1>
            </Link>
          </div>

          <nav className="flex items-center space-x-2">
            {isAISection && <EchoAccount />}
            <NavigationMenu />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
