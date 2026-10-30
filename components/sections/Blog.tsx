import Link from "next/link";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { hotel } from "@/content/hotel";
import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { HoverLine } from "@/components/ui/HoverLine";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const formatPostDate = (iso: string) =>
  format(parseISO(iso), "d 'de' MMMM 'de' yyyy", { locale: ptBR });

export function Blog() {
  return (
    <section id="blog" className="section">
      <Container>
        <SectionHeading {...hotel.blogSection} />
        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:mt-20">
          {hotel.posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link
                href={`/blog/${post.slug}/`}
                className="group relative flex h-full flex-col bg-card"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <Img
                    photo={post.photo}
                    alt=""
                    sizes="(min-width: 768px) 360px, 100vw"
                    className="size-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="label text-muted">{post.category}</p>
                  <h3 className="mt-3 text-[20px] font-semibold leading-snug tracking-[-0.03em]">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <time
                    dateTime={post.date}
                    className="mt-6 text-[13px] text-muted"
                  >
                    {formatPostDate(post.date)}
                  </time>
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
