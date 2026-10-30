import Link from "next/link";
import { hotel, formatBRL } from "@/content/hotel";
import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Rooms() {
  return (
    <section id="quartos" className="section">
      <Container>
        <SectionHeading {...hotel.roomsSection} />
        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:mt-20">
          {hotel.rooms.map((room) => (
            <Link key={room.id} href={`/reservar/?quarto=${room.id}`} className="group relative block bg-card">
              <div className="aspect-[4/3] overflow-hidden md:aspect-[4/5]">
                <Img photo={room.photo} alt={room.name} sizes="(min-width: 768px) 360px, 100vw" className="size-full object-cover" />
              </div>
              <div className="p-6">
                <p className="label text-muted">{room.category}</p>
                <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.03em]">{room.name}</h3>
                <p className="mt-3 text-[15px] text-muted">
                  A partir de <span className="font-semibold text-ink">{formatBRL(room.pricePerNight)}</span> / noite
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
