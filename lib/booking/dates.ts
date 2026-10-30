import { differenceInCalendarDays, eachDayOfInterval, format, parseISO, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { ISODate } from "./types";

export const toISODate = (d: Date): ISODate => format(d, "yyyy-MM-dd");
export const fromISODate = (s: ISODate) => parseISO(s);

export const countNights = (checkIn: ISODate, checkOut: ISODate) =>
  differenceInCalendarDays(parseISO(checkOut), parseISO(checkIn));

/** Noites da estadia (a data de check-out não conta). */
export const stayNights = (checkIn: ISODate, checkOut: ISODate) =>
  eachDayOfInterval({ start: parseISO(checkIn), end: subDays(parseISO(checkOut), 1) });

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const formatLong = (s: ISODate) => capitalize(format(parseISO(s), "EEE, d 'de' MMM 'de' yyyy", { locale: ptBR }));
export const formatShort = (s: ISODate) => format(parseISO(s), "d MMM", { locale: ptBR });

export const pluralNights = (n: number) => `${n} ${n === 1 ? "noite" : "noites"}`;
