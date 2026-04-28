export const SITE = {
  name: "Freighter",
  tagline: "Your Everyday Stellar Wallet",
  description:
    "Browse, connect, and use Stellar apps — all in one place",
  url: "https://www.freighter.app",
  supportEmail: "help@freighter.app",
  github: "https://github.com/stellar/freighter",
  discord: "#",
};

export const LINKS = {
  chromeExtension:
    "https://chromewebstore.google.com/detail/freighter/bcacfldlkkdogcmkkibnjlakofdplcbk",
  firefoxExtension: "#",
  iosApp: "#",
  androidApp: "#",
  stellarExpert: "https://stellar.expert",
  feedback: "https://docs.google.com/forms/d/e/freighter-feedback/viewform",
  docs: "https://docs.freighter.app",
  help: "https://docs.freighter.app/support",
};

export const NAV_LINKS: readonly {
  label: string;
  href: string;
  external?: boolean;
}[] = [
  {
    label: "GitHub",
    href: "https://github.com/stellar/freighter",
    external: true,
  },
  { label: "Changelog", href: "/changelog" },
  { label: "Feedback", href: LINKS.feedback, external: true },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];
