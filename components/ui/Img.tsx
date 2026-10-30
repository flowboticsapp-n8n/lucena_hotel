import { asset } from "@/lib/asset";
import type { Photo } from "@/content/hotel";

type Props = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet"
> & {
  photo: Photo;
  alt: string;
  priority?: boolean;
};

const withBase = (srcSet?: string) =>
  srcSet
    ?.split(",")
    .map((s) => {
      const [url, w] = s.trim().split(/\s+/);
      return `${asset(url)} ${w}`;
    })
    .join(", ");

/**
 * Imagem responsiva que respeita o basePath (export estático, sem otimizador).
 * Com `photo.sources`, vira <picture> com AVIF/WebP e JPEG de fallback.
 * O <picture> usa `display: contents` para não alterar o layout do <img>.
 */
export function Img({ photo, alt, priority, sizes = "100vw", ...rest }: Props) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(photo.src)}
      srcSet={withBase(photo.srcSet)}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      {...rest}
    />
  );
  if (!photo.sources?.length) return img;
  return (
    <picture className="contents">
      {photo.sources.map((s) => (
        <source
          key={s.type}
          type={s.type}
          srcSet={withBase(s.srcSet)}
          sizes={sizes}
        />
      ))}
      {img}
    </picture>
  );
}
