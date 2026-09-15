/**
 * Global AI assistance widget — OctalCode-style FAB + slide-over chat.
 * Answers are grounded in approved site FAQ / company content.
 */

import { ArrowRight, Mail, Calendar, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { LogoGlyph } from "@/components/brand/LogoGlyph";
import { ASSISTANT } from "@/content/assistant";
import { answerAssistantQuestion } from "@/lib/assistantKnowledge";

import styles from "./AiAssistant.module.css";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const WELCOME: ChatMessage = {
  role: "assistant",
  content: ASSISTANT.welcome,
};

function linkify(text: string) {
  const parts = text.split(/(\/[a-z0-9/-]+|mailto:[^\s]+|https?:\/\/[^\s]+)/gi);
  return parts.map((part, i) => {
    if (part.startsWith("mailto:")) {
      return (
        <a key={i} href={part}>
          {part.replace(/^mailto:/i, "")}
        </a>
      );
    }
    if (part.startsWith("http")) {
      return (
        <a key={i} href={part} target="_blank" rel="noreferrer">
          {part}
        </a>
      );
    }
    if (part.startsWith("/") && part.length > 1 && !part.includes(" ")) {
      return (
        <Link key={i} to={part}>
          {part}
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading, open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setShowBadge(false);
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const send = (raw?: string) => {
    const text = (raw ?? draft).trim();
    if (!text || loading) return;

    const next: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setDraft("");
    setLoading(true);

    window.setTimeout(() => {
      const reply = answerAssistantQuestion(text);
      setMessages([...next, { role: "assistant", content: reply }]);
      setLoading(false);
    }, 420 + Math.min(text.length * 8, 480));
  };

  const showSuggestions = messages.length <= 1 && !loading;

  return (
    <div className={styles.root} data-ai-assistant>
      <button
        type="button"
        className={`${styles.fab} ${open ? styles.fabHidden : ""}`}
        aria-label={ASSISTANT.fabLabel}
        aria-expanded={open}
        aria-controls={titleId}
        onClick={() => setOpen(true)}
      >
        <span className={styles.fabPulse} aria-hidden />
        <span className={styles.fabRing} aria-hidden />
        <LogoGlyph size={34} className={styles.fabLogo} />
        {showBadge ? <span className={styles.fabBadge} aria-hidden /> : null}
      </button>

      {!open ? (
        <div className={styles.pill} aria-hidden>
          <span className={styles.pillDot} />
          <span className={styles.pillCopy}>
            <strong>{ASSISTANT.pillTitle}</strong>
            <em>{ASSISTANT.pillSub}</em>
          </span>
        </div>
      ) : null}

      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <aside
        id={titleId}
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={ASSISTANT.name}
        aria-hidden={!open}
      >
        <header className={styles.header}>
          <div className={styles.headerMain}>
            <div className={styles.headerMark} aria-hidden>
              <LogoGlyph size={28} />
            </div>
            <div>
              <h2 className={styles.headerTitle}>{ASSISTANT.name}</h2>
              <p className={styles.headerStatus}>
                <span className={styles.statusDot} aria-hidden />
                {ASSISTANT.status}
              </p>
            </div>
          </div>
          <button
            type="button"
            className={styles.close}
            aria-label="Close chat"
            onClick={() => setOpen(false)}
          >
            <X size={14} strokeWidth={2.2} />
          </button>
          <p className={styles.headerMeta}>
            {ASSISTANT.meta.map((item) => (
              <span key={item}>· {item}</span>
            ))}
          </p>
        </header>

        <div ref={listRef} className={styles.messages}>
          {messages.map((msg, i) => (
            <div
              key={`${msg.role}-${i}`}
              className={msg.role === "user" ? styles.msgUser : styles.msgBot}
            >
              <div className={styles.bubble}>{linkify(msg.content)}</div>
            </div>
          ))}

          {loading ? (
            <div className={styles.msgBot}>
              <div className={`${styles.bubble} ${styles.typing}`} aria-label="Assistant is typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          ) : null}

          {showSuggestions ? (
            <div className={styles.suggestions}>
              <span className={styles.suggestionsLabel}>· Suggested</span>
              <div className={styles.suggestionRow}>
                {ASSISTANT.suggestions.map((item) => (
                  <button key={item} type="button" onClick={() => send(item)}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <footer className={styles.footer}>
          <form
            className={styles.composer}
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <textarea
              value={draft}
              rows={1}
              placeholder={ASSISTANT.placeholder}
              aria-label="Your question"
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
            />
            <button
              type="submit"
              className={styles.send}
              disabled={loading || !draft.trim()}
              aria-label="Send message"
            >
              <ArrowRight size={16} strokeWidth={2.4} />
            </button>
          </form>

          <div className={styles.actions}>
            <Link to={ASSISTANT.bookTo} className={styles.actionGhost} onClick={() => setOpen(false)}>
              <Calendar size={12} strokeWidth={2} aria-hidden />
              {ASSISTANT.bookLabel}
            </Link>
            <a href={ASSISTANT.emailHref} className={styles.actionSolid}>
              <Mail size={12} strokeWidth={2} aria-hidden />
              {ASSISTANT.emailLabel}
            </a>
          </div>
        </footer>
      </aside>
    </div>
  );
}
