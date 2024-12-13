FROM python:3.12.4-alpine3.20 AS base
ARG RELEASE_VERSION
ENV RELEASE_VERSION=$RELEASE_VERSION
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
# fix PYTHONPATH otherwise DJANGO_SETTINGS_MODULE cannot work correctly
ENV PYTHONPATH=/app

RUN --mount=type=cache,target=/root/.cache/apk \
    apk update && apk upgrade && \
    apk add --no-cache \
    # base dependencies
    curl gcc

WORKDIR /app
COPY ./requirements.txt .
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install --upgrade pip && \
    pip install -r requirements.txt

# ------------------------------------------------------------------------------
FROM base AS dev
# set XDG_CACHE_HOME otherwise pylint trying to create cache in the / (root) but it have no access to do it
ENV XDG_CACHE_HOME=/app/.cache
# we need it to init pylint_django plugin
ENV DJANGO_SETTINGS_MODULE=main.settings

RUN --mount=type=cache,target=/root/.cache/apk \
    apk add --no-cache musl-dev python3-dev linux-headers

COPY ./requirements.dev.txt .
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install -r requirements.dev.txt

# use default ubuntu user 
USER 1000

# ------------------------------------------------------------------------------
FROM base AS prod
RUN pip install -Iv gunicorn==20.1.0
COPY . .
