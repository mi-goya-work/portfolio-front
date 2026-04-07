"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/works", label: "実績" },
  { href: "/news", label: "お知らせ" },
  { href: "/#about", label: "概要" },
  { href: "/#techstack", label: "技術" },
  { href: "/#profile", label: "プロフィール" },
] as const;

const CTA_LINK = { href: "/#contact", label: "連絡する" };

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = [
      ...NAV_LINKS.filter((item) => item.href.startsWith("/#")).map((item) =>
        item.href.replace("/#", ""),
      ),
      CTA_LINK.href.replace("/#", ""),
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 sm:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-lg ${
          scrolled ? "bg-white/85 shadow-sm" : "bg-white/60"
        }`}
      >
        {/* PC (sm+): full-width bar */}
        <div className="hidden sm:flex items-center justify-between max-w-6xl mx-auto px-6 lg:px-8 h-16">
          <Link
            href="/"
            className="text-lg font-heading font-bold text-slate-900 hover:text-accent transition-colors"
          >
            TOP
          </Link>
          <div className="flex items-center gap-1">
            {NAV_LINKS.map((item) => {
              const isSection = item.href.startsWith("/#");
              const isActive =
                isSection && activeSection === item.href.replace("/#", "");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors duration-200 ${
                    isActive
                      ? "bg-accent/10 text-accent font-medium"
                      : "text-slate-600 hover:bg-zinc-100 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={CTA_LINK.href}
              className="ml-2 px-4 py-1.5 text-sm font-medium text-white bg-accent rounded-full hover:bg-accent-hover transition-colors shadow-sm shadow-accent/25"
            >
              {CTA_LINK.label}
            </Link>
          </div>
        </div>

        {/* Mobile (< sm): hamburger + dropdown */}
        <div className="flex sm:hidden items-center justify-between px-4 h-14">
          <Link
            href="/"
            className="text-base font-heading font-bold text-slate-900 hover:text-accent transition-colors"
          >
            TOP
          </Link>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="メニューを開く"
            aria-expanded={menuOpen}
            className="p-2.5 text-slate-600 hover:text-slate-900 transition-colors duration-200"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-300 ${menuOpen ? "rotate-90" : "rotate-0"}`}
            >
              {menuOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown (outside nav for fixed positioning) */}
      <div
        className={`fixed top-14 left-4 right-4 z-50 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-zinc-200/60 overflow-hidden transition-all duration-300 sm:hidden ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {NAV_LINKS.map((item) => {
          const isSection = item.href.startsWith("/#");
          const isActive =
            isSection && activeSection === item.href.replace("/#", "");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={`block px-5 py-3.5 text-base transition-colors ${
                isActive
                  ? "text-accent font-medium bg-accent/5"
                  : "text-slate-700 hover:bg-zinc-50"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        <div className="mx-4 my-3">
          <Link
            href={CTA_LINK.href}
            onClick={closeMenu}
            className="block text-center px-4 py-2.5 text-sm font-medium text-white bg-accent rounded-full"
          >
            {CTA_LINK.label}
          </Link>
        </div>
      </div>
    </>
  );
}
