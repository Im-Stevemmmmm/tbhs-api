FROM node:12

RUN mkdir -p /usr/src/app
ENV PORT 4000 

WORKDIR /usr/src/app

RUN yarn global add pm2 --silent

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install --production --silent

COPY . /usr/src/app

RUN yarn build

EXPOSE 4000

CMD ["pm2-runtime", "start", "yarn", "--interpreter", "bash", "--name", "web server", "--", "start"]
