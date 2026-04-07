import Link from "next/link";
import { notFound } from "next/navigation";
import { getNews } from "@/lib/api";
import MarkdownBody from "@/components/MarkdownBody";

export const dynamic = "force-dynamic";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let news;
  try {
    news = await getNews(slug);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href="/news"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-10"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        お知らせ一覧に戻る
      </Link>

      <article>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          {news.title}
        </h1>

        {news.published_at && (
          <div className="text-sm text-slate-500 mb-8">
            <time>
              {new Date(news.published_at)
                .toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(/\//g, ".")}
            </time>
          </div>
        )}

        {news.body && (
          <div className="mb-10">
            <MarkdownBody content={news.body} />
          </div>
        )}

        {news.related_url && (
          <a
            href={news.related_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white font-medium rounded-full hover:bg-accent-hover transition-colors shadow-lg shadow-accent/25"
          >
            関連リンクを見る
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        )}
      </article>
    </div>
  );
}
