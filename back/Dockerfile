FROM python:3.8.3-alpine as base
WORKDIR /app
RUN pip install --upgrade pip
# install psycopg2 dependencies
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev
WORKDIR /app
COPY requirements.txt /app

FROM base as dev
RUN pip install -r requirements.txt
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
