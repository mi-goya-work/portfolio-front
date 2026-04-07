export type TechStackItem = {
  name: string;
  role: string;
};

export const techStack: TechStackItem[] = [
  { name: "Next.js", role: "フロントエンド" },
  { name: "React", role: "UI ライブラリ" },
  { name: "TypeScript", role: "型付き言語" },
  { name: "Tailwind CSS", role: "CSS フレームワーク" },
  { name: "Node.js", role: "ランタイム" },
  { name: "Apache", role: "Web サーバー" },
  { name: "AWS", role: "クラウド基盤" },
  { name: "Claude Code", role: "AI 開発ツール" },
];
