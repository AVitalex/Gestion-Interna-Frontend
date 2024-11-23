# Base image for all stages
ARG NODE_VERSION=20.17.0
FROM node:${NODE_VERSION}-alpine as base

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies using npm
RUN npm install

# Copy the entire project into the container
COPY . .

# Expose the port the app runs on (default for React dev server is 3000)
EXPOSE 3000
EXPOSE 8080

# Command to start the app
CMD ["npm", "start"]