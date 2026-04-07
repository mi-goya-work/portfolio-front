"use client";

import { useState, useCallback, useEffect } from "react";
import { CMS_PUBLIC_API_URL } from "@/lib/config";
import type { ChatSettings } from "@/lib/types";
import { ChatPanel } from "./ChatPanel";
import { ChatBubbleIcon, CloseIcon } from "./icons";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatSettings, setChatSettings] = useState<ChatSettings | null>(null);

  useEffect(() => {
    fetch(`${CMS_PUBLIC_API_URL}/chat/settings`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => setChatSettings(json.data))
      .catch(() =>
        setChatSettings({
          enabled: false,
          greeting_message: null,
          model_name: null,
        }),
      );
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  if (!chatSettings?.enabled) {
    return null;
  }

  return (
    <>
      <div
        className={`fixed z-50 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        } bottom-0 right-0 sm:bottom-[calc(6rem+env(safe-area-inset-bottom))] sm:right-6 w-full h-full sm:w-96 sm:h-[32rem]`}
        role="dialog"
        aria-label="チャット"
        aria-hidden={!isOpen}
      >
        <div className="sm:hidden flex items-center justify-between px-4 py-3 bg-surface-raised border-b border-slate-200">
          <span className="text-sm font-medium text-slate-900">
            AI アシスタント
          </span>
          <button
            onClick={toggle}
            aria-label="チャットを閉じる"
            className="p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="h-[calc(100%-52px)] sm:h-full">
          <ChatPanel greetingMessage={chatSettings.greeting_message} />
        </div>
      </div>

      <button
        onClick={toggle}
        aria-label={isOpen ? "チャットを閉じる" : "チャットを開く"}
        className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 z-50 w-14 h-14 rounded-full bg-accent text-white shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95"
      >
        {isOpen ? <CloseIcon /> : <ChatBubbleIcon />}
      </button>
    </>
  );
}
