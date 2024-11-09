# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json only
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the app source code
COPY . .

# Set the port environment variable to 3006 to start react app there
#env and exposed ports should be same
# ENV PORT 3006

# Expose the port for the React app
EXPOSE 3000

# Start the frontend
CMD ["npm", "start"]
