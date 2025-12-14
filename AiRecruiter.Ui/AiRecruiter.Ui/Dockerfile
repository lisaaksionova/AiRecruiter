# syntax=docker/dockerfile:1
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 5173

# Set host to 0.0.0.0 to allow external connections
ENV HOST=0.0.0.0

# Start the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
