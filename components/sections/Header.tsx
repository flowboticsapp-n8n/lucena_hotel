"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { useLenis } from "lenis/react";
import { hotel } from "@/content/hotel";
import { Logo } from "@/components/ui/Logo";
import { buttonClass } from "@/components/ui/Button";

export function Header({ solid = false }: { solid?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filled = solid || scrolled || open;

  return (
    <>
      <header
        className="header-in fixed inset-x-0 top-0 z-50 text-white transition-[background-color,backdrop-filter] duration-300"
        style={{
          backgroundColor: solid
            ? "rgb(5,5,5)"
            : filled
              ? "rgba(5,5,5,.8)"
              : "rgba(5,5,5,0)",
          backdropFilter: filled ? "blur(10px)" : "blur(0px)",
          WebkitBackdropFilter: filled ? "blur(10px)" : "blur(0px)",
        }}
      >
        <div className="mx-auto flex h-[72px] max-w-site items-center justify-between px-5 sm:px-8">
          <Logo />
          <nav
            className="hidden items-center gap-9 md:flex"
            aria-label="Principal"
          >
            {hotel.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative py-1 text-[15px] text-white/85 transition-colors hover:text-white after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/reservar/"
              prefetch={false}
              className={buttonClass(
                "light",
                "hidden h-10 px-5 sm:inline-flex",
              )}
            >
              Reservar
            </Link>
            <button
              type="button"
              className="-mr-2 grid size-11 place-items-center md:hidden"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="menu-movel"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 h-px w-6 bg-white transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 h-px w-6 bg-white transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <m.div
            id="menu-movel"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 top-[72px] z-40 flex flex-col bg-ink text-white px-5 pb-10 pt-6 md:hidden"
          >
            <nav className="flex flex-col" aria-label="Menu móvel">
              {hotel.nav.map((item, i) => (
                <m.div
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.12 + i * 0.05,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-white/10 py-5 text-[32px] font-semibold tracking-[-0.04em]"
                  >
                    {item.label}
                    <span className="text-lg font-normal text-white/60">
                      0{i + 1}
                    </span>
                  </Link>
                </m.div>
              ))}
            </nav>
            <m.div
              className="mt-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <Link
                href="/reservar/"
                prefetch={false}
                onClick={() => setOpen(false)}
                className={buttonClass("light", "w-full")}
              >
                Reservar
              </Link>
              <p className="mt-6 text-center text-[14px] text-white/65">
                {hotel.contact.phone} · {hotel.contact.email}
              </p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
