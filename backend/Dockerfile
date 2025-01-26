# backend/Dockerfile
FROM node:22-alpine

WORKDIR /usr/src/app

# package.json, package-lock.json 복사
COPY package*.json ./

# 패키지 설치
RUN npm install --production

# 소스 복사
COPY . .

# 서버 구동
EXPOSE 3000
CMD ["node", "src/index.js"]
