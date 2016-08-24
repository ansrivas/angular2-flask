FROM gliderlabs/alpine:latest

COPY requirements.txt run.py /foo/

RUN apk --no-cache add \
    python \
    py-pip \
  && apk --update add --virtual build-dependencies gcc python-dev build-base \
  && pip install -r /foo/requirements.txt \
  && apk del build-dependencies \
  && adduser -D app \
  && mkdir -p /foo  \
  && chown -R app:app /foo

COPY flask_app /foo/flask_app/

VOLUME /tmp

RUN chown -R app:app /foo

WORKDIR /foo

USER app

EXPOSE 8080

CMD ["python", "run.py"]
