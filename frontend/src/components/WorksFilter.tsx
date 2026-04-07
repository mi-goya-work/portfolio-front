import type { Work } from "@/lib/types";
import { WorkCard } from "./WorkCard";

type WorksGridProps = {
  works: Work[];
};

export function WorksFilter({ works }: WorksGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {works.map((work) => (
        <WorkCard key={work.id} work={work} />
      ))}
    </div>
  );
}
