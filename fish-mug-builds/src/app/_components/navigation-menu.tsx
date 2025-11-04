'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Home, Video, Image as ImageIcon, MessageSquare, ChevronDown, Sparkles, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export function NavigationMenu() {
  const [open, setOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  const aiNavItems = [
    { href: '/ai', label: 'AI Home', icon: Sparkles },
    { href: '/chat', label: 'Chat', icon: MessageSquare },
    { href: '/image', label: 'Image Generation', icon: ImageIcon },
    { href: '/video', label: 'Video Generation', icon: Video },
  ];

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

          <Collapsible open={aiOpen} onOpenChange={setAiOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-foreground font-semibold transition-colors hover:bg-secondary">
              <div className="flex items-center gap-3">
                <Sparkles className="size-4" />
                <span>Echo Studio</span>
              </div>
              <ChevronDown className={`size-4 transition-transform ${aiOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-4 mt-2 space-y-1">
              {aiNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-muted-foreground transition-colors hover:bg-secondary"
                >
                  <item.icon className="size-4" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
