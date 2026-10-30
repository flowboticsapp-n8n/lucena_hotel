import { hotel } from "@/content/hotel";
import type { Reservation } from "@/lib/booking";

const esc = (s: string) => s.replace(/[\;,]/g, (m) => "\\" + m).replace(/\n/g, "\\n");
const day = (iso: string) => iso.replace(/-/g, "");

/** Gera um .ics (evento de dia inteiro do check-in ao check-out). */
export function reservationToICS(r: Reservation) {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Hotel Lucena//Reservas//PT-BR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${r.code}@hotellucena.com.br`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${day(r.checkIn)}`,
    `DTEND;VALUE=DATE:${day(r.checkOut)}`,
    `SUMMARY:${esc(`${hotel.name} — ${r.roomName} (${r.code})`)}`,
    `LOCATION:${esc(`${hotel.contact.address}, ${hotel.contact.cityLine}`)}`,
    `DESCRIPTION:${esc(`Reserva ${r.code}\nCheck-in a partir das ${hotel.contact.checkIn} · Check-out até ${hotel.contact.checkOut}\nTelefone: ${hotel.contact.phone}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadICS(r: Reservation) {
  const blob = new Blob([reservationToICS(r)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), { href: url, download: `reserva-${r.code}.ics` });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
