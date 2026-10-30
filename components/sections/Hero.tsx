import { hotel } from "@/content/hotel";
import { Img } from "@/components/ui/Img";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Stars } from "@/components/ui/Stars";
import { HeroZoom, Stagger, StaggerItem } from "@/components/motion/HeroMotion";
import { ProgressiveBlur } from "@/components/motion/ProgressiveBlur";

export function Hero() {
  const { hero } = hotel;
  return (
    <section className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-ink text-white">
      <HeroZoom className="absolute inset-0">
        <Img
          photo={hero.photo}
          alt={`Fachada do ${hotel.name} ao entardecer`}
          priority
          className="size-full object-cover"
        />
      </HeroZoom>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/15 to-ink/60" />
      <ProgressiveBlur className="absolute inset-x-0 bottom-0 h-1/2" />

      <Container className="relative z-20 pb-14 pt-32 lg:pb-20">
        <Stagger className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[760px]">
            <StaggerItem as="p" className="label text-white/75">
              {hero.label}
            </StaggerItem>
            <StaggerItem as="h1" className="h-display mt-5">
              {hero.title}
            </StaggerItem>
            <StaggerItem
              as="p"
              className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-white/80"
            >
              {hero.text}
            </StaggerItem>
            <StaggerItem className="mt-9 flex flex-wrap gap-3">
              <Button href="/#quartos" variant="light">
                Ver quartos
              </Button>
              <Button href="/#sobre" variant="outline-light">
                Nossa história
              </Button>
            </StaggerItem>
          </div>
          <StaggerItem className="flex items-center gap-4 lg:flex-col lg:items-end lg:gap-2 lg:text-right">
            <Stars />
            <p className="text-[15px] text-white/85">
              <strong className="font-semibold text-white">
                {hero.rating.score} de {hero.rating.of}
              </strong>{" "}
              — {hero.rating.source}
              <span className="block text-[13px] text-white/60">
                {hero.rating.reviews}
              </span>
            </p>
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}
