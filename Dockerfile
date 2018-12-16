# base image
FROM node:11.4.0

USER node

# set working directory
# RUN mkdir /home/node/app
WORKDIR /home/node/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /home/node/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /home/node/app/package.json

# install server

RUN npm install
# RUN npm install --dev

# install client
# WORKDIR /home/node/app/client
# RUN yarn install

# start app
WORKDIR /home/node/app
CMD ["yarn", "start"]