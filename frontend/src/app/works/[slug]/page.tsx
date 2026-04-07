import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWork } from "@/lib/api";
import MarkdownBody from "@/components/MarkdownBody";

export const dynamic = "force-dynamic";

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let work;
  try {
    work = await getWork(slug);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href="/#works"
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
        実績に戻る
      </Link>

      <article>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          {work.title}
        </h1>

        {/* メタ情報 */}
        {(work.period || work.role || work.category) && (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 mb-6">
            {work.period && (
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                {work.period}
              </span>
            )}
            {work.role && (
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                {work.role}
              </span>
            )}
            {work.category && (
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z" />
                </svg>
                {work.category === 'freelance' ? '個人開発' : '法人案件'}
              </span>
            )}
          </div>
        )}

        {/* 技術スタック */}
        {work.tech_stack && work.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {work.tech_stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm font-medium text-slate-600 bg-zinc-100 rounded-lg border border-zinc-200"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {work.thumbnail_url && (
          <div className="rounded-2xl overflow-hidden mb-10 shadow-lg">
            <Image
              src={work.thumbnail_url}
              alt={work.title}
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </div>
        )}

        {work.description && (
          <div className="mb-10">
            <p className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">
              {work.description}
            </p>
          </div>
        )}

        {work.body && (
          <div className="mb-10">
            <MarkdownBody content={work.body} />
          </div>
        )}

        {work.images && work.images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {work.images.map((image, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-md">
                <Image
                  src={image.url}
                  alt={image.alt || `${work.title} - ${index + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        )}

        {work.url && (
          <a
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white font-medium rounded-full hover:bg-accent-hover transition-colors shadow-lg shadow-accent/25"
          >
            プロジェクトを見る
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
