"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ALL_QUESTIONS,
  Answers,
  OWNER_QUESTIONS,
  PET_QUESTIONS,
  computeScores,
} from "../../lib/quiz";
import { encodeShare } from "../../lib/share-code";
import { Locale, isLocale, t } from "../../lib/i18n";

type Step = "intro" | "transition" | "loading" | number;
type PetKind = "dog" | "cat";

const STORAGE_KEY = "pawtype16_progress";

export default function QuizPage() {
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const locale: Locale = isLocale(params?.locale) ? (params.locale as Locale) : "ko";

  const [petKind, setPetKind] = useState<PetKind>("dog");
  const [petName, setPetName] = useState("");
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Answers>({});
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.petName) {
          setPetKind(parsed.petKind ?? "dog");
          setPetName(parsed.petName);
          setAnswers(parsed.answers ?? {});
          if (typeof parsed.step === "number" && parsed.step > 0) {
            setStep(parsed.step);
            setRestored(true);
            setTimeout(() => setRestored(false), 3500);
          } else {
            setStep(typeof parsed.step === "number" ? parsed.step : "intro");
          }
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (step === "intro") return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ petKind, petName, answers, step })
      );
    } catch {}
  }, [petKind, petName, answers, step]);

  const totalQuestions = ALL_QUESTIONS.length;
  const progressIndex = typeof step === "number" ? step : 0;
  const progressPct = useMemo(
    () => Math.round((progressIndex / totalQuestions) * 100),
    [progressIndex, totalQuestions]
  );

  const current = typeof step === "number" ? ALL_QUESTIONS[step] : null;

  function selectOption(value: number) {
    if (!current) return;
    const next: Answers = { ...answers, [current.id]: value };
    setAnswers(next);

    setTimeout(() => {
      const nextIndex = (step as number) + 1;
      if (nextIndex === OWNER_QUESTIONS.length) {
        setStep("transition");
      } else if (nextIndex >= totalQuestions) {
        setStep("loading");
      } else {
        setStep(nextIndex);
      }
    }, 220);
  }

  function goPrev() {
    if (typeof step !== "number") return;
    if (step === 0) setStep("intro");
    else setStep(step - 1);
  }

  function skipQuestion() {
    if (!current) return;
    selectOption(0);
  }

  useEffect(() => {
    if (step !== "loading") return;
    const timer = setTimeout(async () => {
      try {
        await fetch("/api/save-result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ petKind, petName, answers }),
        });
      } catch {}

      const ownerScore = computeScores(answers, OWNER_QUESTIONS);
      const petScore = computeScores(answers, PET_QUESTIONS);
      const code = encodeShare({
        petKind,
        petName,
        owner: ownerScore,
        pet: petScore,
      });

      try { localStorage.removeItem(STORAGE_KEY); } catch {}
      try {
        localStorage.setItem(
          "pawtype16_last_result",
          JSON.stringify({ petKind, petName, answers, ts: Date.now() })
        );
      } catch {}

      router.push(`/${locale}/result?d=${code}`);
    }, 1800);
    return () => clearTimeout(timer);
  }, [step, petKind, petName, answers, router, locale]);

  if (step === "intro") {
    return (
      <QuizShell locale={locale}>
        <div className="max-w-md w-full mx-auto py-10 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-extrabold text-charcoal">
            {t(locale, "quiz_intro_title")}
          </h1>
          <p className="mt-2 text-charcoal/70 text-sm md:text-base">
            {t(locale, "quiz_intro_desc")}
          </p>

          <div className="mt-8">
            <label className="text-sm font-semibold text-charcoal">
              {t(locale, "quiz_intro_q1")}
            </label>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {(
                [
                  { v: "dog", emoji: "🐶", label: t(locale, "quiz_intro_dog") },
                  { v: "cat", emoji: "🐱", label: t(locale, "quiz_intro_cat") },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.v}
                  type="button"
                  onClick={() => setPetKind(opt.v)}
                  className={`rounded-2xl border-2 p-4 text-start transition ${
                    petKind === opt.v
                      ? "border-accent bg-orange-50"
                      : "border-beige bg-white hover:border-cocoa/30"
                  }`}
                >
                  <div className="text-3xl">{opt.emoji}</div>
                  <div className="mt-1 font-semibold">{opt.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="petName" className="text-sm font-semibold text-charcoal">
              {t(locale, "quiz_intro_q2")}
            </label>
            <input
              id="petName"
              type="text"
              maxLength={12}
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder={t(locale, "quiz_intro_placeholder")}
              className="mt-3 w-full rounded-2xl border-2 border-beige bg-white px-4 py-3 outline-none focus:border-accent transition"
            />
          </div>

          <button
            type="button"
            disabled={!petName.trim()}
            onClick={() => setStep(0)}
            className="mt-8 w-full rounded-full bg-accent text-white font-semibold py-4 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent/90 transition"
          >
            {t(locale, "quiz_intro_cta")}
          </button>

          <Link
            href={`/${locale}`}
            className="block mt-4 text-center text-sm text-charcoal/60 hover:text-cocoa"
          >
            {t(locale, "quiz_back_home")}
          </Link>
        </div>
      </QuizShell>
    );
  }

  if (step === "transition") {
    return (
      <QuizShell locale={locale}>
        <div className="max-w-md w-full mx-auto py-16 text-center animate-fade-in">
          <div className="text-6xl">🐾</div>
          <h2 className="mt-4 text-2xl font-bold">
            {t(locale, "quiz_transition_title", { name: petName })}
          </h2>
          <p className="mt-3 text-charcoal/70 leading-relaxed">
            {t(locale, "quiz_transition_desc", { name: petName })}
          </p>
          <button
            type="button"
            onClick={() => setStep(OWNER_QUESTIONS.length)}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent text-white font-semibold px-8 py-4 hover:bg-accent/90 transition"
          >
            {t(locale, "quiz_transition_cta")}
          </button>
        </div>
      </QuizShell>
    );
  }

  if (step === "loading") {
    return (
      <QuizShell locale={locale}>
        <div className="max-w-md w-full mx-auto py-20 text-center">
          <div className="text-5xl animate-paw-walk">🐾</div>
          <h2 className="mt-6 text-xl md:text-2xl font-bold">
            {t(locale, "quiz_loading", { name: petName })}
          </h2>
          <div className="mt-8 flex justify-center gap-2 text-3xl">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="animate-bounce"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                🐾
              </span>
            ))}
          </div>
        </div>
      </QuizShell>
    );
  }

  if (!current) return null;
  const sectionLabel =
    current.part === "owner"
      ? t(locale, "quiz_owner_label")
      : t(locale, "quiz_pet_label", { name: petName });

  // Localized question text (fallback: Korean text from quiz.ts).
  // For brevity in this MVP we keep the question wording in Korean,
  // but display localized options labels via i18n keys.
  const questionText = current.text(petName || "Buddy");

  return (
    <QuizShell locale={locale}>
      {restored && (
        <div className="fixed top-16 right-4 z-40 rounded-2xl bg-cocoa text-cream px-4 py-3 shadow-lg text-sm flex items-center gap-2 animate-fade-in">
          <span>🐾</span>
          <span>{t(locale, "quiz_restored")}</span>
        </div>
      )}
      <div className="max-w-xl w-full mx-auto py-6 md:py-10 animate-fade-in">
        <div className="flex items-center justify-between text-xs text-charcoal/60">
          <span>
            {progressIndex + 1} / {totalQuestions}
          </span>
          <span>{sectionLabel}</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-beige overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <h2 className="mt-8 md:mt-10 text-2xl md:text-3xl font-extrabold leading-snug">
          {questionText}
        </h2>

        <div className="mt-8 grid gap-3">
          {current.options.map((opt) => {
            const selected = answers[current.id] === opt.value;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => selectOption(opt.value)}
                className={`flex items-center gap-4 rounded-2xl border-2 px-4 py-4 text-start transition ${
                  selected
                    ? "border-accent bg-orange-50"
                    : "border-beige bg-white hover:border-cocoa/30 hover:bg-beige/30"
                }`}
              >
                <span className="text-2xl">{opt.emoji}</span>
                <span className="font-medium text-charcoal">{opt.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={goPrev}
            className="text-charcoal/60 hover:text-cocoa"
          >
            {t(locale, "quiz_prev")}
          </button>
          <button
            type="button"
            onClick={skipQuestion}
            className="text-charcoal/60 hover:text-cocoa"
          >
            {t(locale, "quiz_skip")}
          </button>
        </div>
      </div>
    </QuizShell>
  );
}

function QuizShell({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <main className="min-h-screen bg-cream">
      <header className="sticky top-0 z-30 backdrop-blur bg-cream/85 border-b border-beige">
        <div className="mx-auto max-w-6xl px-3 sm:px-5 h-14 flex items-center justify-between gap-2">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-1.5 font-bold text-cocoa whitespace-nowrap"
          >
            <span className="text-xl">🐾</span>
            <span>PawType-16</span>
          </Link>
          <Link
            href={`/${locale}`}
            className="text-sm text-charcoal/70 hover:text-cocoa"
          >
            {t(locale, "quiz_exit")}
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5">{children}</div>
    </main>
  );
}
