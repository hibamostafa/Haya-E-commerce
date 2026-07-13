# Stage 1: Build the React application
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application statically using Nginx
FROM nginx:stable-alpine
# Copy compiled files to the default Nginx public directory
# (Note: Use /app/dist for Vite, or change to /app/build if using Create React App)
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]