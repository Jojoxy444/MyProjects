docker network create front-end

docker network create back-end

docker build -t python-image ./vote_app/vote

docker build -t javascript-image ./vote_app/result

docker build -t worker-image ./vote_app/worker

docker build -t postgres-image /postgres

docker build -t redis-image /redis

docker run -d --name db --network=back-end -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres postgres

docker run --network=back-end --name redis -p 6379:6379 -d redis

docker run -p 80:8000 --name worker --network=back-end -d worker

docker run -p 4000:4000 --name javascript --network=back-end -d javascript

docker run -p 5000:5000 --name python --network=back-end -d python

docker network connect front-end python

docker network connect front-end javascript