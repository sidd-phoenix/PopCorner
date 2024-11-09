# Step 1: Use a Node.js base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json only
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy rest of the files
COPY . .

# Step 6: Expose the port the gateway will run on
EXPOSE 3001

# Step 7: Command to run the API gateway
CMD [ "node", "gateway.js" ]
