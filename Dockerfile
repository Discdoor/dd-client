# Use NODEJS
FROM node:16

# Setup image
WORKDIR /usr/src/client
COPY package*.json ./
COPY . ./
RUN npm install
RUN npm install -g typescript
EXPOSE 4096

CMD [ "npm", "run", "serve" ]