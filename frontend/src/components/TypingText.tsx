"use client";

import { useState, useEffect } from "react";

type TypingTextProps = {
  text: string;
  speed?: number;
  className?: string;
};

export function TypingText({ text, speed = 80, className = "" }: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayed}
      <span className={`typing-cursor ${done ? "opacity-0" : ""}`}>|</span>
    </span>
  );
}
