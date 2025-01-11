# ------------------------------------------------------------------------------
FROM python:3.12.4-alpine3.20 AS base

ARG RELEASE_VERSION
ENV RELEASE_VERSION=$RELEASE_VERSION

RUN --mount=type=cache,target=/root/.cache/apk \
    apk update && apk upgrade && \
    # base dependencies
    apk add curl gcc \
    # video dependencies 
    # TODO: move it to separate image of video-worker
    ffmpeg && \
    # clean up
    rm -rf /var/cache/apk/*

# Create a group and user for the app
RUN addgroup -g 1000 -S app && adduser -u 1000 -S app -G app 

# app dependencies
WORKDIR /home/app/code
COPY ./requirements.txt .
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install --upgrade pip && \
    pip install -r requirements.txt

# ------------------------------------------------------------------------------
FROM base AS dev

RUN --mount=type=cache,target=/root/.cache/apk \
    apk add musl-dev python3-dev linux-headers git

COPY ./requirements.dev.txt .
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install -r requirements.dev.txt

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
# set XDG_CACHE_HOME otherwise pylint trying to create
# cache in the / (root) but it have no access to do it
# ENV XDG_CACHE_HOME=/home/app/.cache
# fix PYTHONPATH otherwise DJANGO_SETTINGS_MODULE cannot work correctly
# ENV PYTHONPATH=/home/app/code
# we need it to init pylint_django plugin
# ENV DJANGO_SETTINGS_MODULE=main.settings


# ------------------------------------------------------------------------------
FROM dev AS dev-nvim 
ARG HOST_HOME

RUN --mount=type=cache,target=/root/.cache/apk \
    apk add nodejs npm neovim neovim-doc ripgrep build-base wget --update
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install black ruff mypy debugpy

USER app


# ------------------------------------------------------------------------------
FROM base AS prod
RUN pip install -Iv gunicorn==20.1.0
COPY . .

