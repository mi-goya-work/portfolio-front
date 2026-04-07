import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-heading text-8xl font-bold text-slate-200">404</p>
        <h1 className="mt-4 text-xl font-heading font-semibold text-slate-900">
          ページが見つかりません
        </h1>
        <p className="mt-2 text-slate-500">
          お探しのページは存在しないか、移動した可能性があります
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          トップページに戻る
        </Link>
      </div>
    </div>
  );
}
