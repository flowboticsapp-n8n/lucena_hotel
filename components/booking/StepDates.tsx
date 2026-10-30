"use client";

import { DayPicker, type DateRange } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";
import { addMonths, startOfToday } from "date-fns";
import "react-day-picker/style.css";
import { buttonClass } from "@/components/ui/Button";
import { useMedia } from "@/components/motion/useMedia";
import {
  countNights,
  formatLong,
  pluralNights,
  toISODate,
} from "@/lib/booking";
import { Counter } from "./Counter";

type Props = {
  range: DateRange | undefined;
  onRange: (r: DateRange | undefined) => void;
  adults: number;
  childrenCount: number;
  onAdults: (n: number) => void;
  onChildren: (n: number) => void;
  onNext: () => void;
};

export function StepDates({
  range,
  onRange,
  adults,
  childrenCount,
  onAdults,
  onChildren,
  onNext,
}: Props) {
  const desktop = useMedia(
    "(min-width: 1180px), (min-width: 720px) and (max-width: 1023px)",
  );
  const today = startOfToday();
  const nights =
    range?.from && range?.to
      ? countNights(toISODate(range.from), toISODate(range.to))
      : 0;
  const ready = nights >= 1;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
      <div className="bg-card p-4 sm:p-8">
        <h2 className="text-[22px] font-semibold tracking-[-0.03em]">
          Quando você vem?
        </h2>
        <p className="mt-1 text-[15px] text-muted">
          Escolha a data de chegada e a de saída.
        </p>
        <DayPicker
          className="booking-calendar mt-6"
          mode="range"
          locale={ptBR}
          numberOfMonths={desktop ? 2 : 1}
          selected={range}
          onSelect={onRange}
          disabled={{ before: today }}
          startMonth={today}
          endMonth={addMonths(today, 18)}
          min={1}
          excludeDisabled
          resetOnSelect
          showOutsideDays={false}
        />
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-2 border-b border-line pb-5">
          <div>
            <p className="label text-muted">Chegada</p>
            <p className="mt-2 font-medium">
              {range?.from ? formatLong(toISODate(range.from)) : "—"}
            </p>
          </div>
          <div>
            <p className="label text-muted">Saída</p>
            <p className="mt-2 font-medium">
              {range?.to && nights ? formatLong(toISODate(range.to)) : "—"}
            </p>
          </div>
        </div>
        <div className="divide-y divide-line border-b border-line">
          <Counter
            label="Adultos"
            hint="13 anos ou mais"
            value={adults}
            min={1}
            max={4}
            onChange={onAdults}
          />
          <Counter
            label="Crianças"
            hint="Até 12 anos"
            value={childrenCount}
            min={0}
            max={3}
            onChange={onChildren}
          />
        </div>
        {adults + childrenCount > 4 && (
          <p className="mt-4 text-[14px] text-muted">
            Grupos acima de 4 pessoas: fale com a recepção para reservar mais de
            um quarto.
          </p>
        )}
        <button
          type="button"
          className={buttonClass("dark", "mt-8 w-full")}
          disabled={!ready || adults + childrenCount > 4}
          onClick={onNext}
        >
          {ready
            ? `Ver quartos · ${pluralNights(nights)}`
            : "Selecione as datas"}
        </button>
      </div>
    </div>
  );
}
