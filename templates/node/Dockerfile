#
# Base image
#
FROM node:20-slim as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable


#
# Build our actual application
#
FROM base AS build

COPY . /app
WORKDIR /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

RUN pnpm --filter=service-a... run build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
     pnpm deploy --filter=service-a --prod /prod

#
# The final image that will get tagged and pushed
#
FROM base AS ship

ENV NPM_CONFIG_LOGLEVEL=warn
ENV NODE_ENV="production"
ENV http_port="3000"

USER node

WORKDIR /app

COPY --from=build /prod .

CMD [ "node", "src/index.js" ]