import { getDayOfYear } from "date-fns";
import { hotel } from "@/content/hotel";
import { countNights, stayNights } from "./dates";
import {
  BookingError,
  type BookingProvider,
  type Reservation,
  type ReservationInput,
  type RoomOffer,
  type StayQuery,
} from "./types";

const LATENCY_MS = 600;
const wait = (ms = LATENCY_MS) => new Promise((r) => setTimeout(r, ms));

/**
 * Esgotamento determinístico: o mesmo dia está sempre esgotado para o mesmo quarto,
 * então a demo é reproduzível (ex.: o Luxo esgota em ~1 a cada 6 noites).
 */
const SOLD_OUT_RULES: Record<string, (dayOfYear: number) => boolean> = {
  luxo: (d) => (d * 7) % 6 === 0,
  suite: (d) => (d * 5) % 23 === 0,
};

const isSoldOut = (roomId: string, night: Date) => SOLD_OUT_RULES[roomId]?.(getDayOfYear(night)) ?? false;

const CODE_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // sem 0/O/1/I
const newCode = () =>
  "HTL-" + Array.from({ length: 5 }, () => CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)]).join("");

export class MockBookingProvider implements BookingProvider {
  private reservations = new Map<string, Reservation>();

  private offer(roomId: string, q: StayQuery): RoomOffer {
    const room = hotel.rooms.find((r) => r.id === roomId);
    if (!room) throw new BookingError("Quarto não encontrado", "NOT_FOUND");
    const nights = countNights(q.checkIn, q.checkOut);
    const available = !stayNights(q.checkIn, q.checkOut).some((n) => isSoldOut(room.id, n));
    return { room, available, nights, pricePerNight: room.pricePerNight, total: room.pricePerNight * nights };
  }

  private validate(q: StayQuery) {
    if (countNights(q.checkIn, q.checkOut) < 1) throw new BookingError("A estadia precisa ter ao menos 1 noite", "INVALID");
    if (q.adults < 1) throw new BookingError("Informe ao menos 1 adulto", "INVALID");
  }

  async searchAvailability(q: StayQuery) {
    await wait();
    this.validate(q);
    const guests = q.adults + q.children;
    return hotel.rooms.filter((r) => r.capacity >= guests).map((r) => this.offer(r.id, q));
  }

  async createReservation(input: ReservationInput) {
    await wait(LATENCY_MS + 300);
    this.validate(input);
    const offer = this.offer(input.roomId, input);
    if (!offer.available) throw new BookingError("Este quarto acabou de esgotar para as datas escolhidas", "UNAVAILABLE");
    if (offer.room.capacity < input.adults + input.children)
      throw new BookingError("O quarto não comporta o número de hóspedes", "INVALID");

    let code = newCode();
    while (this.reservations.has(code)) code = newCode();

    const reservation: Reservation = {
      ...input,
      code,
      roomName: offer.room.name,
      nights: offer.nights,
      pricePerNight: offer.pricePerNight,
      total: offer.total,
      status: "confirmed",
      paymentMethod: "pay_at_checkin",
      createdAt: new Date().toISOString(),
    };
    this.reservations.set(code, reservation);
    return reservation;
  }

  async getReservation(code: string) {
    await wait(200);
    return this.reservations.get(code.toUpperCase()) ?? null;
  }
}
