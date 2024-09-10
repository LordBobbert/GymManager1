# Use an official node image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies, including nodemon as devDependency
RUN npm install

# Copy the rest of the application files
COPY . .

# Install nodemon globally for dev environment
RUN npm install -g nodemon

# Expose the port the app will run on
EXPOSE 3000

# Start the app with nodemon
CMD ["npm", "run", "dev"]
