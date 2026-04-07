"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Work } from "@/lib/types";
import { AbstractThumbnail } from "./AbstractThumbnail";

type WorkCardProps = {
  work: Work;
};

export function WorkCard({ work }: WorkCardProps) {
  const [imgError, setImgError] = useState(false);
  const hasThumbnail = !!work.thumbnail_url && !imgError;

  return (
    <Link
      href={`/works/${work.slug}`}
      className="work-card group block bg-white rounded-2xl overflow-hidden border border-zinc-100 cursor-pointer"
    >
      {hasThumbnail ? (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={work.thumbnail_url!}
            alt={work.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <AbstractThumbnail work={work} />
      )}
      <div className="p-5">
        <h3 className="font-heading font-bold text-base text-slate-900 mb-2 group-hover:text-accent transition-colors duration-200">
          {work.title}
        </h3>
        {(work.period || work.role) && (
          <p className="text-sm text-slate-400 mb-2">
            {[work.period, work.role].filter(Boolean).join(" / ")}
          </p>
        )}
        {work.description && (
          <p className="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-2">
            {work.description}
          </p>
        )}
        {work.tech_stack && work.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {work.tech_stack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs text-slate-500 bg-zinc-100 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
