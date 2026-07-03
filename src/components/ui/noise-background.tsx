import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";

function GradientLayer({
  color,
  opacity,
  position,
}: {
  color: string;
  opacity: number;
  position: { x: number; y: number };
}) {
  return (
    <div
      className="noise-gradient"
      style={{
        opacity,
        background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${color} 0%, transparent 58%)`,
      }}
    />
  );
}

interface NoiseBackgroundProps {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  gradientColors?: string[];
  noiseIntensity?: number;
  speed?: number;
  backdropBlur?: boolean;
  animating?: boolean;
}

export const NoiseBackground = ({
  children,
  className,
  containerClassName,
  gradientColors = ["#ff6496", "#6fa5ff", "#ffc864"],
  noiseIntensity = 0.2,
  speed = 1,
  backdropBlur = false,
  animating = true,
}: NoiseBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerPoint = { x: rect.width / 2, y: rect.height / 2 };
    positionRef.current = centerPoint;
    setPosition(centerPoint);
  }, []);

  useEffect(() => {
    if (!animating || !containerRef.current) return;

    let frameId = 0;
    let directionTimer = 0;
    let previousTime = 0;

    const update = (time: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const delta = time - previousTime;
      previousTime = time;

      directionTimer += delta;
      if (directionTimer > 1800 + Math.random() * 1200) {
        directionTimer = 0;
        velocityRef.current = {
          x: (Math.random() - 0.5) * speed * 0.65,
          y: (Math.random() - 0.5) * speed * 0.65,
        };
      }

      const next = {
        x: positionRef.current.x + velocityRef.current.x * delta,
        y: positionRef.current.y + velocityRef.current.y * delta,
      };

      const padding = 24;
      const boundedX = Math.min(width - padding, Math.max(padding, next.x));
      const boundedY = Math.min(height - padding, Math.max(padding, next.y));

      if (boundedX !== next.x || boundedY !== next.y) {
        velocityRef.current = {
          x: -velocityRef.current.x,
          y: -velocityRef.current.y,
        };
      }

      const updated = { x: boundedX, y: boundedY };
      positionRef.current = updated;
      setPosition(updated);
      frameId = window.requestAnimationFrame(update);
    };

    frameId = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(frameId);
  }, [animating, speed]);

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const next = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    positionRef.current = next;
    setPosition(next);
  };

  return (
    <div
      ref={containerRef}
      className={cn("noise-background", backdropBlur && "noise-background--blur", containerClassName)}
      style={{ ["--noise-opacity" as string]: noiseIntensity } as CSSProperties}
      onMouseMove={handlePointerMove}
    >
      <GradientLayer color={gradientColors[0]} opacity={0.35} position={position} />
      <GradientLayer color={gradientColors[1]} opacity={0.24} position={position} />
      <GradientLayer color={gradientColors[2] || gradientColors[0]} opacity={0.2} position={position} />

      <div className="noise-background__glow" />
      <div className="noise-background__overlay" />
      <div className={cn("noise-background__content", className)}>{children}</div>
    </div>
  );
};
