import { asset } from "@/lib/asset";
import type { Photo } from "@/content/hotel";

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & {
  photo: Photo;
  alt: string;
  priority?: boolean;
};

/** <img> responsivo que respeita o basePath (export estático, sem otimizador). */
export function Img({ photo, alt, priority, sizes = "100vw", ...rest }: Props) {
  const srcSet = photo.srcSet
    ?.split(",")
    .map((s) => {
      const [url, w] = s.trim().split(/\s+/);
      return `${asset(url)} ${w}`;
    })
    .join(", ");
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(photo.src)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      {...rest}
    />
  );
}
