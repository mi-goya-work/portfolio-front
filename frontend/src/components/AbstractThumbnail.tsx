import type { Work } from "@/lib/types";

type Props = {
  work: Work;
};

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function AbstractThumbnail({ work }: Props) {
  const hash = hashCode(work.slug || work.title);
  const patternIndex = hash % 3;

  const isFreelance = work.category === "freelance";
  const isCorporate = work.category === "corporate";

  const gradientFrom = isFreelance ? "#1e3a5f" : isCorporate ? "#1a3650" : "#1e293b";
  const gradientTo = isFreelance ? "#0f2744" : isCorporate ? "#0d2137" : "#0f172a";
  const strokeColor = isFreelance ? "#38BDF8" : isCorporate ? "#64748B" : "#818CF8";
  const fillAlpha = isFreelance ? "0.1" : isCorporate ? "0.1" : "0.1";

  const badgeLabel = isFreelance ? "Freelance" : isCorporate ? "Corporate" : "Personal";
  const badgeClasses = isFreelance
    ? "text-blue-100 bg-blue-500/30"
    : isCorporate
    ? "text-emerald-100 bg-emerald-500/30"
    : "text-indigo-100 bg-indigo-500/30";

  return (
    <div
      className="relative aspect-[4/3] overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
    >
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 300">
        {patternIndex === 0 && (
          <>
            <line x1="40" y1="60" x2="200" y2="60" stroke={strokeColor} strokeWidth="1" />
            <line x1="200" y1="60" x2="200" y2="140" stroke={strokeColor} strokeWidth="1" />
            <line x1="200" y1="140" x2="350" y2="140" stroke={strokeColor} strokeWidth="1" />
            <line x1="100" y1="120" x2="100" y2="220" stroke={strokeColor} strokeWidth="1" />
            <line x1="100" y1="220" x2="280" y2="220" stroke={strokeColor} strokeWidth="1" />
            <line x1="280" y1="180" x2="280" y2="260" stroke={strokeColor} strokeWidth="1" />
            <line x1="50" y1="180" x2="180" y2="180" stroke={strokeColor} strokeWidth="1" />
            <circle cx="200" cy="60" r="4" fill={strokeColor} />
            <circle cx="200" cy="140" r="4" fill={strokeColor} />
            <circle cx="100" cy="120" r="4" fill={strokeColor} />
            <circle cx="100" cy="220" r="4" fill={strokeColor} />
            <circle cx="280" cy="220" r="4" fill={strokeColor} />
            <circle cx="350" cy="140" r="3" fill={strokeColor} />
            <rect x="140" y="90" width="60" height="40" rx="3" stroke={strokeColor} strokeWidth="0.8" fill="none" />
            <rect x="240" y="200" width="50" height="35" rx="3" stroke={strokeColor} strokeWidth="0.8" fill="none" />
          </>
        )}
        {patternIndex === 1 && (
          <>
            <pattern id={`dotgrid-${work.slug}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.5" fill={strokeColor} />
            </pattern>
            <rect x="30" y="30" width="340" height="240" fill={`url(#dotgrid-${work.slug})`} />
            <rect x="80" y="60" width="240" height="180" rx="8" stroke={strokeColor} strokeWidth="1" fill="none" />
            <rect x="100" y="90" width="200" height="12" rx="2" stroke={strokeColor} strokeWidth="0.5" fill={`rgba(100,116,139,${fillAlpha})`} />
            <rect x="100" y="115" width="200" height="12" rx="2" stroke={strokeColor} strokeWidth="0.5" fill={`rgba(100,116,139,${fillAlpha})`} />
            <rect x="100" y="140" width="200" height="12" rx="2" stroke={strokeColor} strokeWidth="0.5" fill={`rgba(100,116,139,${fillAlpha})`} />
            <rect x="100" y="175" width="80" height="24" rx="4" stroke={strokeColor} strokeWidth="0.8" fill={`rgba(100,116,139,0.15)`} />
          </>
        )}
        {patternIndex === 2 && (
          <>
            <circle cx="200" cy="150" r="120" stroke={strokeColor} strokeWidth="0.5" fill="none" />
            <circle cx="200" cy="150" r="90" stroke={strokeColor} strokeWidth="0.5" fill="none" />
            <circle cx="200" cy="150" r="60" stroke={strokeColor} strokeWidth="0.8" fill="none" />
            <circle cx="200" cy="150" r="30" stroke={strokeColor} strokeWidth="1" fill={`rgba(129,140,248,${fillAlpha})`} />
            <line x1="200" y1="30" x2="200" y2="90" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="4" />
            <line x1="80" y1="150" x2="140" y2="150" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="4" />
            <line x1="260" y1="150" x2="320" y2="150" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="4" />
            <line x1="200" y1="210" x2="200" y2="270" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="4" />
            <rect x="30" y="40" width="50" height="20" rx="3" stroke={strokeColor} strokeWidth="0.5" fill={`rgba(129,140,248,0.08)`} />
            <rect x="320" y="40" width="50" height="20" rx="3" stroke={strokeColor} strokeWidth="0.5" fill={`rgba(129,140,248,0.08)`} />
            <rect x="30" y="240" width="50" height="20" rx="3" stroke={strokeColor} strokeWidth="0.5" fill={`rgba(129,140,248,0.08)`} />
            <rect x="320" y="240" width="50" height="20" rx="3" stroke={strokeColor} strokeWidth="0.5" fill={`rgba(129,140,248,0.08)`} />
          </>
        )}
      </svg>
      <div className="absolute top-3 left-3">
        <span className={`px-2.5 py-1 text-xs font-heading font-medium backdrop-blur-sm rounded-full ${badgeClasses}`}>
          {badgeLabel}
        </span>
      </div>
    </div>
  );
}
