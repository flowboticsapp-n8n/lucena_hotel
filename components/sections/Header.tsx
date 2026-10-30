"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { hotel } from "@/content/hotel";
import { Logo } from "@/components/ui/Logo";
import { buttonClass } from "@/components/ui/Button";

export function Header({ solid = false }: { solid?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 text-white ${solid ? "bg-ink" : ""}`}>
      <div className="mx-auto flex h-[72px] max-w-site items-center justify-between px-5 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-9 md:flex" aria-label="Principal">
          {hotel.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-[15px] text-white/85 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/reservar/" className={buttonClass("light", "hidden h-10 px-5 sm:inline-flex")}>
            Reservar
          </Link>
          <button
            type="button"
            className="-mr-2 grid size-11 place-items-center md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-6">
              <span className={`absolute left-0 h-px w-6 bg-white transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-6 bg-white transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-[72px] bg-ink px-5 pt-8 md:hidden">
          <nav className="flex flex-col" aria-label="Menu móvel">
            {hotel.nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-white/10 py-5 text-3xl font-semibold tracking-[-0.04em]">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/reservar/" onClick={() => setOpen(false)} className={buttonClass("light", "mt-10 w-full")}>
            Reservar
          </Link>
        </div>
      )}
    </header>
  );
}
