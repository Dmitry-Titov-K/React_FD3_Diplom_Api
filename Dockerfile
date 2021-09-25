FROM node:12-alpine as build


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
RUN npm run build

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE ${PORT}

VOLUME [ "/app/data" ]


CMD ["node", "dist/main"]