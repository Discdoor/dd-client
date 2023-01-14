# Use NODEJS
FROM node:16

# Setup image
WORKDIR /usr/src/client
COPY package*.json ./
COPY . ./
RUN npm install
RUN npm install -g typescript
RUN chmod +x /usr/src/client/docker/start.sh
EXPOSE 6144

# Setup nginx
FROM nginx
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
CMD [ "/usr/src/client/docker/start.sh" ]