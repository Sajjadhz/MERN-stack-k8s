# => Build container
FROM node:10 as build

WORKDIR /cloudl-client

COPY package.json /cloudl-client/package.json

RUN npm install

RUN npm install react-scripts -g

COPY . /cloudl-client

RUN npm run build

# => Run container
FROM nginx:1.16.0

COPY --from=build /cloudl-client/build /usr/share/nginx/html

COPY nginx/nginx-default.conf.template /etc/nginx/conf.d/default.conf.template

COPY nginx/docker-entrypoint.sh /cloudl-client/
ENTRYPOINT ["/cloudl-client/docker-entrypoint.sh"]

EXPOSE 80

# Start Nginx server
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]