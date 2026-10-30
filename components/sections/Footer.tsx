import Link from "next/link";
import { hotel } from "@/content/hotel";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const { contact, footer, social } = hotel;
  return (
    <footer className="bg-ink pb-10 pt-20 text-white lg:pt-28">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[300px] text-[15px] leading-relaxed text-white/60">
              {footer.text}
            </p>
            <ul className="mt-6 flex gap-5">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[14px] text-white/70 hover:text-white"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label text-white/65">Navegação</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {footer.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[15px] text-white/80 hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label text-white/65">Contato</p>
            <address className="mt-5 space-y-2 text-[15px] not-italic leading-relaxed text-white/80">
              <p>
                {contact.address}
                <br />
                {contact.cityLine}
              </p>
              <p>
                <a
                  href={`tel:${contact.phone.replace(/\D/g, "")}`}
                  className="hover:text-white"
                >
                  {contact.phone}
                </a>
              </p>
              <p>
                <a href={contact.whatsappLink} className="hover:text-white">
                  WhatsApp {contact.whatsapp}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-white"
                >
                  {contact.email}
                </a>
              </p>
              <p className="text-white/65">
                Check-in {contact.checkIn} · Check-out {contact.checkOut}
              </p>
            </address>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[13px] text-white/65 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {hotel.name}. Todos os direitos
            reservados.
          </p>
          <p>
            {hotel.city} - {hotel.state}
          </p>
        </div>
      </Container>
    </footer>
  );
}
