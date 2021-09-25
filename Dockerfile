FROM node:12-alpine as build


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
RUN npm run build

COPY . .

ENV PORT 4200
ENV MONGODB_URI mongodb+srv://application:dtyX6jzytQMbDmo2@cluster0.cri5u.mongodb.net/fd3diplom?retryWrites=true&w=majority


EXPOSE ${PORT}

VOLUME [ "/app/data" ]


CMD ["node", "dist/main"]