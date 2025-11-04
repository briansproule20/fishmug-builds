'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Home, Video, Image as ImageIcon, MessageSquare, ChevronDown, Sparkles } from 'lucide-react';
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
  const [aiOpen, setAiOpen] = useState(true);

  const aiNavItems = [
    { href: '/ai', label: 'AI Home', icon: Sparkles },
    { href: '/chat', label: 'Chat', icon: MessageSquare },
    { href: '/video', label: 'Video Generation', icon: Video },
    { href: '/image', label: 'Image Generation', icon: ImageIcon },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:mr-2">
          <Menu className="size-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>
            Access different features of fishmug builds
          </SheetDescription>
        </SheetHeader>
        <nav className="mt-8 flex flex-col space-y-2">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-900 font-semibold transition-colors hover:bg-gray-100"
          >
            <Home className="size-4" />
            <span>Home</span>
          </Link>

          <Collapsible open={aiOpen} onOpenChange={setAiOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-gray-900 font-semibold transition-colors hover:bg-gray-100">
              <span>AI</span>
              <ChevronDown className={`size-4 transition-transform ${aiOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-4 mt-2 space-y-1">
              {aiNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-gray-700 transition-colors hover:bg-gray-100"
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
