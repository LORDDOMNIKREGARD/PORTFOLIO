import { useEffect, useState } from 'react';

const phrases = ['brand stories', 'digital products', 'editorial interfaces'];

export default function TextFlipBoard() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % phrases.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="flip-board" aria-live="polite">
      <span className="flip-board__label">Shaping</span>
      <div className="flip-board__stack" aria-hidden="true">
        {phrases.map((phrase, index) => (
          <span
            key={phrase}
            className={`flip-board__word ${index === activeIndex ? 'is-active' : ''}`}
          >
            {phrase}
          </span>
        ))}
      </div>
    </div>
  );
}
