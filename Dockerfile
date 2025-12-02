# -----------------------------
# 1) Builder Stage
# -----------------------------
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of project
COPY . .

# Build Next.js App
RUN npm run build

# -----------------------------
# 2) Runner Stage (Production)
# -----------------------------
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only required build files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Expose port 3000
EXPOSE 3000

# Start Next.js server
CMD ["npm", "start"]
