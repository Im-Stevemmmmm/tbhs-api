FROM node:12 AS builder

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

FROM node:12

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app ./

CMD ["yarn", "start:prod"]
