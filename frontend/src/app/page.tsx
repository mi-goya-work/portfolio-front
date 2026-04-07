import Image from "next/image";
import Link from "next/link";
import { getNewsList, getProfile, getSiteSettings, getWorks } from "@/lib/api";
import { techStack } from "@/lib/tech-stack";
import { TechIcon } from "@/components/TechIcon";
import { WorksFilter } from "@/components/WorksFilter";
import { SocialIcon } from "@/components/SocialIcon";
import { ScrollReveal } from "@/components/ScrollReveal";

export const dynamic = "force-dynamic";

const SOCIAL_KEYS = ["github", "twitter", "linkedin", "website"] as const;

export default async function Home() {
  const [works, profile, siteSettings, newsList] = await Promise.all([
    getWorks(),
    getProfile(),
    getSiteSettings(),
    getNewsList(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="pt-20 sm:pt-24 pb-12 bg-surface">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col items-center gap-3 text-center mb-10 sm:mb-14">
              {siteSettings.fv_sub_text && (
                <p className="font-body text-sm sm:text-base text-slate-500 tracking-wide">
                  {siteSettings.fv_sub_text}
                </p>
              )}
              <p className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-900">
                {siteSettings.fv_catchphrase || "ヘッドレスCMS、自作しました。"}
              </p>
              {siteSettings.fv_display_name && (
                <p className="font-body text-sm sm:text-base text-slate-400 mt-1">
                  {siteSettings.fv_display_name}
                </p>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex justify-center">
              <Image
                src="/images/fv-hero.webp"
                alt="CMS管理画面と公開サイト"
                width={2880}
                height={1187}
                priority
                sizes="(min-width: 640px) 80vw, 100vw"
                className="hidden sm:block w-full max-w-5xl h-auto rounded-xl shadow-2xl"
              />
              <Image
                src="/images/fv-hero-mobile.webp"
                alt="CMS管理画面と公開サイト"
                width={1370}
                height={1200}
                priority
                sizes="100vw"
                className="block sm:hidden w-full max-w-sm h-auto rounded-xl shadow-lg"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Works */}
      <section id="works" className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <h2 className="font-heading font-bold text-2xl text-slate-900">実績</h2>
              <div className="flex-1 h-px bg-zinc-200" />
              <Link
                href="/works"
                className="text-sm text-slate-500 hover:text-accent transition-colors whitespace-nowrap"
              >
                すべての実績 →
              </Link>
              {works.length > 0 && (
                <span className="text-sm text-slate-400">
                  {works.length} Projects
                </span>
              )}
            </div>
          </ScrollReveal>

          {works.length === 0 ? (
            <p className="text-slate-400 text-center py-12">
              作品はまだ公開されていません。
            </p>
          ) : (
            <ScrollReveal stagger>
              <WorksFilter works={works} />
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* News */}
      {newsList.length > 0 && (
        <section id="news" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-12">
                <h2 className="font-heading font-bold text-2xl text-slate-900">お知らせ</h2>
                <div className="flex-1 h-px bg-zinc-200" />
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <ul className="divide-y divide-zinc-100">
                {newsList.slice(0, 3).map((news) => (
                  <li key={news.id}>
                    <Link
                      href={`/news/${news.slug}`}
                      className="flex items-baseline gap-4 py-4 group hover:bg-zinc-50 -mx-3 px-3 rounded-lg transition-colors"
                    >
                      {news.published_at && (
                        <time className="text-sm text-slate-400 shrink-0">
                          {new Date(news.published_at)
                            .toLocaleDateString("ja-JP", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })
                            .replace(/\//g, ".")}
                        </time>
                      )}
                      <span className="text-slate-700 group-hover:text-accent transition-colors">
                        {news.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <div className="mt-8 text-center">
                <Link
                  href="/news"
                  className="text-sm text-slate-500 hover:text-accent transition-colors"
                >
                  すべてのお知らせ →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* About This Site */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <h2 className="font-heading font-bold text-2xl text-slate-900">このサイトについて</h2>
              <div className="flex-1 h-px bg-zinc-200" />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-lg text-slate-600 leading-relaxed mb-12 max-w-3xl">
              このポートフォリオは、別インスタンスの headless CMS で管理しているコンテンツを Public API 経由で描画する構成です。公開フロントエンドは Next.js に寄せ、CMS 本体とは責務を分離しています。
            </p>
          </ScrollReveal>

          {/* Architecture Diagram */}
          <ScrollReveal>
            <div className="mb-12">
              <h3 className="font-heading font-semibold text-lg text-slate-900 mb-6">システム構成</h3>
              <div className="relative left-1/2 w-screen -translate-x-1/2 px-6 sm:px-10 lg:px-16 flex justify-center overflow-auto sm:overflow-visible touch-pinch-zoom">
                <Image
                  src="/images/architecture.svg"
                  alt="システム構成: EC2 上の headless CMS から Public API で Next.js フロントと AI チャットに配信し、Vercel で公開する構成"
                  width={1200}
                  height={760}
                  className="h-auto min-w-[920px] sm:min-w-0 w-full max-w-[1200px]"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Key Features */}
          <ScrollReveal>
            <div>
              <h3 className="font-heading font-semibold text-lg text-slate-900 mb-6">主な機能</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "マークダウンエディタ", desc: "undo/redo・ツールバー・画像挿入付きのリッチエディタ" },
                  { title: "ギャラリー管理", desc: "ドラッグ&ドロップでギャラリー画像を並べ替え" },
                  { title: "AI チャット", desc: "ポートフォリオの内容を文脈にしたストリーミングチャット" },
                  { title: "キャッシュ制御", desc: "管理画面の更新がフロントエンドに即時反映されるキャッシュ制御" },
                ].map((feature) => (
                  <div key={feature.title} className="p-5 rounded-xl bg-surface border border-zinc-100">
                    <p className="font-heading font-semibold text-sm text-slate-900 mb-2">{feature.title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="techstack" className="py-24 bg-surface-muted">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <h2 className="font-heading font-bold text-2xl text-slate-900">技術スタック</h2>
              <div className="flex-1 h-px bg-zinc-200" />
            </div>
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="tech-item flex items-center gap-3 p-4 rounded-xl bg-surface border border-zinc-100 cursor-default"
                >
                  <TechIcon name={tech.name} size={32} />
                  <div>
                    <p className="text-sm font-heading font-semibold text-slate-900">
                      {tech.name}
                    </p>
                    <p className="text-xs text-slate-500">{tech.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Profile */}
      <section id="profile" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <h2 className="font-heading font-bold text-2xl text-slate-900">プロフィール</h2>
              <div className="flex-1 h-px bg-zinc-200" />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              {/* Left: Avatar + Social */}
              <div className="lg:col-span-3 flex flex-col items-center lg:items-start gap-5">
                {profile.profile_image_url ? (
                  <Image
                    src={profile.profile_image_url}
                    alt={profile.name}
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-2xl object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-lg">
                    <span className="font-heading font-bold text-4xl text-white/90">
                      {(profile.name || "G").charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}

                <div className="flex gap-3">
                  {SOCIAL_KEYS.map((key) =>
                    profile.social_links?.[key] ? (
                      <a
                        key={key}
                        href={profile.social_links[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-zinc-100 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-zinc-200 transition-colors duration-200"
                        aria-label={key}
                      >
                        <SocialIcon type={key} />
                      </a>
                    ) : null
                  )}
                </div>
              </div>

              {/* Right: Bio + Skills */}
              <div className="lg:col-span-9">
                {profile.bio && (
                  <div className="mb-8">
                    <h3 className="font-heading font-semibold text-lg text-slate-900 mb-4">
                      自己紹介
                    </h3>
                    <div className="text-base text-slate-600 leading-relaxed whitespace-pre-line">
                      {profile.bio}
                    </div>
                  </div>
                )}

                {profile.skills.length > 0 && (
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-slate-900 mb-4">
                      スキル
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill) => (
                        <span
                          key={skill.name}
                          className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-zinc-100 rounded-lg border border-zinc-200"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-surface-muted">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <h2 className="font-heading font-bold text-2xl text-slate-900">お問い合わせ</h2>
              <div className="flex-1 h-px bg-zinc-200" />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center">
              <p className="text-slate-600 mb-8">お気軽にご連絡ください</p>
              <div className="flex flex-wrap justify-center gap-4">
                {profile.social_links?.email && (
                  <a
                    href={`mailto:${profile.social_links.email}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-full hover:bg-accent-hover transition-colors shadow-lg shadow-accent/25"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    メールで連絡する
                  </a>
                )}
                {SOCIAL_KEYS.map((key) =>
                  profile.social_links?.[key] ? (
                    <a
                      key={key}
                      href={profile.social_links[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-white text-slate-700 font-medium rounded-full border border-zinc-200 hover:bg-zinc-50 transition-colors"
                    >
                      <SocialIcon type={key} />
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </a>
                  ) : null
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
