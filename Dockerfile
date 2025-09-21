FROM node:22-alpine
RUN apk add --no-cache openssl1.1
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 8080
ENV PORT 8080
CMD ["npm", "start"]
