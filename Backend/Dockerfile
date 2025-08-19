# Use Node.js 18
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the source code
COPY . .

# Compile TypeScript
RUN npm run build

# Copy SQL files into dist so backend can read them
COPY ./src/db/queries ./dist/db/queries

# Expose the port (optional, for clarity)
EXPOSE 5000

# Start the app
CMD ["node", "dist/index.js"]
