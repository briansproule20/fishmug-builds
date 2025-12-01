'use client';

import { useState } from 'react';
import { Presentation, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CORRECT_PIN = '1912';

export default function DeckPage() {
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [showPin, setShowPin] = useState(false);

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPin(value);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === CORRECT_PIN) {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Incorrect PIN');
      setPin('');
    }
  };

  if (isUnlocked) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mb-4 flex items-center justify-center rounded-lg bg-secondary p-4 w-fit mx-auto">
              <Presentation className="size-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Access Granted</CardTitle>
            <CardDescription>
              Click below to view the portfolio deck
            </CardDescription>
          </CardHeader>
          <CardContent>
            <a href="/SprouleTechDeck.pdf" target="_blank" rel="noopener noreferrer">
              <Button className="w-full" size="lg">
                <Presentation className="mr-2 size-5" />
                View Portfolio Deck
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 flex items-center justify-center rounded-lg bg-secondary p-4 w-fit mx-auto">
            <Lock className="size-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Portfolio Deck</CardTitle>
          <CardDescription>
            Enter the 4-digit PIN to access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type={showPin ? 'text' : 'password'}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                value={pin}
                onChange={handlePinChange}
                placeholder="Enter PIN"
                className="text-center text-2xl tracking-widest pr-12"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPin ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
            {error && (
              <p className="text-destructive text-sm text-center">{error}</p>
            )}
            <Button type="submit" className="w-full" size="lg" disabled={pin.length !== 4}>
              Unlock
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
