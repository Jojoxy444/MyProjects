FROM debian:12

RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

RUN apt-get install -y npm

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 4000

CMD ["node", "server.js"]
