import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hotel } from "@/content/hotel";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { formatPostDate } from "@/components/sections/Blog";
import { Container } from "@/components/ui/Container";
import { Img } from "@/components/ui/Img";
import { Button } from "@/components/ui/Button";

export const dynamicParams = false;

export function generateStaticParams() {
  return hotel.posts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = hotel.posts.find((p) => p.slug === slug);
  return { title: post ? `${post.title} — ${hotel.name}` : hotel.name, description: post?.excerpt };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = hotel.posts.find((p) => p.slug === slug);
  if (!post) notFound();
  return (
    <>
      <Header solid />
      <main className="pb-24 pt-[72px] lg:pb-40">
        <Container className="max-w-[760px] pt-16 lg:pt-24">
          <p className="label text-muted">{post.category} · <time dateTime={post.date}>{formatPostDate(post.date)}</time></p>
          <h1 className="h-section mt-5">{post.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-muted">{post.excerpt}</p>
        </Container>
        <Container className="mt-12 lg:mt-16">
          <div className="aspect-[16/9] overflow-hidden bg-card">
            <Img photo={post.photo} alt="" priority className="size-full object-cover" />
          </div>
        </Container>
        <Container className="max-w-[760px]">
          <div className="mt-12 space-y-6 text-[18px] leading-[1.7]">
            {post.body.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="mt-14 flex flex-wrap gap-3 border-t border-line pt-10">
            <Button href="/reservar/">Reservar estadia</Button>
            <Button href="/#blog" variant="outline-dark">Voltar ao blog</Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
