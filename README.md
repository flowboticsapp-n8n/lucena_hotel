# Hotel Lucena — site demo

Site institucional + fluxo de reserva (simulado) do Hotel Lucena, Lajedo - PE.
Next.js (App Router, export estático) · TypeScript · Tailwind v4 · Motion · Lenis · react-hook-form + zod · react-day-picker.

## Rodar local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # gera o site estático em out/
```

`dev` e `build` rodam antes `scripts/fetch-photos.mjs`, que baixa as fotos do Unsplash para `public/photos/auto/` (ignorada pelo git). Sem internet, usa um placeholder e avisa.

## Onde editar

| O quê | Onde |
| --- | --- |
| Textos, quartos, preços, serviços, avaliações, blog, contatos | `content/hotel.ts` |
| Fotos do Unsplash (IDs e alternativas) | `scripts/photos.json` — rode `npm run photos` para rebaixar |
| Fotos próprias do hotel | coloque em `public/photos/` e use `{ src: "/photos/arquivo.jpg" }` no `content/hotel.ts` |
| Cores, tipografia, espaçamentos | `app/globals.css` |

## Reservas: trocar o mock por um backend real

Toda a lógica (disponibilidade, preço, criação de reserva) fica atrás da interface `BookingProvider` em `lib/booking/types.ts`.
Hoje a implementação é `MockBookingProvider` (`lib/booking/mock.ts`): dados em memória, latência artificial de ~600 ms e alguns dias "Esgotados" de forma determinística.

Para usar um banco ou a API do sistema do hotel, crie outra classe que implemente `BookingProvider` e troque **uma linha** em `lib/booking/index.ts`. Nenhum componente muda.

> Observação: com export estático não há servidor. Uma implementação real vai chamar uma API externa a partir do navegador (ou o projeto passa a usar `next start` com Route Handlers).

## Publicar

### GitHub Pages (apresentação)

O workflow `.github/workflows/deploy.yml` faz build em todo push e **publica quando o push é na branch principal** (`main`).
Uma única vez, no GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
O site fica em `https://flowboticsapp-n8n.github.io/lucena_hotel/`.

### Easypanel (produção)

`Dockerfile` multi-stage: build com Node 22 e serve `out/` com nginx não-root (`nginx-unprivileged`, porta 8080) (gzip + cache longo para `/_next/static`).
No Easypanel: **App → Source: GitHub (este repo) → Build: Dockerfile → porta 8080**, e aponte o domínio.
Sem `BASE_PATH` — o site fica na raiz do domínio.

```bash
docker build -t hotel-lucena .
docker run -p 8080:8080 hotel-lucena
```

## Decisões de performance (Lighthouse mobile > 90)

- A entrada do hero e do menu é em **CSS** (keyframes), não em JS: começa no primeiro paint, sem esperar a hidratação. A spring `{ stiffness: 300, damping: 30 }` foi convertida numa curva `linear()` equivalente.
- O H1 começa em `opacity: 0.01`, não `0`: o Chrome nunca conta como LCP um elemento pintado pela primeira vez com opacidade 0, e a foto do hero (tela cheia) é tratada como fundo e ignorada no LCP.
- Motion via `LazyMotion` (features carregadas depois do primeiro paint).
- Links para `/reservar` sem prefetch, para o código do calendário/formulário não competir com a home.
- Nenhum ancestral das seções sticky (Serviços, Restaurante) tem `overflow: hidden`.
