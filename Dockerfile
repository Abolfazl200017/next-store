FROM node:18.19-alpine3.18

WORKDIR /app

# Install dependencies required for development
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the source code
COPY src ./src
COPY public ./public
COPY next.config.ts ./
COPY tsconfig.json ./
# Copy specific env files instead of wildcard
COPY .env .env
COPY .env.local .env.local

# Expose port 3000
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]