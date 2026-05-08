'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';

const CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*<>?/\\|~';

const randomChar = () =>
  CHARSET.charAt(Math.floor(Math.random() * CHARSET.length));

interface EncryptTextProps {
  base: string;
  revealed: string;
  className?: string;
  style?: CSSProperties;
  /** how long each character takes to lock in while decrypting. */
  decryptMsPerChar?: number;
  /** how long each character takes to lock in while re-encrypting. */
  encryptMsPerChar?: number;
  /** how often unlocked characters re-roll to a new random glyph. */
  scrambleTickMs?: number;
  /** ms to hold the revealed string before re-encrypting. */
  holdMs?: number;
  /** rendered tag. */
  as?: 'h1' | 'h2' | 'span';
}

export function EncryptText({
  base,
  revealed,
  className,
  style,
  decryptMsPerChar = 170,
  encryptMsPerChar = 240,
  scrambleTickMs = 95,
  holdMs = 2600,
  as = 'h1',
}: EncryptTextProps) {
  const [display, setDisplay] = useState(base);
  const runningRef = useRef(false);
  const mountedRef = useRef(true);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const transition = useCallback(
    (from: string, to: string, msPerChar: number, scrambleMs: number) =>
      new Promise<void>((resolve) => {
        const maxLen = Math.max(from.length, to.length);
        const start = performance.now();
        const cached: string[] = Array.from({ length: maxLen }, () =>
          randomChar(),
        );
        let lastScramble = start;

        const tick = (now: number) => {
          if (!mountedRef.current) {
            resolve();
            return;
          }
          const elapsed = now - start;
          const lockedIdx = Math.min(maxLen, Math.floor(elapsed / msPerChar));

          if (now - lastScramble >= scrambleMs) {
            for (let i = lockedIdx; i < maxLen; i++) {
              cached[i] = randomChar();
            }
            lastScramble = now;
          }

          let out = '';
          for (let i = 0; i < maxLen; i++) {
            if (i < lockedIdx) {
              if (i < to.length) out += to[i];
            } else {
              out += cached[i];
            }
          }
          setDisplay(out);

          if (lockedIdx >= maxLen) {
            setDisplay(to);
            resolve();
            return;
          }
          rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
      }),
    [],
  );

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => {
      timeoutRef.current = setTimeout(resolve, ms);
    });

  const run = useCallback(async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    try {
      await transition(base, revealed, decryptMsPerChar, scrambleTickMs);
      if (!mountedRef.current) return;
      await sleep(holdMs);
      if (!mountedRef.current) return;
      await transition(revealed, base, encryptMsPerChar, scrambleTickMs);
    } finally {
      runningRef.current = false;
    }
  }, [
    base,
    revealed,
    transition,
    decryptMsPerChar,
    encryptMsPerChar,
    scrambleTickMs,
    holdMs,
  ]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      run();
    }
  };

  const Tag = as;

  return (
    <Tag
      className={className}
      style={{ cursor: 'pointer', ...style }}
      role="button"
      tabIndex={0}
      onClick={run}
      onKeyDown={handleKey}
      aria-label={`${base} — click to decrypt`}
    >
      {display}
    </Tag>
  );
}
