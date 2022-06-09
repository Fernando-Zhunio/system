# FROM node:14-alpine
# WORKDIR /app
# COPY . /app

# ENV RUN_MODE=${RUN_MODE:-}

# RUN apk add git
# RUN apk add --update npm
# # RUN npm install
# RUN npm i -g @angular/cli

# CMD ng s --host 0.0.0.0 --port 80 ${RUN_MODE}
# EXPOSE 80

FROM getterminus/angular-ci-images:node14
WORKDIR /app
COPY . .
RUN apt-get install git
# RUN git clone https://gitlab.com/novicompu/Novisolutions.git novisolutions
# RUN cd novisolutions
RUN npm install
RUN npm i -g @angular/cli
# RUN ng b --configuration staging
RUN sh



# FROM node:14-alpine
# WORKDIR /app
# COPY . .
# # RUN apk add openssh
# RUN apk add git
# CMD [ "ls" ]
# RUN npm install
# RUN npm i -g @angular/cli
# RUN ng b --configuration staging --verbose
# RUN sh