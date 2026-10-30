# Build estático (Next.js output: "export") servido por nginx — pronto para o Easypanel.
# Imagens base com versão fixada (build reproduzível).
FROM node:22.23.4-alpine3.24 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Na raiz do domínio não há basePath (diferente do GitHub Pages)
ENV BASE_PATH="" NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# nginx-unprivileged roda como usuário não-root (uid 101) e escuta na porta 8080
FROM nginxinc/nginx-unprivileged:1.31.7-alpine3.24
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=101:101 /app/out /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1
