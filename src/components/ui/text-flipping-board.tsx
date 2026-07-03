import { useEffect, useState } from 'react';

const DEFAULT_TEXT = 'CRAFTING DIGITAL EXPERIENCES';
const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*?';

function randomChar() {
  return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
}

export function TextFlippingBoard({ text = DEFAULT_TEXT, className = '' }: { text?: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const steps = 18;
    let currentStep = 0;

    const interval = window.setInterval(() => {
      currentStep += 1;
      if (currentStep >= steps) {
        setDisplayText(text);
        setIsAnimating(false);
        window.clearInterval(interval);
        return;
      }

      const scrambled = Array.from({ length: Math.max(text.length, 24) }, () => randomChar()).join('');
      setDisplayText(scrambled);
    }, 60);

    return () => window.clearInterval(interval);
  }, [text]);

  const rows = text.split('\n').map((line) => line.padEnd(24, ' '));

  return (
    <div className={`w-full max-w-3xl rounded-2xl border border-pink-500/20 bg-black/70 p-3 shadow-[0_0_50px_rgba(255,77,141,0.12)] backdrop-blur ${className}`}>
      <div className="grid gap-2">
        {rows.map((row, rowIndex) => (
          <div key={`${rowIndex}-${row}`} className="flex flex-wrap gap-1 text-[clamp(10px,2vw,22px)] font-mono font-semibold tracking-[0.25em] text-pink-300">
            {Array.from(row).map((char, charIndex) => {
              const shouldUseDisplay = isAnimating && charIndex < displayText.length;
              const rendered = shouldUseDisplay ? displayText[charIndex] ?? ' ' : char;
              return (
                <span
                  key={`${rowIndex}-${charIndex}`}
                  className="inline-flex min-h-[1.2em] min-w-[0.7ch] items-center justify-center rounded border border-white/10 bg-white/5 px-1 py-0.5 text-center text-pink-300"
                >
                  {rendered}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
