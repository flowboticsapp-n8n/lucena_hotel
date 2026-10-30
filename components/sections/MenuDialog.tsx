"use client";

import { useRef } from "react";
import { hotel, formatBRL } from "@/content/hotel";
import { buttonClass } from "@/components/ui/Button";

export function MenuDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const { restaurant } = hotel;
  return (
    <>
      <button
        type="button"
        className={buttonClass("dark", "mt-8")}
        onClick={() => ref.current?.showModal()}
      >
        {restaurant.cta}
      </button>
      <dialog
        ref={ref}
        className="m-auto max-h-[85svh] w-[min(640px,calc(100vw-32px))] overflow-y-auto bg-white p-0 text-ink backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
        onClick={(e) => e.target === ref.current && ref.current.close()}
        data-lenis-prevent
      >
        <div className="p-7 sm:p-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="label text-muted">Cardápio</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                {restaurant.name}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="-mr-2 grid size-11 place-items-center text-2xl"
              aria-label="Fechar cardápio"
            >
              ×
            </button>
          </div>
          {restaurant.menu.map((group) => (
            <div key={group.section} className="mt-9">
              <p className="label text-muted">{group.section}</p>
              <ul className="mt-3">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline justify-between gap-6 border-t border-line py-4"
                  >
                    <div>
                      <p className="font-semibold tracking-[-0.02em]">
                        {item.name}
                      </p>
                      <p className="mt-1 text-[14px] text-muted">{item.desc}</p>
                    </div>
                    <span className="shrink-0 font-medium tabular-nums">
                      {formatBRL(item.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </dialog>
    </>
  );
}
