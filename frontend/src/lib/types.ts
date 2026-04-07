// --- headless-cms Public API レスポンス型 ---

/** コンテンツアイテム（汎用） */
export type ContentItem = {
  id: number;
  content_type: string;
  title: string;
  slug: string;
  full_slug: string;
  parent_id: number | null;
  body: string | null;
  custom_fields: Record<string, unknown>;
  categories: { slug: string; name: string }[];
  thumbnail: string | null;
  author: { id: number; name: string };
  published_at: string | null;
};

/** コンテンツ一覧レスポンス */
export type ContentsListResponse = {
  data: ContentItem[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

/** コンテンツ単体レスポンス */
export type ContentResponse = {
  data: ContentItem;
};

/** サイト設定レスポンス */
export type SettingsResponse = {
  data: SiteSettings;
};

// --- フロントエンド用の整形済み型 ---

/** Work（フロントエンド表示用） */
export type Work = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  body: string | null;
  thumbnail_url: string | null;
  url: string | null;
  published_at: string | null;
  category: "freelance" | "corporate" | null;
  period: string | null;
  role: string | null;
  tech_stack: string[] | null;
  images?: WorkImage[];
};

/** Work の詳細画像 */
export type WorkImage = {
  url: string;
  alt: string | null;
};

/** サイト設定 */
export type SiteSettings = {
  fv_display_name?: string;
  fv_catchphrase?: string;
  fv_sub_text?: string;
};

/** プロフィールのスキル */
export type Skill = {
  name: string;
};

/** プロフィールのソーシャルリンク */
export type SocialLinks = {
  github: string | null;
  twitter: string | null;
  linkedin: string | null;
  website: string | null;
  email: string | null;
};

/** Profile（フロントエンド表示用） */
export type Profile = {
  name: string;
  tagline: string | null;
  bio: string | null;
  profile_image_url: string | null;
  social_links: SocialLinks;
  skills: Skill[];
};

/** チャットメッセージ */
export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

/** チャット設定（CMS Public API レスポンス） */
export type ChatSettings = {
  enabled: boolean;
  greeting_message: string | null;
  model_name: string | null;
};

/** News（フロントエンド表示用） */
export type News = {
  id: number;
  title: string;
  slug: string;
  body: string | null;
  published_at: string | null;
  related_url: string | null;
};

/** Page（単発固定ページ／フロントエンド表示用） */
export type Page = {
  id: number;
  title: string;
  slug: string;
  body: string | null;
  description: string | null;
  og_image: string | null;
  noindex: boolean;
  published_at: string | null;
};
