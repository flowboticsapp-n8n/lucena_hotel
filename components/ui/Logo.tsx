import Link from "next/link";
import { hotel } from "@/content/hotel";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-baseline gap-1.5 text-[19px] font-semibold tracking-[-0.04em] ${className}`} aria-label={`${hotel.name} — início`}>
      <span className="font-normal opacity-70">Hotel</span>
      <span>{hotel.shortName}</span>
    </Link>
  );
}
