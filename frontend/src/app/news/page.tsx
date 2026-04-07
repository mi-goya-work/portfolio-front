import Link from "next/link";
import { getNewsList } from "@/lib/api";
import { ScrollReveal } from "@/components/ScrollReveal";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const newsList = await getNewsList();

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
      <Link
        href="/"
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
        トップに戻る
      </Link>

      <ScrollReveal>
        <div className="flex items-center gap-4 mb-12">
          <h1 className="font-heading font-bold text-2xl text-slate-900">
            お知らせ一覧
          </h1>
          <div className="flex-1 h-px bg-zinc-200" />
          {newsList.length > 0 && (
            <span className="text-sm text-slate-400">
              {newsList.length} Articles
            </span>
          )}
        </div>
      </ScrollReveal>

      {newsList.length === 0 ? (
        <p className="text-slate-400 text-center py-12">
          お知らせはまだ公開されていません。
        </p>
      ) : (
        <ScrollReveal stagger>
          <div className="grid grid-cols-1 gap-4">
            {newsList.map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.slug}`}
                className="news-item block p-6 rounded-xl bg-white border border-zinc-100 hover:border-zinc-200 hover:shadow-md transition-all"
              >
                {news.published_at && (
                  <time className="text-sm text-slate-400">
                    {new Date(news.published_at)
                      .toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/\//g, ".")}
                  </time>
                )}
                <h2 className="font-heading font-semibold text-lg text-slate-900 mt-1 mb-2">
                  {news.title}
                </h2>
                {news.body && (
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {news.body.replace(/[#*`>\-\[\]()!]/g, "").slice(0, 100)}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
