import { MockBookingProvider } from "./mock";
import type { BookingProvider } from "./types";

/**
 * Ponto único de troca: substitua por `new ApiBookingProvider(...)`
 * (ou outra implementação de BookingProvider) quando houver backend.
 */
export const bookingProvider: BookingProvider = new MockBookingProvider();

export * from "./types";
export * from "./dates";
