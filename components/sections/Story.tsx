import { hotel } from "@/content/hotel";
import { Img } from "@/components/ui/Img";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";

export function Story() {
  const { story, contact } = hotel;
  return (
    <section id="sobre" className="section">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="label text-muted">{story.label}</p>
          <h2 className="h-section mt-4">{story.title}</h2>
          {story.paragraphs.map((p) => (
            <p key={p} className="mt-5 text-[17px] leading-relaxed text-muted">
              {p}
            </p>
          ))}
          <Button href={contact.whatsappLink} className="mt-9">
            {story.cta}
          </Button>
        </Reveal>
        <Reveal delay={0.1} className="aspect-[4/5] overflow-hidden bg-card">
          <Img
            photo={story.photo}
            alt="O casarão original do hotel"
            sizes="(min-width: 1024px) 520px, 100vw"
            className="size-full object-cover"
          />
        </Reveal>
      </Container>
    </section>
  );
}
