FROM node:12-alpine as build


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
RUN npm run build

COPY . .


EXPOSE ${PORT}

VOLUME [ "/app/dist" ]

CMD ["node", "dist/main"]