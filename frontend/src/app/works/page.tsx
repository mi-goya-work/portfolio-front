import Link from "next/link";
import { getWorks } from "@/lib/api";
import { WorksFilter } from "@/components/WorksFilter";
import { ScrollReveal } from "@/components/ScrollReveal";

export const dynamic = "force-dynamic";

export default async function WorksPage() {
  const works = await getWorks();

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
            実績一覧
          </h1>
          <div className="flex-1 h-px bg-zinc-200" />
          {works.length > 0 && (
            <span className="text-sm text-slate-400">
              {works.length} Projects
            </span>
          )}
        </div>
      </ScrollReveal>

      {works.length === 0 ? (
        <p className="text-slate-400 text-center py-12">
          作品はまだ公開されていません。
        </p>
      ) : (
        <ScrollReveal stagger>
          <WorksFilter works={works} />
        </ScrollReveal>
      )}
    </div>
  );
}
