# Use NODEJS
FROM node:16

# Setup image
WORKDIR /usr/src/client
COPY package*.json ./
COPY . ./
RUN npm install
RUN npm install -g typescript
RUN chmod +x server.sh
EXPOSE 6144

CMD [ "npm", "run", "serve" ]