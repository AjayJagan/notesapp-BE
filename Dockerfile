FROM node:lts-alpine3.15
WORKDIR /usr/app
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install
COPY . .
CMD ["yarn","start"]
