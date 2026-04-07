"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { CMS_PUBLIC_API_URL } from "@/lib/config";
import type { ChatMessage as ChatMessageType } from "@/lib/types";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ChatBubbleIcon } from "./icons";

type SSEParseResult =
  | { type: "content"; text: string }
  | { type: "error"; message: string }
  | { type: "done" }
  | { type: "skip" };

function parseSSELine(line: string): SSEParseResult {
  const trimmed = line.trim();
  if (!trimmed.startsWith("data: ")) return { type: "skip" };
  const data = trimmed.slice(6);
  if (data === "[DONE]") return { type: "done" };
  try {
    const parsed = JSON.parse(data);
    if (parsed.error) {
      return {
        type: "error",
        message:
          parsed.code === 429
            ? "リクエストが多すぎます。しばらくお待ちください。"
            : parsed.error,
      };
    }
    if (parsed.content) return { type: "content", text: parsed.content };
  } catch {
    /* skip malformed */
  }
  return { type: "skip" };
}

const DEFAULT_GREETING =
  "こんにちは！何でも聞いてください。";

type ChatPanelProps = {
  greetingMessage?: string | null;
};

export function ChatPanel({ greetingMessage }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>(() => [
    { role: "assistant", content: greetingMessage || DEFAULT_GREETING },
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const messagesRef = useRef(messages);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    if (scrollTimerRef.current) return;
    scrollTimerRef.current = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      scrollTimerRef.current = null;
    }, 100);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  const handleSend = useCallback(
    async (content: string) => {
      setError(null);

      const userMessage: ChatMessageType = { role: "user", content };

      // Build API messages before state updates (React 18 batches updaters)
      const apiMessages = [
        ...messagesRef.current.slice(1),
        userMessage,
      ].map((m) => ({ role: m.role, content: m.content }));

      setMessages((prev) => {
        const updated = [...prev, userMessage];
        messagesRef.current = updated;
        return updated;
      });
      setIsStreaming(true);

      setMessages((prev) => {
        const updated = [...prev, { role: "assistant" as const, content: "" }];
        messagesRef.current = updated;
        return updated;
      });

      try {
        abortRef.current = new AbortController();
        const res = await fetch(`${CMS_PUBLIC_API_URL}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
          },
          body: JSON.stringify({ messages: apiMessages }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) {
          const errorBody = await res.json().catch(() => null);
          const errorMsg =
            res.status === 422
              ? "入力内容に問題があります。"
              : res.status === 429
                ? "リクエストが多すぎます。しばらくお待ちください。"
                : "エラーが発生しました。もう一度お試しください。";
          setError(errorBody?.message || errorBody?.error || errorMsg);
          setMessages((prev) => prev.slice(0, -1));
          setIsStreaming(false);
          return;
        }

        const reader = res.body?.getReader();
        if (!reader) {
          setError("ストリームの読み取りに失敗しました。");
          setMessages((prev) => prev.slice(0, -1));
          setIsStreaming(false);
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const result = parseSSELine(line);
            switch (result.type) {
              case "content":
                accumulated += result.text;
                setMessages((prev) => {
                  const next = [...prev];
                  const last = next[next.length - 1];
                  if (last && last.role === "assistant") {
                    next[next.length - 1] = { ...last, content: accumulated };
                  }
                  return next;
                });
                break;
              case "error":
                setError(result.message);
                break;
            }
          }
        }

        if (buffer.trim()) {
          const result = parseSSELine(buffer);
          if (result.type === "content") {
            accumulated += result.text;
            setMessages((prev) => {
              const next = [...prev];
              const last = next[next.length - 1];
              if (last && last.role === "assistant") {
                next[next.length - 1] = { ...last, content: accumulated };
              }
              return next;
            });
          } else if (result.type === "error") {
            setError(result.message);
          }
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          // User cancelled, no error
        } else {
          setError("通信エラーが発生しました。もう一度お試しください。");
          setMessages((prev) => prev.slice(0, -1));
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [],
  );

  return (
    <div className="flex flex-col h-full bg-surface-raised rounded-t-2xl sm:rounded-2xl shadow-2xl border border-slate-200/60 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
          <ChatBubbleIcon className="w-4 h-4 text-accent" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-900">AI アシスタント</p>
          <p className="text-xs text-slate-500">何でも聞いてください</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
        {isStreaming &&
          messages[messages.length - 1]?.content === "" && (
            <div className="flex justify-start mb-3">
              <div className="px-4 py-2.5 rounded-2xl rounded-bl-md bg-surface-muted">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
        {error && (
          <div className="mb-3 px-4 py-2 rounded-xl bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSend} disabled={isStreaming} />
    </div>
  );
}
