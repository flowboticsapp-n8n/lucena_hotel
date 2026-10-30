"use client";

import Link from "next/link";
import { hotel, formatBRL } from "@/content/hotel";
import { buttonClass } from "@/components/ui/Button";
import { formatLong, pluralNights, type Reservation } from "@/lib/booking";
import { downloadICS } from "@/lib/ics";
import { guestsLabel } from "./Summary";

export function StepConfirmation({
  reservation: r,
  onNew,
}: {
  reservation: Reservation;
  onNew: () => void;
}) {
  const rows: [string, string][] = [
    ["Quarto", r.roomName],
    [
      "Check-in",
      `${formatLong(r.checkIn)} · a partir das ${hotel.contact.checkIn}`,
    ],
    ["Check-out", `${formatLong(r.checkOut)} · até ${hotel.contact.checkOut}`],
    ["Hóspedes", guestsLabel(r.adults, r.children)],
    ["Diária", formatBRL(r.pricePerNight)],
    ["Titular", r.guest.name],
    ["E-mail", r.guest.email],
    ["Telefone", r.guest.phone],
  ];
  if (r.guest.requests) rows.push(["Pedidos especiais", r.guest.requests]);

  return (
    <div className="mx-auto max-w-[720px]">
      <div className="text-center">
        <div
          className="mx-auto grid size-14 place-items-center bg-navy text-white"
          aria-hidden
        >
          <svg
            viewBox="0 0 24 24"
            className="size-6 fill-none stroke-current stroke-2"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        <p className="label mt-8 text-muted">Reserva confirmada</p>
        <h2 className="h-section mt-4">
          Até breve, {r.guest.name.split(" ")[0]}!
        </h2>
        <p className="mt-4 text-[17px] text-muted">
          Enviamos os detalhes para{" "}
          <strong className="font-medium text-ink">{r.guest.email}</strong>.
        </p>
      </div>

      <div className="mt-12 bg-card p-6 sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy pb-6">
          <div>
            <p className="label text-muted">Código da reserva</p>
            <p className="mt-2 font-mono text-[28px] font-semibold tracking-[0.04em]">
              {r.code}
            </p>
          </div>
          <div className="sm:text-right">
            <p className="label text-muted">Total · {pluralNights(r.nights)}</p>
            <p className="mt-2 text-[28px] font-semibold tracking-[-0.03em] tabular-nums">
              {formatBRL(r.total)}
            </p>
          </div>
        </div>
        <dl className="text-[15px]">
          {rows.map(([k, v]) => (
            <div
              key={k}
              className="grid gap-1 border-b border-line py-3 sm:grid-cols-[160px_1fr]"
            >
              <dt className="text-muted">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 border-l-2 border-navy bg-white px-4 py-3 text-[15px]">
          <strong className="font-semibold">Pagamento no check-in</strong> (modo
          demonstração) — nenhuma cobrança foi feita.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className={buttonClass("dark")}
            onClick={() => downloadICS(r)}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4 fill-none stroke-current stroke-2"
              aria-hidden
            >
              <rect x="3" y="5" width="18" height="16" />
              <path d="M3 10h18M8 3v4M16 3v4" />
            </svg>
            Adicionar ao calendário
          </button>
          <a
            href={hotel.contact.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className={buttonClass("outline-dark")}
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-6 text-[15px]">
        <Link href="/" className="underline underline-offset-4">
          Voltar ao site
        </Link>
        <button
          type="button"
          onClick={onNew}
          className="underline underline-offset-4"
        >
          Fazer outra reserva
        </button>
      </div>
    </div>
  );
}
