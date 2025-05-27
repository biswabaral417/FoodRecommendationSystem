# Use Node.js image
FROM node:18

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Compile TypeScript
RUN npm run build

# Start the app
CMD ["node", "dist/index.js"]
