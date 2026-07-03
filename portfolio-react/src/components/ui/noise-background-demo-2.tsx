import { cn } from "@/lib/utils";
import { NoiseBackground } from "@/components/ui/noise-background";
import type { ReactNode } from "react";

const mocktopusImage = "/MOCKTOPUS.png";

export default function NoiseBackgroundDemoSecond() {
  return (
    <div className="demo-card-shell">
      <NoiseBackground gradientColors={["#a02d25", "#ffac2e", "#a0e0ab"]}>
        <Card>
          <img src={mocktopusImage} alt="Mocktopus project preview" className="demo-card-image" />
          <div className="demo-card-copy">
            <p className="demo-card-meta">Mocktopus</p>
            <h3>Polished web experience for a modern product story.</h3>
            <p>
              A calm, editorial interface built for clarity, strong first impressions, and easy maintenance.
            </p>
            <a href="https://mocktopus-two.vercel.app/" target="_blank" rel="noreferrer" className="demo-card-link">
              Visit project
            </a>
          </div>
        </Card>
      </NoiseBackground>
    </div>
  );
}

const Card = ({ className, children }: { className?: string; children: ReactNode }) => {
  return <div className={cn("demo-card", className)}>{children}</div>;
};
