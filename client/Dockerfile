# Use an official Node.js runtime as a parent image
FROM node:lts-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container's /app directory
COPY package*.json ./

# Install app dependencies
RUN npm ci --omit=dev

# Install Sharp https://nextjs.org/docs/messages/sharp-missing-in-production
RUN npm i sharp

# Check for known security vulnerabilities in the installed
RUN npm audit

# Copy the rest of the application code to the container's /app directory
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000 for the container
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "start"]
