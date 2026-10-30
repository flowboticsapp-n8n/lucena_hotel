import { hotel } from "@/content/hotel";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stars } from "@/components/ui/Stars";

export function Reviews() {
  return (
    <section id="avaliacoes" className="section pt-0 lg:pt-0">
      <Container>
        <SectionHeading {...hotel.reviewsSection} />
        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:mt-20">
          {hotel.reviews.map((r) => (
            <figure key={r.name} className="group relative flex flex-col bg-card p-7 lg:p-9">
              <Stars value={r.rating} />
              <blockquote className="mt-6 flex-1 text-[17px] leading-relaxed">“{r.text}”</blockquote>
              <figcaption className="mt-8 border-t border-line pt-5">
                <p className="font-semibold tracking-[-0.02em]">{r.name}</p>
                <p className="mt-1 text-[14px] text-muted">{r.city} · {r.room}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
