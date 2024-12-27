# -----------------------------------------------------------------------------
FROM node:22.5-alpine3.20 AS base

ARG RELEASE_VERSION
ENV RELEASE_VERSION=$RELEASE_VERSION

RUN --mount=type=cache,target=/root/.cache/apk \
    apk update && apk upgrade && \
    # base dependencies
    # xdg-utils is required for storybook 
    apk add curl gcc git xdg-utils 

# app dependencies
WORKDIR /home/node/code


# -----------------------------------------------------------------------------
FROM base AS dev
USER node 
# vite 
EXPOSE 5173
# storybook
EXPOSE 6006   


# ------------------------------------------------------------------------------
# Install neovim for development in the container
FROM dev AS dev-nvim 

USER root 
RUN --mount=type=cache,target=/root/.cache/apk \
    apk add neovim ripgrep build-base wget

USER node 
RUN git clone https://github.com/NvChad/starter ~/.config/nvim
RUN mkdir /home/node/.local 
VOLUME /home/node/.local


# -----------------------------------------------------------------------------
FROM base AS build

COPY . /app
RUN yarn install --only=prod
RUN yarn build
# replase <RESEASE_VERSION> with the actual version
RUN sed -i "s/<RESEASE_VERSION>/$RELEASE_VERSION/g" /home/app/code/build/index.html 


# -----------------------------------------------------------------------------
FROM nginx:1.25.1-alpine AS prod

COPY --from=build /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/
# inject settings to the frontend
# RUN echo "{test: 10}" > /app/test.js
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
