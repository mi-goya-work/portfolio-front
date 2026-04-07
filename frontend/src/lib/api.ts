import { cacheLife, cacheTag } from "next/cache";
import type {
  ContentItem,
  ContentResponse,
  ContentsListResponse,
  News,
  Page,
  Profile,
  SettingsResponse,
  SiteSettings,
  SocialLinks,
  Work,
} from "./types";
import { CMS_API_BASE_URL } from "./config";

async function fetchCms<T>(path: string): Promise<T> {
  const res = await fetch(`${CMS_API_BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`CMS API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

// --- Works custom_fields → Work 変換 ---

type WorkCustomFields = {
  description?: string;
  url?: string;
  period?: string;
  role?: string;
  category?: "freelance" | "corporate";
  tech_stack?: string[];
  sort_order?: number;
  gallery_images?: { path: string; alt: string | null }[];
};

function toWork(item: ContentItem): Work {
  const cf = item.custom_fields as unknown as WorkCustomFields;
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    description: cf.description ?? null,
    body: item.body,
    thumbnail_url: item.thumbnail?.startsWith('http') ? item.thumbnail : null,
    url: cf.url ?? null,
    published_at: item.published_at,
    category: cf.category ?? null,
    period: cf.period ?? null,
    role: cf.role ?? null,
    tech_stack: cf.tech_stack ?? null,
    images:
      cf.gallery_images
        ?.filter((img) => img.path)
        .map((img) => ({ url: img.path, alt: img.alt })) ?? [],
  };
}

// --- Profile custom_fields → Profile 変換 ---

type ProfileCustomFields = {
  tagline?: string;
  social_links?: SocialLinks;
  skills?: string[];
};

function toProfile(item: ContentItem): Profile {
  const cf = item.custom_fields as unknown as ProfileCustomFields;
  return {
    name: item.title,
    tagline: cf.tagline ?? null,
    bio: item.body,
    profile_image_url: null, // TODO: Public Media URL対応後に設定
    social_links: cf.social_links ?? {
      github: null,
      twitter: null,
      linkedin: null,
      website: null,
      email: null,
    },
    skills: (cf.skills ?? []).map((name) => ({ name })),
  };
}

// --- 公開API ---

/** 公開済みWork一覧を取得 */
export async function getWorks(): Promise<Work[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("works");
  const res = await fetchCms<ContentsListResponse>(
    "/contents?content_type=works&sort=sort_order&order=asc",
  );
  return res.data.map(toWork);
}

/** slug指定でWorkを取得 */
export async function getWork(slug: string): Promise<Work> {
  "use cache";
  cacheLife("minutes");
  cacheTag("works");
  const res = await fetchCms<ContentResponse>(`/contents/${slug}`);
  return toWork(res.data);
}

/** プロフィールを取得 */
export async function getProfile(): Promise<Profile> {
  "use cache";
  cacheLife("minutes");
  cacheTag("profile");
  const res = await fetchCms<ContentResponse>("/contents/profile");
  return toProfile(res.data);
}

/** サイト設定を取得 */
export async function getSiteSettings(): Promise<SiteSettings> {
  "use cache";
  cacheLife("minutes");
  cacheTag("site-settings");
  const res = await fetchCms<SettingsResponse>("/settings");
  return res.data;
}

// --- News custom_fields → News 変換 ---

type NewsCustomFields = {
  related_url?: string;
};

function toNews(item: ContentItem): News {
  const cf = (item.custom_fields ?? {}) as unknown as NewsCustomFields;
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    body: item.body,
    published_at: item.published_at,
    related_url: cf.related_url ?? null,
  };
}

/** 公開済みNews一覧を取得 */
export async function getNewsList(): Promise<News[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("news");
  const res = await fetchCms<ContentsListResponse>(
    "/contents?content_type=news&sort=published_at&order=desc",
  );
  return res.data.map(toNews);
}

/** slug指定でNewsを取得 */
export async function getNews(slug: string): Promise<News> {
  "use cache";
  cacheLife("minutes");
  cacheTag("news");
  const res = await fetchCms<ContentResponse>(`/contents/${slug}`);
  return toNews(res.data);
}

// --- Pages custom_fields → Page 変換 ---

type PageCustomFields = {
  description?: string;
  og_image?: string;
  noindex?: boolean;
};

function toPage(item: ContentItem): Page {
  const cf = (item.custom_fields ?? {}) as unknown as PageCustomFields;
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    body: item.body,
    description: cf.description ?? null,
    og_image: cf.og_image ?? null,
    noindex: cf.noindex ?? false,
    published_at: item.published_at,
  };
}

/** 公開済みPage一覧を取得 */
export async function getPages(): Promise<Page[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("pages");
  const res = await fetchCms<ContentsListResponse>(
    "/contents?content_type=pages",
  );
  return res.data.map(toPage);
}

/** slug指定でPageを取得 */
export async function getPage(slug: string): Promise<Page> {
  "use cache";
  cacheLife("minutes");
  cacheTag("pages");
  const res = await fetchCms<ContentResponse>(`/contents/${slug}`);
  return toPage(res.data);
}
