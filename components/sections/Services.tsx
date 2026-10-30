import { hotel } from "@/content/hotel";
import { Img } from "@/components/ui/Img";
import { Parallax } from "@/components/motion/Parallax";
import { Container } from "@/components/ui/Container";

export function Services() {
  const { servicesSection, services } = hotel;
  return (
    <section id="servicos" className="relative">
      <div className="relative h-[70svh] overflow-hidden bg-navy lg:sticky lg:top-0 lg:h-svh">
        <Parallax trackSection className="absolute inset-0">
          <Img
            photo={servicesSection.photo}
            alt="Lobby do hotel"
            className="size-full object-cover"
          />
        </Parallax>
        <div className="absolute inset-0 bg-navy-deep/25" />
      </div>
      <Container className="relative z-10 -mt-24 lg:-mt-[45svh]">
        <div className="bg-card p-7 sm:p-10 lg:ml-auto lg:max-w-[540px] lg:p-14">
          <p className="label text-muted">{servicesSection.label}</p>
          <h2 className="h-section mt-4">{servicesSection.title}</h2>
          <ol className="mt-10">
            {services.map((s, i) => (
              <li
                key={s.title}
                className="grid grid-cols-[48px_1fr] border-t border-line py-6 last:pb-0"
              >
                <span className="text-[15px] font-medium text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[19px] font-semibold tracking-[-0.03em]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">
                    {s.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
