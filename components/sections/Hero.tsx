import { hotel } from "@/content/hotel";
import { Img } from "@/components/ui/Img";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProgressiveBlur } from "@/components/motion/ProgressiveBlur";

export function Hero() {
  const { hero } = hotel;
  return (
    <section className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-navy text-white">
      <div className="hero-zoom absolute inset-0">
        <Img
          photo={hero.photo}
          alt={`Fachada do ${hotel.name} com o monograma HL`}
          // eager, mas sem fetchpriority alta: imagem que cobre a viewport inteira não conta
          // como LCP (o H1 é o LCP), então não deve disputar banda com CSS/fonte/JS.
          loading="eager"
          className="size-full object-cover"
        />
        <ProgressiveBlur
          photo={hero.photo}
          className="absolute inset-x-0 bottom-0 h-1/2"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/45 via-navy-deep/45 to-navy-deep/85 lg:from-navy-deep/60 lg:via-navy-deep/15 lg:to-navy-deep/70" />

      <Container className="relative z-20 pb-14 pt-32 lg:pb-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[760px] max-lg:[text-shadow:0_1px_16px_rgba(20,32,50,0.6)]">
            <p
              className="hero-in label text-white/90 lg:text-gold"
              style={{ "--i": 0 } as React.CSSProperties}
            >
              {hero.label}
            </p>
            <h1
              className="hero-in h-display mt-5"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              {hero.title}
            </h1>
            <p
              className="hero-in mt-6 max-w-[540px] text-[17px] leading-relaxed text-white/80"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              {hero.text}
            </p>
            <div
              className="hero-in mt-9 flex flex-wrap gap-3"
              style={{ "--i": 3 } as React.CSSProperties}
            >
              <Button href="/#quartos" variant="light">
                Ver quartos
              </Button>
              <Button href="/#sobre" variant="outline-light">
                Nossa história
              </Button>
            </div>
          </div>
          <div
            className="hero-in flex items-center gap-4 lg:flex-col lg:items-end lg:gap-2 lg:text-right"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <span className="grid size-12 shrink-0 place-items-center border border-gold text-[18px] font-semibold tracking-[-0.02em] text-gold">
              {hero.rating.score}
              <span className="sr-only"> de 10</span>
            </span>
            <p className="text-[15px] text-white/85">
              <strong className="font-semibold text-white">
                {hero.rating.label}
              </strong>{" "}
              — {hero.rating.source}
              <span className="block text-[13px] text-white/60">
                {hero.rating.reviews}
              </span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
