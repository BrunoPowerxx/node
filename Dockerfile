# Use Node.js as the base image
FROM mcr.microsoft.com/playwright:v1.39.0-focal

# Set the working directory 
WORKDIR /app

# Install Zerostep Playwright AI
RUN npm install @zerostep/playwright -D

# Copy your zerostep.config.json file into the container
COPY zerostep.config.json /app/zerostep.config.json

# copy scripts
COPY . .

# Set the entry point for running tests
CMD ["npx", "playwright", "test"]
