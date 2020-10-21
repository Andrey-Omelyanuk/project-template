# install dependencies inside container
FROM node:12-alpine as dev 
WORKDIR /app

# before build prod container you have to build dist files
# prod is dist files and nginx (nothing more!)
FROM nginx:latest as prod 
WORKDIR /app
COPY  ./dist /app/
COPY dist/* ./

