import type { Metadata } from "next";
import { hotel } from "@/content/hotel";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { BookingFlow } from "@/components/booking/BookingFlow";

export const metadata: Metadata = {
  title: `Reservar — ${hotel.name}`,
  description: `Reserve seu quarto no ${hotel.name}, em ${hotel.city} - ${hotel.state}.`,
};

export default function ReservarPage() {
  return (
    <>
      <Header solid />
      <main className="min-h-svh pb-24 pt-[72px] lg:pb-32">
        <Container className="pt-12 lg:pt-20">
          <p className="label text-muted">Reserva online</p>
          <h1 className="h-section mt-4">Reserve sua estadia</h1>
          <div className="mt-10 lg:mt-14">
            <BookingFlow />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
