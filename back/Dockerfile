FROM python:3.8.3-alpine as base
WORKDIR /app
# RUN pip install --upgrade pip
ENV CRYPTOGRAPHY_DONT_BUILD_RUST=1
RUN apk add --update --no-cache \
    # install psycopg2 dependencies
    postgresql-dev gcc python3-dev musl-dev \
    # install lxml dependencies
    g++ gcc libxml2-dev libxslt-dev libffi-dev
WORKDIR /app
COPY requirements.txt /app

FROM base as dev
RUN pip install -r requirements.txt
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
