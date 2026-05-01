import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChangelogContent } from "./changelog-content";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Keep up with the latest Freighter updates and releases.",
};

interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  prerelease: boolean;
  draft: boolean;
}

interface ChangelogEntry {
  version: string;
  date: string;
  platform: "extension" | "mobile";
  title: string;
  body: string;
  url: string;
}

function parseRelease(
  release: GitHubRelease,
  platform: "extension" | "mobile",
  repo: string
): ChangelogEntry {
  const version = release.tag_name.replace(/^v/, "");
  const date = new Date(release.published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Use release name as title, fall back to tag
  const title = release.name || version;

  // Clean up the body: remove "Full Changelog" links and contributor lines
  let body = release.body || "";
  body = body.replace(/\*\*Full Changelog\*\*:.*$/gm, "");
  body = body.replace(/## New Contributors[\s\S]*$/m, "");
  body = body.trim();

  return {
    version,
    date,
    platform,
    title,
    body,
    url: `https://github.com/stellar/${repo}/releases/tag/${release.tag_name}`,
  };
}

async function fetchReleases(
  repo: string,
  platform: "extension" | "mobile"
): Promise<ChangelogEntry[]> {
  const res = await fetch(
    `https://api.github.com/repos/stellar/${repo}/releases?per_page=30`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) return [];

  const releases: GitHubRelease[] = await res.json();

  return releases
    .filter((r) => !r.prerelease && !r.draft)
    .map((r) => parseRelease(r, platform, repo));
}

export default async function ChangelogPage() {
  const [extensionReleases, mobileReleases] = await Promise.all([
    fetchReleases("freighter", "extension"),
    fetchReleases("freighter-mobile", "mobile"),
  ]);

  // Merge and sort by date descending
  const entries = [...extensionReleases, ...mobileReleases].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary tracking-tight">
            Changelog
          </h1>
          <p className="text-lg text-text-secondary mt-4">
            Keep up with the latest Freighter updates.
          </p>
          <ChangelogContent entries={entries} />
        </div>
      </main>
      <Footer />
    </>
  );
}
