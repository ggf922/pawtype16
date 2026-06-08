"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LOCALES, LOCALE_LABEL, Locale } from "../lib/i18n";

export default function LocaleSwitcher({ current }: { current: Locale }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchTo(loc: Locale) {
    const parts = pathname.split("/");
    parts[1] = loc;
    router.push(parts.join("/") || `/${loc}`);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="text-sm rounded-full border border-beige bg-white px-3 py-1.5 hover:bg-beige/40 transition"
        aria-haspopup="listbox"
      >
        🌐 {LOCALE_LABEL[current]}
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-40 rounded-2xl border border-beige bg-white shadow-lg py-2 z-50"
        >
          {LOCALES.map((loc) => (
            <li key={loc}>
              <button
                type="button"
                onClick={() => switchTo(loc)}
                className={`w-full text-start px-4 py-2 text-sm hover:bg-beige/40 ${
                  loc === current ? "font-semibold text-cocoa" : ""
                }`}
              >
                {LOCALE_LABEL[loc]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
