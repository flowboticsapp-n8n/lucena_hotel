"use client";

import { useCallback, useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import { bookingProvider, BookingError, toISODate, type Guest, type Reservation, type RoomOffer, type StayQuery } from "@/lib/booking";
import { Progress } from "./Progress";
import { StepDates } from "./StepDates";
import { StepRoom } from "./StepRoom";
import { StepGuest } from "./StepGuest";
import { StepConfirmation } from "./StepConfirmation";
import { Summary } from "./Summary";

type Step = 0 | 1 | 2 | 3;

export function BookingFlow() {
  const [step, setStep] = useState<Step>(0);
  const [range, setRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  // ?quarto=luxo vindo dos cards da home (só existe no cliente; o passo 1 não depende dele)
  const [preferredId] = useState(() =>
    typeof window === "undefined" ? undefined : (new URLSearchParams(window.location.search).get("quarto") ?? undefined),
  );
  const [offers, setOffers] = useState<RoomOffer[] | null>(null);
  const [offer, setOffer] = useState<RoomOffer>();
  const [guest, setGuest] = useState<Guest>();
  const [reservation, setReservation] = useState<Reservation>();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [step]);

  const stay: StayQuery | null =
    range?.from && range?.to ? { checkIn: toISODate(range.from), checkOut: toISODate(range.to), adults, children } : null;

  const search = useCallback(async () => {
    if (!stay) return;
    setOffers(null);
    setError(null);
    try {
      setOffers(await bookingProvider.searchAvailability(stay));
    } catch (e) {
      setError(e instanceof BookingError ? e.message : "Não foi possível consultar a disponibilidade.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stay?.checkIn, stay?.checkOut, adults, children]);

  const goRooms = () => {
    setStep(1);
    search();
  };

  const confirm = async (g: Guest) => {
    if (!stay || !offer) return;
    setGuest(g);
    setSubmitting(true);
    setError(null);
    try {
      const r = await bookingProvider.createReservation({ ...stay, roomId: offer.room.id, guest: g });
      setReservation(r);
      setStep(3);
    } catch (e) {
      setError(e instanceof BookingError ? e.message : "Não foi possível concluir a reserva. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setRange(undefined);
    setOffer(undefined);
    setOffers(null);
    setGuest(undefined);
    setReservation(undefined);
    setError(null);
    setStep(0);
  };

  return (
    <>
      <div className="mb-10 lg:mb-14">
        <Progress step={step} />
      </div>

      {step === 0 && (
        <StepDates
          range={range}
          onRange={setRange}
          adults={adults}
          childrenCount={children}
          onAdults={setAdults}
          onChildren={setChildren}
          onNext={goRooms}
        />
      )}

      {step === 1 && stay && (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
          <StepRoom
            offers={offers}
            error={error}
            preferredId={preferredId}
            onBack={() => setStep(0)}
            onRetry={search}
            onSelect={(o) => {
              setOffer(o);
              setError(null);
              setStep(2);
            }}
          />
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Summary stay={stay} />
            </div>
          </aside>
        </div>
      )}

      {step === 2 && stay && offer && (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          <div className="order-2 lg:order-1">
            <StepGuest defaultValues={guest} submitting={submitting} error={error} onSubmit={confirm} onBack={() => setStep(1)} />
          </div>
          <aside className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <Summary stay={stay} offer={offer} />
            </div>
          </aside>
        </div>
      )}

      {step === 3 && reservation && <StepConfirmation reservation={reservation} onNew={reset} />}
    </>
  );
}
