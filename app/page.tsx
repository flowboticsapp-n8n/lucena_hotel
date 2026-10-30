import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Rooms } from "@/components/sections/Rooms";
import { Services } from "@/components/sections/Services";
import { Story } from "@/components/sections/Story";
import { Reviews } from "@/components/sections/Reviews";
import { Restaurant } from "@/components/sections/Restaurant";
import { Blog } from "@/components/sections/Blog";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Rooms />
        <Services />
        <Story />
        <Reviews />
        <Restaurant />
        <Blog />
      </main>
      <Footer />
    </>
  );
}
