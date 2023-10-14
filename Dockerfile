FROM node:14.15-alpine  as build-stage
#RUN  apk update && apk add python make gcc g++ libpq postgresql-dev
WORKDIR /app
COPY ./package.json ./package-lock.json  ./
RUN npm install
COPY ./  ./
#RUN npm run test
RUN npm run build

FROM nginx
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

