"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeSlideUp } from "@/lib/animations";
import { ArrowSquareOutBold, CheckBold } from "@/components/ui/PhosphorIcons";

const ZIP = "/brand/varial-brand-assets.zip";

/* eslint-disable @next/next/no-img-element */

function Cta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      download
      className="inline-flex items-center gap-2 rounded-full bg-text-primary px-6 py-3 text-sm font-medium text-white transition hover:brightness-110"
    >
      {children}
    </a>
  );
}

/** Square tile. Click to open the PNG in a new tab. */
function Tile({
  href,
  label,
  bg,
  children,
}: {
  href: string;
  label: string;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${label}`}
      className="group relative grid aspect-square place-items-center overflow-hidden rounded-3xl"
      style={{ background: bg }}
    >
      {children}
      <span className="pointer-events-none absolute inset-0 grid place-items-center bg-black/0 text-white opacity-0 transition duration-200 group-hover:bg-black/20 group-hover:opacity-100">
        <ArrowSquareOutBold size={28} />
      </span>
    </a>
  );
}

function Row({
  title,
  description,
  cta,
  children,
}: {
  title: string;
  description: string;
  cta?: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-8 py-20 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16 lg:items-center">
      <div>
        <h2 className="text-3xl font-medium tracking-tight text-text-primary md:text-4xl">
          {title}
        </h2>
        <p className="mt-3 text-base text-text-secondary">{description}</p>
        {cta && (
          <div className="mt-6">
            <Cta href={cta.href}>{cta.label}</Cta>
          </div>
        )}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function CopyHex({ hex }: { hex: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(hex);
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        } catch {
          /* hex is selectable text */
        }
      }}
      className="inline-flex items-center gap-1 font-mono text-xs text-text-secondary transition-colors hover:text-text-primary cursor-pointer"
      aria-label={`Copy ${hex}`}
    >
      {copied ? (
        <>
          <CheckBold size={12} /> Copied
        </>
      ) : (
        hex
      )}
    </button>
  );
}

export function BrandContent() {
  return (
    <motion.div variants={fadeSlideUp} initial="hidden" animate="visible">
      {/* Intro */}
      <header className="pb-24 pt-8">
        <h1 className="text-5xl font-medium leading-[1.02] tracking-tight text-text-primary md:text-6xl lg:text-7xl">
          <span className="text-text-tertiary">Freighter</span>{" "}
          is now Varial
        </h1>
        <p className="mt-6 max-w-[40ch] text-lg text-text-secondary md:text-xl">
          Update your app&rsquo;s branding with the assets below.
        </p>
      </header>

      {/* Logos */}
      <Row
        title="Logos"
        description="The official Varial logo and mark."
        cta={{ href: ZIP, label: "Download logo pack" }}
      >
        <div className="grid grid-cols-2 gap-4">
          <Tile href="/brand/varial-logo-h.svg" label="Varial logo" bg="#FFFFFF">
            <img src="/brand/varial-logo-h.svg" alt="Varial logo" className="w-[60%]" />
          </Tile>
          <Tile href="/brand/varial-mark.svg" label="Varial mark" bg="#FFFFFF">
            <img src="/brand/varial-mark.svg" alt="Varial mark" className="w-[42%]" />
          </Tile>
        </div>
      </Row>

      {/* Colors */}
      <Row
        title="Colors"
        description="The official Varial colors."
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[
            { name: "Varial Blue", hex: "#0050FF" },
            { name: "Black", hex: "#171717" },
            { name: "White", hex: "#FFFFFF", border: true },
          ].map((c) => (
            <div key={c.hex}>
              <div
                className={`aspect-square rounded-3xl ${
                  c.border ? "shadow-[inset_0_0_0_1px_#F3F3F3]" : ""
                }`}
                style={{ background: c.hex }}
              />
              <p className="mt-3 text-sm font-medium text-text-primary">{c.name}</p>
              <CopyHex hex={c.hex} />
            </div>
          ))}
        </div>
      </Row>

    </motion.div>
  );
}
