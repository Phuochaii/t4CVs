FROM node:latest AS base
RUN npm install -g pnpm

# development stage
FROM base AS development
ARG APP
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /backend
COPY package.json ./
RUN pnpm install
COPY . .
RUN pnpm run copy:proto
RUN pnpm run build ${APP}

# production stage
FROM base AS production
ARG APP
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /backend
COPY package.json ./
RUN pnpm install --prod
COPY --from=development /backend/dist ./dist

ENV APP_MAIN_FILE=dist/apps/${APP}/main
CMD node ${APP_MAIN_FILE}