FROM node:14-alpine
WORKDIR /app
COPY . /app

ENV RUN_MODE=${RUN_MODE:-}

RUN apk add git
RUN apk add --update npm
# RUN npm install
RUN npm i -g @angular/cli

CMD ng s --host 0.0.0.0 --port 80 ${RUN_MODE}
EXPOSE 80
