import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { hotel } from "@/content/hotel";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${hotel.name} — ${hotel.city} - ${hotel.state}`,
  description: hotel.description,
};

export const viewport: Viewport = { themeColor: "#243a57" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        <SmoothScroll>
          <MotionProvider>{children}</MotionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
