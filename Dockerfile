FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install @angular/cli -g
COPY . .
RUN npm install
RUN ng run build --prod

CMD [ "ng", "serve" ]

