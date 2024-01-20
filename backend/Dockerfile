# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set sample environment variable (replace with your actual environment variables)
ENV DATABASE_URL=file:./dev.db
ENV OPENAI_API_KEY=sk....

# Run Prisma migrations
RUN npx prisma migrate dev --name init

# Expose the port the app runs on
EXPOSE 3001

# Define the command to run your app
CMD ["npm", "start"]
