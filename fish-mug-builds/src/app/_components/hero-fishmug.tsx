'use client';

import { useEffect, useState } from 'react';
import { PixelatedCanvas } from '@/components/ui/pixelated-canvas';

export function HeroFishmug() {
  const [size, setSize] = useState(420);

  useEffect(() => {
    const compute = () => {
      const padding = 32;
      const max = 420;
      const min = 240;
      const available = Math.min(max, window.innerWidth - padding);
      setSize(Math.max(min, available));
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  return (
    <PixelatedCanvas
      key={size}
      src="/fishmug-builds.png"
      width={size}
      height={size}
      cellSize={5}
      dotScale={0.92}
      shape="square"
      backgroundColor=""
      dropoutStrength={0.15}
      interactive
      distortionStrength={3}
      distortionRadius={80}
      distortionMode="swirl"
      followSpeed={0.2}
      jitterStrength={3}
      jitterSpeed={3}
      sampleAverage
      tintColor="#5c3a1f"
      tintStrength={0.7}
      objectFit="contain"
      className="block mx-auto mb-8"
    />
  );
}
