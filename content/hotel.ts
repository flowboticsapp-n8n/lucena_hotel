/**
 * Conteúdo do site — edite tudo aqui.
 *
 * Fotos:
 * - `hotelPhoto("nome")` — fotos reais do hotel. Coloque o original em photos-src/hotel/
 *   e rode `python3 scripts/otimizar-fotos.py` (gera AVIF/WebP/JPEG em vários tamanhos).
 * - `auto("nome")` — fotos de banco (Unsplash) baixadas no build (ver scripts/photos.json).
 */

import manifest from "./photos.manifest.json";
import hotelManifest from "./photos.hotel.json";

export type Photo = {
  src: string;
  srcSet?: string;
  /** Formatos modernos (AVIF/WebP) servidos via <picture>; o navegador escolhe o primeiro que suporta. */
  sources?: { type: string; srcSet: string }[];
  /** object-position do enquadramento (ex.: "50% 30%"), para não cortar o assunto da foto. */
  position?: string;
};

const MIME: Record<string, string> = { avif: "image/avif", webp: "image/webp" };

const responsive = (
  dir: string,
  name: string,
  widths: number[],
  formats: string[],
  position?: string,
): Photo => {
  const set = (fmt: string) =>
    widths.map((w) => `/photos/${dir}/${name}-${w}.${fmt} ${w}w`).join(", ");
  return {
    src: `/photos/${dir}/${name}-${widths[widths.length - 1]}.jpg`,
    srcSet: set("jpg"),
    sources: formats
      .filter((f) => f in MIME)
      .map((f) => ({ type: MIME[f], srcSet: set(f) })),
    position,
  };
};

const auto = (name: keyof typeof manifest): Photo =>
  responsive("auto", name, manifest[name].widths, manifest[name].formats);

const hotelPhoto = (
  name: keyof typeof hotelManifest,
  position?: string,
): Photo =>
  responsive(
    "hotel",
    name,
    hotelManifest[name].widths,
    hotelManifest[name].formats,
    position,
  );

export type Room = {
  id: string;
  category: string;
  name: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  size: number;
  beds: string;
  amenities: string[];
  photo: Photo;
};

export const hotel = {
  name: "Hotel Lucena",
  shortName: "Lucena",
  city: "Lajedo",
  state: "PE",
  tagline: "Hospitalidade do Agreste, conforto de verdade.",
  description:
    "Um hotel de família no coração de Lajedo, com quartos amplos, café regional e o atendimento que faz você se sentir em casa desde o check-in.",

  contact: {
    phone: "(87) 99635-0011",
    whatsapp: "(87) 99635-0011",
    whatsappLink: "https://wa.me/5587996350011",
    email: "reservas@hotellucena.com.br",
    address: "R. Pres. Juscelino Kubitscheck, BR 423",
    cityLine: "Lajedo - PE, 55385-000",
    mapsLink: "https://maps.google.com/?q=Hotel+Lucena+Lajedo+PE",
    checkIn: "14h",
    checkOut: "12h",
  },

  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "TripAdvisor", href: "https://tripadvisor.com.br" },
  ],

  nav: [
    { label: "Quartos", href: "/#quartos" },
    { label: "Serviços", href: "/#servicos" },
    { label: "Restaurante", href: "/#restaurante" },
    { label: "Sobre", href: "/#sobre" },
  ],

  hero: {
    label: "Bem-vindo ao Hotel Lucena",
    title: "Descanso sem pressa no coração do Agreste",
    text: "Quartos silenciosos, café da manhã com sabores da região e uma equipe que conhece Lajedo como ninguém. A poucos passos do centro, longe do barulho.",
    // Escala do Booking: 0 a 10. Troque pela nota real do hotel.
    rating: {
      score: "9,4",
      label: "Excepcional",
      source: "Booking.com",
      reviews: "312 avaliações",
    },
    photo: hotelPhoto("fachada", "50% 62%"),
  },

  roomsSection: {
    label: "Acomodações",
    title: "Quartos pensados para descansar",
    text: "Três categorias, o mesmo cuidado: enxoval 200 fios, colchões novos e isolamento acústico em todos os quartos.",
  },

  rooms: [
    {
      id: "standard",
      category: "Standard",
      name: "Quarto Standard",
      description:
        "Prático e aconchegante, ideal para viagens a trabalho ou estadias curtas.",
      pricePerNight: 220,
      capacity: 2,
      size: 18,
      beds: "1 cama de casal",
      amenities: [
        "Ar-condicionado",
        "Wi-Fi 300 Mb",
        "Smart TV 43”",
        "Frigobar",
        "Chuveiro a gás",
      ],
      photo: hotelPhoto("quarto-standard", "50% 60%"),
    },
    {
      id: "luxo",
      category: "Luxo",
      name: "Quarto Luxo",
      description:
        "Mais espaço, varanda privativa e vista para a serra. O preferido dos casais.",
      pricePerNight: 320,
      capacity: 3,
      size: 26,
      beds: "1 cama queen + 1 de solteiro",
      amenities: [
        "Varanda privativa",
        "Ar-condicionado",
        "Wi-Fi 300 Mb",
        "Smart TV 50”",
        "Cafeteira",
        "Frigobar",
      ],
      photo: hotelPhoto("quarto-luxo", "45% 50%"),
    },
    {
      id: "suite",
      category: "Suíte",
      name: "Suíte Lucena",
      description:
        "Sala de estar integrada, banheira e amenities exclusivos. Para quem quer o melhor do hotel.",
      pricePerNight: 450,
      capacity: 4,
      size: 42,
      beds: "1 cama king + sofá-cama",
      amenities: [
        "Banheira",
        "Sala de estar",
        "Varanda",
        "Ar-condicionado",
        "Smart TV 55”",
        "Amenities L'Occitane",
        "Roupão e chinelos",
      ],
      photo: auto("room-suite"),
    },
  ] satisfies Room[],

  servicesSection: {
    label: "Serviços",
    title: "Tudo o que você precisa, sem sair do hotel",
    photo: hotelPhoto("cafe-da-manha"),
  },

  services: [
    {
      title: "Restaurante",
      text: "Café da manhã regional incluso e almoço executivo de segunda a sábado, com ingredientes de produtores locais.",
    },
    {
      title: "Estacionamento",
      text: "Estacionamento privativo, coberto e monitorado 24h. Gratuito para hóspedes, com vagas para vans.",
    },
    {
      title: "Lavanderia",
      text: "Lavagem e passadoria com entrega no mesmo dia para peças deixadas até as 10h.",
    },
    {
      title: "Recepção 24 horas",
      text: "Check-in tardio, guarda-volumes e dicas da região a qualquer hora — é só chamar.",
    },
  ],

  story: {
    label: "Nossa história",
    title: "Três gerações recebendo bem",
    paragraphs: [
      "O Hotel Lucena nasceu em 1987, quando Seu Antônio Lucena transformou o casarão da família em uma pousada de seis quartos para quem passava pela região a trabalho.",
      "Hoje somos 32 quartos, mas a receita continua a mesma: café passado na hora, bolo de macaxeira no café da manhã e alguém da família sempre na recepção.",
    ],
    cta: "Fale com a gente",
    photo: auto("story"),
  },

  reviewsSection: {
    label: "Avaliações",
    title: "O que dizem nossos hóspedes",
  },

  reviews: [
    {
      name: "Mariana Albuquerque",
      city: "Recife - PE",
      room: "Quarto Luxo",
      rating: 5,
      text: "Quarto impecável e silencioso, cama muito confortável. O café da manhã com cuscuz e queijo coalho valeu a viagem. Voltaremos com certeza!",
    },
    {
      name: "Ricardo Menezes",
      city: "Caruaru - PE",
      room: "Quarto Standard",
      rating: 5,
      text: "Fico sempre aqui quando venho a trabalho. Wi-Fi rápido, estacionamento seguro e a equipe resolve tudo com um sorriso.",
    },
    {
      name: "Juliana e Pedro Santos",
      city: "Maceió - AL",
      room: "Suíte Lucena",
      rating: 5,
      text: "Passamos nosso aniversário de casamento na suíte e fomos surpreendidos com espumante e flores. Atendimento de hotel de capital.",
    },
  ],

  restaurant: {
    label: "Restaurante",
    name: "Cozinha Lucena",
    title: "Sabores do Agreste, servidos com calma",
    text: "Do café da manhã ao jantar, nossa cozinha valoriza o que a região tem de melhor: queijo coalho artesanal, carne de sol, macaxeira e frutas da estação.",
    hours: [
      { label: "Café da manhã", value: "6h às 10h" },
      { label: "Almoço", value: "11h30 às 14h30" },
      { label: "Jantar", value: "19h às 22h" },
    ],
    cta: "Ver cardápio",
    photo: auto("restaurant"),
    menu: [
      {
        section: "Entradas",
        items: [
          {
            name: "Dadinhos de tapioca",
            desc: "Com geleia de pimenta da casa",
            price: 32,
          },
          {
            name: "Queijo coalho na brasa",
            desc: "Mel de engenho e orégano",
            price: 36,
          },
        ],
      },
      {
        section: "Pratos principais",
        items: [
          {
            name: "Carne de sol na nata",
            desc: "Macaxeira cozida, feijão verde e farofa",
            price: 78,
          },
          { name: "Bode guisado", desc: "Arroz de leite e pirão", price: 72 },
          {
            name: "Peixe do dia",
            desc: "Purê de jerimum e legumes salteados",
            price: 74,
          },
        ],
      },
      {
        section: "Sobremesas",
        items: [
          {
            name: "Cartola",
            desc: "Banana, queijo manteiga, açúcar e canela",
            price: 28,
          },
          { name: "Pudim de tapioca", desc: "Calda de rapadura", price: 24 },
        ],
      },
    ],
  },

  blogSection: {
    label: "Blog",
    title: "Dicas para aproveitar a região",
  },

  posts: [
    {
      slug: "o-que-fazer-em-lajedo",
      category: "Roteiros",
      title: "O que fazer em Lajedo em um fim de semana",
      excerpt:
        "Feira livre, igrejas históricas e as melhores paradas para provar a culinária local.",
      date: "2026-09-12",
      photo: auto("blog-1"),
      body: [
        "Lajedo é daquelas cidades que se revelam aos poucos. Comece o sábado pela feira livre, cedo, quando o movimento ainda é das bancas de queijo e de frutas da estação.",
        "À tarde, vale caminhar pelo centro e conhecer a Igreja Matriz. No fim do dia, peça uma carne de sol em um dos restaurantes tradicionais — ou volte para o hotel e experimente a da nossa cozinha.",
        "No domingo, aproveite para conhecer as cidades vizinhas do Agreste Meridional: Garanhuns fica a cerca de 40 minutos de carro.",
      ],
    },
    {
      slug: "festas-juninas-no-agreste",
      category: "Eventos",
      title: "Festas juninas no Agreste: guia para não perder nada",
      excerpt:
        "Datas, palcos e dicas práticas para curtir o São João da região com conforto.",
      date: "2026-05-28",
      photo: auto("blog-2"),
      body: [
        "Junho é o mês mais animado do Agreste. As cidades da região montam palcos, quadrilhas e muita comida típica.",
        "Nossa dica: reserve com antecedência. Os hotéis lotam e as diárias sobem. Hóspedes do Lucena têm transfer para os principais polos de festa nos fins de semana.",
      ],
    },
    {
      slug: "cafe-da-manha-regional",
      category: "Gastronomia",
      title: "Por trás do nosso café da manhã regional",
      excerpt:
        "Conheça os produtores que abastecem nossa mesa todas as manhãs.",
      date: "2026-08-03",
      photo: auto("blog-3"),
      body: [
        "O queijo coalho vem de uma queijaria familiar a 12 km do hotel. O mel, de um apiário em Cachoeirinha. O cuscuz é feito com milho da região, moído na semana.",
        "Trabalhar com produtores locais é mais do que uma escolha gastronômica: é a forma que encontramos de devolver à região um pouco do que ela nos dá.",
      ],
    },
  ],

  footer: {
    text: "Hospitalidade do Agreste desde 1987.",
    links: [
      { label: "Quartos", href: "/#quartos" },
      { label: "Serviços", href: "/#servicos" },
      { label: "Restaurante", href: "/#restaurante" },
      { label: "Sobre", href: "/#sobre" },
      { label: "Blog", href: "/#blog" },
      { label: "Reservar", href: "/reservar/" },
    ],
  },
};

export type Hotel = typeof hotel;

export const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
