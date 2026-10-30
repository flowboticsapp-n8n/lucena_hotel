import type { Room } from "@/content/hotel";

/** Datas trafegam como "yyyy-MM-dd" — serializável, fácil de mandar para uma API real. */
export type ISODate = string;

export type StayQuery = {
  checkIn: ISODate;
  checkOut: ISODate;
  adults: number;
  children: number;
};

export type RoomOffer = {
  room: Room;
  available: boolean;
  nights: number;
  pricePerNight: number;
  total: number;
};

export type Guest = {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  requests?: string;
};

export type ReservationInput = StayQuery & { roomId: string; guest: Guest };

export type Reservation = ReservationInput & {
  code: string;
  roomName: string;
  nights: number;
  pricePerNight: number;
  total: number;
  status: "confirmed";
  paymentMethod: "pay_at_checkin";
  createdAt: string;
};

/**
 * Contrato único entre a interface e a fonte de dados.
 * Para trocar o mock por um banco ou pela API do sistema do hotel,
 * implemente esta interface e altere apenas lib/booking/index.ts.
 */
export interface BookingProvider {
  /** Quartos com capacidade para o grupo, com disponibilidade e preço da estadia. */
  searchAvailability(query: StayQuery): Promise<RoomOffer[]>;
  createReservation(input: ReservationInput): Promise<Reservation>;
  getReservation(code: string): Promise<Reservation | null>;
}

export class BookingError extends Error {
  constructor(
    message: string,
    public code: "UNAVAILABLE" | "INVALID" | "NOT_FOUND",
  ) {
    super(message);
  }
}
