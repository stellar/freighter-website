"use client";

import dynamic from "next/dynamic";

const Iridescence = dynamic(() => import("@/components/ui/Iridescence/Iridescence"), {
  ssr: false,
});

type IridescenceBackgroundProps = {
  className?: string;
  patternClassName?: string;
  speed?: number;
  amplitude?: number;
  mouseReact?: boolean;
};

// Varial Blue 09 (#0050FF) as 0–1 RGB
const VARIAL_BLUE: [number, number, number] = [0, 0.3137254901960784, 1];

export function IridescenceBackground({
  className = "",
  patternClassName = "",
  speed = 0.5,
  amplitude = 0.08,
  mouseReact = false,
}: IridescenceBackgroundProps) {
  return (
    <div className={`absolute inset-0 z-0 bg-[#0050FF] ${className}`} aria-hidden="true">
      <div className={`absolute inset-0 ${patternClassName}`}>
        <Iridescence
          color={VARIAL_BLUE}
          speed={speed}
          amplitude={amplitude}
          mouseReact={mouseReact}
        />
      </div>
    </div>
  );
}
