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
  iosApp: "https://apps.apple.com/us/app/freighter/id6743947720",
  androidApp: "https://play.google.com/store/apps/details?id=org.stellar.freighterwallet",
  stellarExpert: "https://stellar.expert",
  feedback: "https://docs.google.com/forms/d/e/1FAIpQLSesb7QzQElout02Q4AG8334vCe1m5QlC4jIhZMzWTYVHrCyHw/viewform",
  docs: "https://docs.freighter.app",
  help: "https://docs.freighter.app/support",
  support: "https://help.freighter.app",
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
