import Link from "next/link";
import { hotel, formatBRL } from "@/content/hotel";
import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { HoverLine } from "@/components/ui/HoverLine";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Rooms() {
  return (
    <section id="quartos" className="section">
      <Container>
        <SectionHeading {...hotel.roomsSection} />
        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:mt-20">
          {hotel.rooms.map((room, i) => (
            <Reveal key={room.id} delay={i * 0.08}>
              <Link
                prefetch={false}
                href={`/reservar/?quarto=${room.id}`}
                className="group relative block h-full bg-card"
              >
                <Parallax className="relative aspect-[4/3] md:aspect-[4/5]">
                  <Img
                    photo={room.photo}
                    alt={room.name}
                    sizes="(min-width: 768px) 360px, 100vw"
                    className="size-full object-cover"
                  />
                </Parallax>
                <div className="p-6">
                  <p className="label text-muted">{room.category}</p>
                  <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.03em]">
                    {room.name}
                  </h3>
                  <p className="mt-3 text-[15px] text-muted">
                    A partir de{" "}
                    <span className="font-semibold text-ink">
                      {formatBRL(room.pricePerNight)}
                    </span>{" "}
                    / noite
                  </p>
                </div>
                <HoverLine />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
