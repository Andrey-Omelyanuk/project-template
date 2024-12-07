FROM python:3.12.4-alpine3.20 AS base
ARG RELEASE_VERSION
ENV RELEASE_VERSION=$RELEASE_VERSION
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
# set XDG_CACHE_HOME otherwise pylint trying to create cache in the / (root) but it have no access to do it
ENV XDG_CACHE_HOME=/app/.cache

RUN --mount=type=cache,target=/root/.cache/apk \
    apk update && apk upgrade && \
    apk add --no-cache \
    # base dependencies
    curl \
    # install psycopg2 dependencies
    postgresql-dev gcc python3-dev musl-dev

WORKDIR /app
COPY ./requirements.txt .
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install -r requirements.txt
EXPOSE 8000

# ------------------------------------------------------------------------------
FROM base AS dev
# use standard Ubuntu user
USER 1000

# ------------------------------------------------------------------------------
FROM base AS test
COPY . . 

# ------------------------------------------------------------------------------
FROM base AS prod
RUN pip install -Iv gunicorn==20.1.0
COPY . .
