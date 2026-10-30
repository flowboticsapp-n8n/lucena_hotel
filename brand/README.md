# Marca

- `logo-original-150px.png` — arquivo enviado pelo hotel (baixa resolução, só referência).
- O site usa um redesenho vetorial em `components/ui/Logo.tsx`.
- Favicon: monograma "HL" (`app/icon.svg` e `app/favicon.ico` gerado dele) — o logo inteiro fica ilegível em 16px.
- `app/apple-icon.png` (180px, atalho na tela inicial do iPhone) usa a arte completa enviada pelo hotel.
- `favicon-original-hotel.ico` — favicon enviado pelo hotel (logo inteiro), guardado como referência.
- Cores (em `app/globals.css`): azul `#2F4A6E`, azul profundo `#243A57`, dourado `#C9B68A`, dourado escuro `#9C844F` (para fundo claro).

Quando o hotel enviar o logo em vetor (SVG, PDF ou AI), substitua o conteúdo de `LogoMark`.
