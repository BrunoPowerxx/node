# Use Node.js as the base image
FROM mcr.microsoft.com/playwright:v1.48.2-focal

# Set the working directory 
WORKDIR /app

RUN apt-get update && apt-get install -y xvfb

# Install Zerostep Playwright AI
RUN npm install @zerostep/playwright -D

# Copy your zerostep.config.json file into the container
COPY zerostep.config.json /app/zerostep.config.json

# Install headless
RUN npm install headless

# copy scripts
COPY . .

# Set the entry point for running tests
CMD ["xvfb-run", "-s", "-screen 0 1024x768x24", "npx", "playwright", "test", "--headed"]
