"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Room } from "@/content/hotel";
import { Img } from "@/components/ui/Img";
import { getLenis } from "@/components/motion/SmoothScroll";

/**
 * Foto do quarto que abre um carrossel em tela cheia.
 * O deslizar é scroll-snap nativo (swipe no celular sem JS de gesto);
 * o JS só cuida de botões, teclado (← →, Esc) e do contador.
 */
export function RoomGallery({
  room,
  children,
}: {
  room: Room;
  children: React.ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = [
    { photo: room.photo, caption: "Visão geral do quarto" },
    ...room.gallery,
  ];

  const goTo = useCallback(
    (i: number, smooth = true) => {
      const el = track.current;
      if (!el) return;
      const next = (i + slides.length) % slides.length;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      el.scrollTo({
        left: next * el.clientWidth,
        behavior: smooth && !reduce ? "smooth" : "auto",
      });
    },
    [slides.length],
  );

  const show = () => {
    setIndex(0);
    setOpen(true);
    dialog.current?.showModal();
  };

  const close = () => dialog.current?.close();

  // trava a rolagem da página enquanto o carrossel está aberto
  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    requestAnimationFrame(() => goTo(0, false));
    return () => {
      getLenis()?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open, goTo]);

  const onScroll = () => {
    const el = track.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") goTo(index + 1);
    if (e.key === "ArrowLeft") goTo(index - 1);
  };

  const navBtn =
    "absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center bg-white/90 text-navy-deep transition-colors hover:bg-white sm:grid";

  return (
    <>
      <button
        type="button"
        onClick={show}
        className="group/gallery relative block size-full cursor-zoom-in text-left"
        aria-label={`Ver ${slides.length} fotos: ${room.name}`}
      >
        {children}
        <span className="absolute bottom-3 right-3 flex items-center gap-2 bg-navy-deep/85 px-3 py-2 text-[13px] font-medium text-white transition-colors group-hover/gallery:bg-navy-deep">
          <svg
            viewBox="0 0 24 24"
            className="size-4 fill-none stroke-current stroke-[1.6]"
            aria-hidden
          >
            <rect x="3" y="5" width="18" height="14" />
            <path d="M3 15l5-5 4 4 3-3 6 6" />
          </svg>
          {slides.length} fotos
        </span>
      </button>

      <dialog
        ref={dialog}
        onClose={() => setOpen(false)}
        onKeyDown={onKeyDown}
        onClick={(e) => e.target === dialog.current && close()}
        aria-label={`Fotos: ${room.name}`}
        className="m-auto h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-navy-deep/95"
        data-lenis-prevent
      >
        {open && (
          <div
            className="flex h-full flex-col justify-center px-0 py-4 sm:px-6"
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between px-4 pb-3 text-white sm:px-0">
              <p className="text-[15px] font-medium">
                {room.name}
                <span
                  className="ml-3 tabular-nums text-white/60"
                  aria-live="polite"
                >
                  {index + 1} / {slides.length}
                </span>
              </p>
              <button
                type="button"
                onClick={close}
                className="-mr-2 grid size-11 place-items-center text-3xl leading-none"
                aria-label="Fechar fotos"
              >
                ×
              </button>
            </div>

            <div className="relative mx-auto w-full max-w-[1100px]">
              <div
                ref={track}
                onScroll={onScroll}
                className="flex h-[min(72svh,calc(min(100vw,1100px)*2/3))] w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {slides.map((s, i) => (
                  <figure
                    key={i}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} de ${slides.length}: ${s.caption}`}
                    className="relative h-full w-full shrink-0 snap-center"
                  >
                    <Img
                      photo={s.photo}
                      alt={s.caption}
                      loading={i === 0 ? "eager" : "lazy"}
                      sizes="(min-width: 1100px) 1100px, 100vw"
                      className="size-full object-contain"
                      // o enquadramento (position) é para recortes "cover"; aqui a foto aparece inteira
                      style={{ objectPosition: "center" }}
                    />
                  </figure>
                ))}
              </div>
              <button
                type="button"
                className={`${navBtn} left-3`}
                onClick={() => goTo(index - 1)}
                aria-label="Foto anterior"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5 fill-none stroke-current stroke-2"
                  aria-hidden
                >
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              <button
                type="button"
                className={`${navBtn} right-3`}
                onClick={() => goTo(index + 1)}
                aria-label="Próxima foto"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5 fill-none stroke-current stroke-2"
                  aria-hidden
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <p className="mx-auto mt-4 w-full max-w-[1100px] px-4 text-center text-[15px] text-white/85 sm:px-0">
              {slides[index]?.caption}
            </p>

            <div
              className="mx-auto mt-5 flex justify-center gap-2"
              role="group"
              aria-label="Escolher foto"
            >
              {slides.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  aria-current={i === index}
                  aria-label={`Foto ${i + 1}: ${s.caption}`}
                  onClick={() => goTo(i)}
                  className="grid size-8 place-items-center"
                >
                  <span
                    className={`block h-[3px] transition-all duration-300 ${i === index ? "w-6 bg-gold" : "w-3 bg-white/40"}`}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
