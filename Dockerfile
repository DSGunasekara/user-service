FROM node:15.13-alpine
WORKDIR /user-service
ADD package*.json ./
RUN npm install
ADD . .
CMD ["npm", "start"]