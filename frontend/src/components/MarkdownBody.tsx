"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownBody({ content }: { content: string }) {
  return (
    <div className="prose prose-slate max-w-none prose-img:rounded-xl prose-img:shadow-md prose-headings:text-slate-900 prose-a:text-accent">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
