'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Home, FolderOpen, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function NavigationMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:mr-2">
          <Menu className="size-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-card">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>
            ah, i used to be an adventurer like you...
          </SheetDescription>
        </SheetHeader>
        <nav className="mt-8 flex flex-col space-y-2">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-foreground font-semibold transition-colors hover:bg-secondary"
          >
            <Home className="size-4" />
            <span>Home</span>
          </Link>

          <Link
            href="/apps"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-foreground font-semibold transition-colors hover:bg-secondary"
          >
            <FolderOpen className="size-4" />
            <span>Apps</span>
          </Link>
        </nav>

        <div className="mt-8 border-t border-border pt-6 px-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Elsewhere</p>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/briansproule20"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex size-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              <Github className="size-5" />
            </a>
            <a
              href="https://x.com/fishmug20"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="flex size-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              <XIcon className="size-[1.1rem]" />
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
