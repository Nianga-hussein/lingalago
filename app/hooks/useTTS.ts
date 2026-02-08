"use client";

import { useCallback, useRef, useState } from "react";

interface UseTTSOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
}

export function useTTS(options: UseTTSOptions = {}) {
  const { lang = "fr-FR", rate = 0.85, pitch = 1.0 } = options;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = pitch;

      // Try to find a French voice that sounds natural
      const voices = window.speechSynthesis.getVoices();
      const frenchVoice = voices.find(
        (v) => v.lang.startsWith("fr") && v.name.toLowerCase().includes("google")
      ) || voices.find((v) => v.lang.startsWith("fr"));

      if (frenchVoice) {
        utterance.voice = frenchVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [lang, rate, pitch]
  );

  const stop = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking };
}
