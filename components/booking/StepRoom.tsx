"use client";

import { formatBRL } from "@/content/hotel";
import { Img } from "@/components/ui/Img";
import { buttonClass } from "@/components/ui/Button";
import { pluralNights, type RoomOffer } from "@/lib/booking";

type Props = {
  offers: RoomOffer[] | null;
  error: string | null;
  preferredId?: string;
  onSelect: (offer: RoomOffer) => void;
  onBack: () => void;
  onRetry: () => void;
};

export function StepRoom({
  offers,
  error,
  preferredId,
  onSelect,
  onBack,
  onRetry,
}: Props) {
  const preferred =
    preferredId && offers?.find((o) => o.room.id === preferredId);
  const preferredMissing =
    preferredId && offers && (!preferred || !preferred.available);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-[22px] font-semibold tracking-[-0.03em]">
            Escolha seu quarto
          </h2>
          <p className="mt-1 text-[15px] text-muted">
            Mostrando apenas quartos que comportam o seu grupo.
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-[15px] underline underline-offset-4"
        >
          Alterar datas
        </button>
      </div>

      {preferredMissing && (
        <p className="mt-6 border-l-2 border-navy bg-card px-4 py-3 text-[15px]">
          O quarto que você escolheu não está disponível para essas datas ou não
          comporta o grupo. Veja as alternativas abaixo.
        </p>
      )}

      {error && (
        <div className="mt-8 bg-card p-8 text-center">
          <p>{error}</p>
          <button
            type="button"
            className={buttonClass("dark", "mt-5")}
            onClick={onRetry}
          >
            Tentar novamente
          </button>
        </div>
      )}

      <div className="mt-8 grid gap-6" aria-busy={!offers}>
        {!offers && !error && [0, 1].map((i) => <Skeleton key={i} />)}
        {offers?.length === 0 && (
          <p className="bg-card p-8 text-center">
            Nenhum quarto comporta esse número de hóspedes.
          </p>
        )}
        {offers?.map((offer) => (
          <article
            key={offer.room.id}
            className={`grid bg-card md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] ${offer.room.id === preferredId && offer.available ? "outline-2 outline-navy" : ""} ${offer.available ? "" : "opacity-70"}`}
          >
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[300px]">
              <Img
                photo={offer.room.photo}
                alt={offer.room.name}
                sizes="(min-width: 768px) 460px, 100vw"
                className={`absolute inset-0 size-full object-cover ${offer.available ? "" : "grayscale"}`}
              />
              {!offer.available && (
                <span className="label absolute left-4 top-4 bg-white px-3 py-2 text-ink">
                  Esgotado
                </span>
              )}
            </div>
            <div className="flex flex-col p-6 sm:p-8">
              <p className="label text-muted">{offer.room.category}</p>
              <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.03em]">
                {offer.room.name}
              </h3>
              <p className="mt-2 text-[15px] text-muted">
                {offer.room.size} m² · até {offer.room.capacity} pessoas ·{" "}
                {offer.room.beds}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {offer.room.amenities.map((a) => (
                  <li
                    key={a}
                    className="border border-ink/10 bg-white px-3 py-1.5 text-[13px]"
                  >
                    {a}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
                <div>
                  <p className="text-[15px] text-muted">
                    <span className="font-semibold text-ink">
                      {formatBRL(offer.pricePerNight)}
                    </span>{" "}
                    / noite
                  </p>
                  <p className="mt-1 text-[20px] font-semibold tracking-[-0.03em] tabular-nums">
                    {pluralNights(offer.nights)} · {formatBRL(offer.total)}
                  </p>
                </div>
                {offer.available ? (
                  <button
                    type="button"
                    className={buttonClass("dark")}
                    onClick={() => onSelect(offer)}
                  >
                    Selecionar
                  </button>
                ) : (
                  <span className="text-[14px] text-muted">
                    Sem disponibilidade nessas datas
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="grid animate-pulse bg-card md:grid-cols-[5fr_7fr]">
      <div className="aspect-[16/10] bg-line md:aspect-auto md:min-h-[300px]" />
      <div className="space-y-4 p-8">
        <div className="h-3 w-20 bg-line" />
        <div className="h-6 w-48 bg-line" />
        <div className="h-4 w-64 bg-line" />
        <div className="h-8 w-full bg-line" />
      </div>
    </div>
  );
}
