'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Volume2, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

export interface PhraseRow {
  fi: string;
  kk: string;
  ru: string;
  kkAudio?: string;
  ruAudio?: string;
}

export interface PhraseGroup {
  label: string;
  phrases: PhraseRow[];
  playAll?: boolean;
}

interface LanguageTableProps {
  groups: PhraseGroup[];
  colFi: string;
  colKk: string;
  colRu: string;
  playAllLabel?: string;
}

// ─── Module-level audio singleton ────────────────────────────────────────────
// Only one thing plays at a time. resetCurrentPlaying stops the owner's visual
// state and must be called before any new session starts.

let currentAudio: HTMLAudioElement | null = null;
let resetCurrentPlaying: (() => void) | null = null;

function stopCurrent() {
  resetCurrentPlaying?.();
  resetCurrentPlaying = null;
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

// ─── Web Speech API helpers (fallback) ───────────────────────────────────────

function toNativeScript(text: string): string {
  return text.replace(/\s*\([^)]+\)/g, '').trim();
}

function toRomanization(text: string): string | null {
  return text.match(/\(([^)]+)\)/)?.[1] ?? null;
}

// ─── SpeakButton ─────────────────────────────────────────────────────────────

function SpeakButton({
  text,
  bcp47,
  colLabel,
  audioUrl,
}: {
  text: string;
  bcp47: string;
  colLabel: string;
  audioUrl?: string;
}) {
  const [supported, setSupported] = useState(false);
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);

  const setPlayingSync = useCallback((value: boolean) => {
    playingRef.current = value;
    setPlaying(value);
  }, []);

  useEffect(() => {
    setSupported(
      !!audioUrl ||
        (typeof window !== 'undefined' && 'speechSynthesis' in window),
    );
  }, [audioUrl]);

  const speak = useCallback(() => {
    if (audioUrl) {
      if (playingRef.current) { stopCurrent(); setPlayingSync(false); return; }
      stopCurrent();
      const audio = new Audio(audioUrl);
      currentAudio = audio;
      resetCurrentPlaying = () => setPlayingSync(false);
      const cleanup = () => {
        if (currentAudio === audio) { currentAudio = null; resetCurrentPlaying = null; }
        setPlayingSync(false);
      };
      audio.onended = cleanup;
      audio.onerror = cleanup;
      setPlayingSync(true);
      audio.play().catch(cleanup);
      return;
    }

    if (!('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    if (playingRef.current) { synth.cancel(); setPlayingSync(false); return; }
    const voices = synth.getVoices();
    const hasNativeVoice = voices.some((v) => v.lang.startsWith(bcp47.split('-')[0]));
    const spokenText = hasNativeVoice
      ? toNativeScript(text)
      : (toRomanization(text) ?? toNativeScript(text));
    const utter = new SpeechSynthesisUtterance(spokenText);
    if (hasNativeVoice) utter.lang = bcp47;
    utter.rate = 0.85;
    utter.onstart = () => setPlayingSync(true);
    utter.onend = () => setPlayingSync(false);
    utter.onerror = () => setPlayingSync(false);
    synth.cancel();
    setTimeout(() => { if (synth.paused) synth.resume(); synth.speak(utter); }, 50);
  }, [text, bcp47, audioUrl, setPlayingSync]);

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={speak}
      aria-label={colLabel}
      aria-pressed={playing}
      className={cn(
        'relative overflow-hidden shrink-0 inline-flex items-center justify-center rounded-full',
        'text-muted-foreground/50 transition-colors duration-150',
        'hover:text-primary hover:bg-primary/10',
        'active:scale-90 touch-manipulation select-none',
        'size-10 sm:size-7 -my-1 sm:-my-1',
        playing && 'text-primary bg-primary/15',
      )}
    >
      {playing && (
        <span
          className="absolute inset-0 rounded-full bg-primary/30 animate-ping"
          style={{ animationDuration: '1.2s' }}
          aria-hidden
        />
      )}
      <Volume2
        className={cn(
          'relative size-4 sm:size-3.5 transition-transform duration-150',
          playing && 'scale-110',
        )}
        aria-hidden
      />
    </button>
  );
}

// ─── PlayLangButton ───────────────────────────────────────────────────────────

function PlayLangButton({
  phrases,
  lang,
  label,
}: {
  phrases: PhraseRow[];
  lang: 'kk' | 'ru';
  label: string;
}) {
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);

  const setPlayingSync = useCallback((value: boolean) => {
    playingRef.current = value;
    setPlaying(value);
  }, []);

  const handleClick = useCallback(() => {
    if (playingRef.current) { stopCurrent(); setPlayingSync(false); return; }

    const urls = phrases
      .map((p) => (lang === 'kk' ? p.kkAudio : p.ruAudio))
      .filter((u): u is string => !!u);
    if (urls.length === 0) return;

    stopCurrent();

    let active = true;
    resetCurrentPlaying = () => { active = false; setPlayingSync(false); };
    setPlayingSync(true);

    function next(index: number) {
      if (!active || index >= urls.length) {
        if (active) { active = false; resetCurrentPlaying = null; currentAudio = null; setPlayingSync(false); }
        return;
      }
      const audio = new Audio(urls[index]);
      currentAudio = audio;
      const done = () => {
        if (!active) return;
        if (currentAudio === audio) currentAudio = null;
        next(index + 1);
      };
      audio.onended = done;
      audio.onerror = done;
      audio.play().catch(done);
    }

    next(0);
  }, [phrases, lang, setPlayingSync]);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={playing}
      aria-label={label}
      className={cn(
        'relative overflow-hidden inline-flex items-center gap-1.5 rounded-full',
        'px-3 py-1.5 text-xs font-medium',
        'text-muted-foreground/60 transition-colors duration-150',
        'hover:text-primary hover:bg-primary/10',
        'active:scale-95 touch-manipulation select-none',
        playing && 'text-primary bg-primary/15',
      )}
    >
      {playing && (
        <span
          className="absolute inset-0 bg-primary/20 animate-ping"
          style={{ animationDuration: '1.4s' }}
          aria-hidden
        />
      )}
      <Volume2
        className={cn(
          'relative size-3.5 shrink-0 transition-transform duration-150',
          playing && 'scale-110',
        )}
        aria-hidden
      />
      <span className="relative whitespace-nowrap">{label}</span>
    </button>
  );
}

// ─── MobileGroup ─────────────────────────────────────────────────────────────
// Collapsible accordion item. First group starts expanded.

function MobileGroup({
  group,
  gi,
  colKk,
  colRu,
  playAllLabel,
}: {
  group: PhraseGroup;
  gi: number;
  colKk: string;
  colRu: string;
  playAllLabel?: string;
}) {
  const [open, setOpen] = useState(gi === 0);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left touch-manipulation"
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
          {group.label}
        </span>
        <ChevronDown
          className={cn(
            'size-4 text-muted-foreground/40 transition-transform duration-200 shrink-0',
            open && 'rotate-180',
          )}
          aria-hidden
        />
      </button>

      {/* Smooth height animation via CSS grid row */}
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-3">
            {group.phrases.map((row, pi) => (
              <div
                key={row.fi}
                className={cn('py-3', pi > 0 && 'border-t border-border/40')}
              >
                <p className="text-sm font-medium text-foreground mb-2">{row.fi}</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="flex-1 min-w-0 text-sm text-muted-foreground leading-snug">
                      {row.kk}
                    </span>
                    <SpeakButton text={row.kk} bcp47="kk-KZ" colLabel={colKk} audioUrl={row.kkAudio} />
                  </div>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="flex-1 min-w-0 text-sm text-muted-foreground leading-snug">
                      {row.ru}
                    </span>
                    <SpeakButton text={row.ru} bcp47="ru-RU" colLabel={colRu} audioUrl={row.ruAudio} />
                  </div>
                </div>
              </div>
            ))}

            {group.playAll && playAllLabel && (
              <div className="flex gap-2 pt-3 border-t border-border/40">
                <PlayLangButton phrases={group.phrases} lang="kk" label={playAllLabel} />
                <PlayLangButton phrases={group.phrases} lang="ru" label={playAllLabel} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Table ────────────────────────────────────────────────────────────────────

export default function LanguageTable({ groups, colFi, colKk, colRu, playAllLabel }: LanguageTableProps) {
  return (
    <Card className="py-0">
      <CardContent className="px-0">

        {/* ── Mobile: collapsible accordion (< sm) ── */}
        <div className="sm:hidden divide-y divide-border">
          {groups.map((group, gi) => (
            <MobileGroup
              key={gi}
              group={group}
              gi={gi}
              colKk={colKk}
              colRu={colRu}
              playAllLabel={playAllLabel}
            />
          ))}
        </div>

        {/* ── Desktop: full table (sm+) ── */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="p-3">{colFi}</th>
                <th className="p-3">{colKk}</th>
                <th className="p-3">{colRu}</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, gi) =>
                [
                  <tr key={`g-${gi}`}>
                    <td
                      colSpan={3}
                      className={cn(
                        'border-b border-border px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70',
                        gi === 0 ? 'pt-3' : 'pt-5',
                      )}
                    >
                      {group.label}
                    </td>
                  </tr>,
                  ...group.phrases.map((row) => (
                    <tr key={row.fi} className="border-b border-border last:border-b-0">
                      <td className="p-3 font-medium">{row.fi}</td>
                      <td className="p-3 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <span className="leading-snug">{row.kk}</span>
                          <SpeakButton text={row.kk} bcp47="kk-KZ" colLabel={colKk} audioUrl={row.kkAudio} />
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <span className="leading-snug">{row.ru}</span>
                          <SpeakButton text={row.ru} bcp47="ru-RU" colLabel={colRu} audioUrl={row.ruAudio} />
                        </div>
                      </td>
                    </tr>
                  )),
                  group.playAll && playAllLabel ? (
                    <tr key={`g-${gi}-playall`} className="border-b border-border last:border-b-0">
                      <td className="px-3 pb-3 pt-1" />
                      <td className="px-3 pb-3 pt-1">
                        <PlayLangButton phrases={group.phrases} lang="kk" label={playAllLabel} />
                      </td>
                      <td className="px-3 pb-3 pt-1">
                        <PlayLangButton phrases={group.phrases} lang="ru" label={playAllLabel} />
                      </td>
                    </tr>
                  ) : null,
                ]
              )}
            </tbody>
          </table>
        </div>

      </CardContent>
    </Card>
  );
}
