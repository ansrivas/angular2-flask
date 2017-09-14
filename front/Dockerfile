# build stage
FROM mhart/alpine-node:8 AS build-env

COPY . /frontend

WORKDIR /frontend

RUN npm install webpack-dev-server rimraf webpack typescript -g \
    && npm install \
    && npm run build:prod

# final stage
FROM nginx:alpine

WORKDIR /app

COPY --from=build-env /frontend/dist /usr/share/nginx/html

COPY --from=build-env /frontend/nginx.conf /etc/nginx/
