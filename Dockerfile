FROM node:12 AS builder

WORKDIR /usr/src/app

ADD ./prisma .
COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install
RUN ["yarn", "prisma", "generate"]

COPY . .

RUN yarn build

FROM node:12

WORKDIR /usr/src/app
ENV PORT 3000

COPY --from=builder /usr/src/app ./

EXPOSE 3000
CMD ["yarn", "start:prod"]
