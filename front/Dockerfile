# TODO: we need the base 
FROM node:15-alpine as dev 
RUN apk add --no-cache git
WORKDIR /app

FROM dev as build
COPY package.json /app/package.json
RUN yarn install --only=prod
COPY . /app
RUN yarn build

FROM nginx:1.16.0-alpine as prod
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
