# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

#INstaller les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Builder l'app
RUN npm run build


# Stage 2: Production
FROM node:22-alpine

WORKDIR /app

# Installer un serveur HTTP léger
RUN npm install -g serve

# Copier la build depuis le builder
COPY --from=builder /app/dist ./dist

# Exposer le port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

  # Lancer l'app
  CMD ["serve", "-s", "dist", "-l", "3000"]

