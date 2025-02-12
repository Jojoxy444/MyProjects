# Worker

This folder contains the code for the worker.

## How to install it?

First, you will need to install all dependencies using `dotnet restore`

```console
$ dotnet restore
```

Then, build your program using `dotnet publish`

```console
$ dotnet publish -c release -o /app
```

## How to run it?

To run the worker, you will only need to execute the `Worker.dll` file using `dotnet`

```console
$ cd ./app
$ dotnet Worker.dll
Starting server ...
```
