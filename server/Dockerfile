FROM node:alpine
RUN npm install -g pnpm

WORKDIR /app
COPY package.json /app
RUN pnpm install
COPY . /app
CMD pnpm run start:deploy