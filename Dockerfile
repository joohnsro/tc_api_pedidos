FROM node:alpine

WORKDIR /home/node/app

VOLUME /home/node/app
VOLUME /home/node/app/node_modules

COPY ./build /home/node/app/
COPY ./node_modules /home/node/app/node_modules

EXPOSE 3000

CMD [ "node", "./external/api/index.js" ]