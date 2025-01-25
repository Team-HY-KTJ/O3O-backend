FROM node:22-alpine

WORKDIR /app
COPY package*.json ./backend/
RUN npm install --prefix ./backend

COPY . ./backend

EXPOSE 3000
CMD ["npm", "start", "--prefix", "./backend"]
