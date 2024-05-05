# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY package.json .
RUN npm install

# Bundle your app's source code inside the Docker image
COPY . .

ENV PORT 8000

EXPOSE ${PORT}

# Command to run the application
CMD ["npm", "start"]