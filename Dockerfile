# ---- Etapa de build ----
FROM node:22-alpine AS build

WORKDIR /app

# Instala dependencias aprovechando la cache de Docker
COPY package.json package-lock.json ./
RUN npm ci

# Copia el codigo y genera el build estatico
COPY . .

# Ruta base bajo la que se sirve la app (ej: /franc/calculadora/)
ARG VITE_BASE=/
ENV VITE_BASE=$VITE_BASE
RUN npm run build

# ---- Etapa de produccion ----
FROM nginx:alpine

# Config de nginx del contenedor (fallback SPA)
COPY deploy/default.conf /etc/nginx/conf.d/default.conf

# Copia solo el resultado del build
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
