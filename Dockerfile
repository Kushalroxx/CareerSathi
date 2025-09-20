FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma migrate deploy
RUN npx prisma generate
RUN npm run build
EXPOSE 8080
ENV PORT 8080
CMD ["npm", "start"]
