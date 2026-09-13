FROM node:24-slim AS base

RUN corepack enable && corepack prepare pnpm@latest --activate
ARG NODE_ENV=production

FROM base AS deps

WORKDIR /usr/src/app
COPY pnpm-workspace.yaml pnpm-lock.yaml ./
COPY web/package.json ./web/
RUN pnpm install --frozen-lockfile

FROM base AS build

WORKDIR /usr/src/app
ARG VITE_BACKEND_URL
COPY web ./web
COPY --from=deps /usr/src/app/ .
RUN pnpm --fail-if-no-match --filter=artisan-library-web run build --mode $NODE_ENV

FROM base AS runner

COPY --from=build /usr/src/app/web/.output /app
EXPOSE 3000
ENTRYPOINT [ "node", "/app/server/index.mjs" ]