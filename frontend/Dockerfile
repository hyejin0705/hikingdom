# build stage
FROM node:18.14.2-slim AS build
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install

# copy files to docker container
COPY . ./
RUN npm run build

# production stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# remove default nginx static resources
RUN rm -rf ./*

# copy images from build stage
COPY --from=build /app/build .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
