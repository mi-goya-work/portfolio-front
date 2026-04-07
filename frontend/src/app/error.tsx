"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-heading text-6xl font-bold text-slate-200">Error</p>
        <h1 className="mt-4 text-xl font-heading font-semibold text-slate-900">
          エラーが発生しました
        </h1>
        <p className="mt-2 text-slate-500">
          予期しないエラーが発生しました。再試行するか、トップページにお戻りください。
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => unstable_retry()}
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            再試行
          </button>
          <Link
            href="/"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
          >
            トップページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
