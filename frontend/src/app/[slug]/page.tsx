import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/api";
import MarkdownBody from "@/components/MarkdownBody";

export const dynamic = "force-dynamic";

// CMSで作成された固定ページのslugが衝突してはならない予約語。
// 既存ルート（works, news, api）と Next.js 予約ファイルを含める。
// 将来追加されるであろう固定ページ名（about, contact 等）は
// CMS で自由に作れるよう、あえて含めない。
const RESERVED_SLUGS = new Set([
  "works",
  "news",
  "api",
  "_next",
  "favicon.ico",
  "sitemap.xml",
  "robots.txt",
  "manifest.json",
  "opengraph-image",
  "icon",
]);

async function fetchPage(slug: string) {
  if (RESERVED_SLUGS.has(slug)) return null;
  try {
    return await getPage(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await fetchPage(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description ?? undefined,
    openGraph: {
      title: page.title,
      description: page.description ?? undefined,
      images: page.og_image ? [page.og_image] : undefined,
    },
    robots: page.noindex ? { index: false, follow: false } : undefined,
  };
}

export default async function StaticPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await fetchPage(slug);
  if (!page) notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <article>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-8">
          {page.title}
        </h1>
        {page.body && <MarkdownBody content={page.body} />}
      </article>
    </div>
  );
}
