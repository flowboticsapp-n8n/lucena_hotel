import { formatBRL } from "@/content/hotel";
import { Img } from "@/components/ui/Img";
import {
  formatLong,
  pluralNights,
  type RoomOffer,
  type StayQuery,
} from "@/lib/booking";

const guestsLabel = (a: number, c: number) =>
  `${a} ${a === 1 ? "adulto" : "adultos"}${c ? ` · ${c} ${c === 1 ? "criança" : "crianças"}` : ""}`;

export function Summary({
  stay,
  offer,
  compact = false,
}: {
  stay: StayQuery;
  offer?: RoomOffer;
  compact?: boolean;
}) {
  return (
    <div className="bg-card">
      {offer && !compact && (
        <div className="aspect-[16/9] overflow-hidden">
          <Img
            photo={offer.room.photo}
            alt={offer.room.name}
            sizes="360px"
            className="size-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <p className="label text-muted">Sua reserva</p>
        {offer && (
          <p className="mt-3 text-[20px] font-semibold tracking-[-0.03em]">
            {offer.room.name}
          </p>
        )}
        <dl className="mt-5 text-[15px]">
          <Row label="Check-in" value={formatLong(stay.checkIn)} />
          <Row label="Check-out" value={formatLong(stay.checkOut)} />
          <Row
            label="Hóspedes"
            value={guestsLabel(stay.adults, stay.children)}
          />
          {offer && (
            <Row label="Diária" value={formatBRL(offer.pricePerNight)} />
          )}
        </dl>
        {offer && (
          <div className="mt-2 flex items-baseline justify-between border-t border-navy pt-4">
            <span className="font-medium">
              Total · {pluralNights(offer.nights)}
            </span>
            <span className="text-[22px] font-semibold tracking-[-0.03em] tabular-nums">
              {formatBRL(offer.total)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-t border-line py-3">
      <dt className="whitespace-nowrap text-muted">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}

export { guestsLabel };
