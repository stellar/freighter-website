"use client";

import dynamic from "next/dynamic";

const Iridescence = dynamic(() => import("@/components/ui/Iridescence/Iridescence"), {
  ssr: false,
});

type IridescenceBackgroundProps = {
  className?: string;
  speed?: number;
  amplitude?: number;
  mouseReact?: boolean;
};

const FREIGHTER_PURPLE: [number, number, number] = [
  0.4627450980392157,
  0.3137254901960784,
  1,
];

export function IridescenceBackground({
  className = "",
  speed = 0.5,
  amplitude = 0.08,
  mouseReact = false,
}: IridescenceBackgroundProps) {
  return (
    <div className={`absolute inset-0 z-0 bg-[#7650ff] ${className}`} aria-hidden="true">
      <Iridescence
        color={FREIGHTER_PURPLE}
        speed={speed}
        amplitude={amplitude}
        mouseReact={mouseReact}
      />
    </div>
  );
}
