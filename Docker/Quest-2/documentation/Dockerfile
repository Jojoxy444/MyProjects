FROM debian:12

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y git sass hugo golang-go

EXPOSE 1313

CMD ["hugo", "server", "--bind", "0.0.0.0"]