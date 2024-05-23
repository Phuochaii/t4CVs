FROM node:18 as server

WORKDIR /server

COPY ./package.json ./package-lock.json ./

RUN pnpm install

COPY . ./

RUN pnpm run start:dev user

EXPOSE 3002

CMD ["pnpm", "run", "start:dev" , "user"]