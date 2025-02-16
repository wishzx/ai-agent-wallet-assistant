FROM node:20 

# Install dependencies in the container's /app directory
WORKDIR /app
COPY package.json package-lock.json tsconfig.json ./
RUN npm install

# Transpile TypeScript
COPY src ./src
RUN npm run build

EXPOSE 3000

# Run the app from the dist directory (after the build)
CMD ["node", "dist/index.js"]
