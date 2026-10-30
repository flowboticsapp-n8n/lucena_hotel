import { hotel } from "@/content/hotel";
import { Img } from "@/components/ui/Img";
import { Parallax } from "@/components/motion/Parallax";
import { Container } from "@/components/ui/Container";
import { MenuDialog } from "@/components/sections/MenuDialog";

export function Restaurant() {
  const { restaurant } = hotel;
  return (
    <section id="restaurante" className="relative">
      <div className="relative h-[70svh] overflow-hidden bg-ink lg:sticky lg:top-0 lg:h-svh">
        <Parallax trackSection className="absolute inset-0">
          <Img
            photo={restaurant.photo}
            alt={`Salão do restaurante ${restaurant.name}`}
            className="size-full object-cover"
          />
        </Parallax>
        <div className="absolute inset-0 bg-ink/20" />
      </div>
      <Container className="relative z-10 -mt-24 lg:-mt-[45svh]">
        <div className="bg-card p-7 sm:p-10 lg:max-w-[540px] lg:p-14">
          <p className="label text-muted">
            {restaurant.label} · {restaurant.name}
          </p>
          <h2 className="h-section mt-4">{restaurant.title}</h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">
            {restaurant.text}
          </p>
          <dl className="mt-8">
            {restaurant.hours.map((h) => (
              <div
                key={h.label}
                className="flex justify-between border-t border-line py-4 text-[15px]"
              >
                <dt className="text-muted">{h.label}</dt>
                <dd className="font-medium">{h.value}</dd>
              </div>
            ))}
          </dl>
          <MenuDialog />
        </div>
      </Container>
    </section>
  );
}
