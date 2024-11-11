FROM mcr.microsoft.com/playwright:v1.48.2-focal

WORKDIR /app

RUN npm install @zerostep/playwright -D

COPY zerostep.config.json /app/zerostep.config.json

RUN npm install headless

COPY . .

CMD ["npx", "playwright", "test"]
