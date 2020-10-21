FROM python:3.8.3-alpine as base
WORKDIR /app
RUN pip install --upgrade pip
# install psycopg2 dependencies
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev

FROM base as dev
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

