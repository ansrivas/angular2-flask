FROM mhart/alpine-node:6.4.0

RUN adduser -D app \
  && mkdir -p /front

COPY package.json typedoc.json tsconfig.json tslint.json /front/
COPY src /front/src/
COPY config /front/config/
COPY assets /front/assets/

WORKDIR /front

RUN apk --update add --virtual build-dependencies git \
  && npm install rimraf webpack typescript -g \
  && npm install \
  && apk del build-dependencies \
  && npm run build:prod \
  && chown -R app:app /front

USER app

EXPOSE 8080

CMD ["npm", "run" ,"server:prod"]
