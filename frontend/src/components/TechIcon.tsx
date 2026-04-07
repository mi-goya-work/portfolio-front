import { getTechIcon } from "@/lib/tech-icons";

type TechIconProps = {
  name: string;
  size?: number;
};

export function TechIcon({ name, size = 24 }: TechIconProps) {
  const icon = getTechIcon(name);

  if (!icon) {
    return (
      <div
        className="rounded bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500"
        style={{ width: size, height: size }}
      >
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill={icon.color}
      width={size}
      height={size}
      role="img"
      aria-label={name}
    >
      <path d={icon.path} />
    </svg>
  );
}
