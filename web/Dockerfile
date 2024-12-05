# -----------------------------------------------------------------------------
FROM node:22.5-alpine3.19 AS base
ARG RELEASE_VERSION
ENV RELEASE_VERSION=$RELEASE_VERSION
WORKDIR /app

# -----------------------------------------------------------------------------
FROM base AS dev
# xdg-utils is required for storybook 
RUN apk add --no-cache xdg-utils
# 6006 for storybook
EXPOSE 6006   
EXPOSE 3000 
# use standard Ubuntu user
USER 1000

# -----------------------------------------------------------------------------
FROM base AS build
COPY . /app
RUN yarn install --only=prod
RUN yarn build
# replase <RESEASE_VERSION> with the actual version
RUN sed -i "s/<RESEASE_VERSION>/$RELEASE_VERSION/g" /app/build/index.html 

# -----------------------------------------------------------------------------
FROM nginx:1.25.1-alpine AS prod
COPY --from=build /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/
# inject settings to the frontend
# RUN echo "{test: 10}" > /app/test.js
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
