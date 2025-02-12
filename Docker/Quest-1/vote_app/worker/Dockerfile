FROM debian:12-slim

WORKDIR /app

COPY . .

RUN apt-get update && apt-get upgrade -y

RUN apt-get install -y wget && \
    rm -rf /var/lib/apt/lists/* && \
    wget https://packages.microsoft.com/config/debian/12/packages-microsoft-prod.deb -O packages-microsoft-prod.deb && \
    dpkg -i packages-microsoft-prod.deb && rm packages-microsoft-prod.deb

RUN apt-get update && \
    apt-get install -y dotnet-sdk-7.0

RUN dotnet restore && dotnet publish -c release -o out

CMD ["dotnet", "out/Worker.dll"]