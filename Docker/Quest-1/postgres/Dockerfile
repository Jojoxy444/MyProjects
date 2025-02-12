FROM debian:12

RUN apt update && \
    apt-get install -y postgresql

USER postgres
ENV PATH=$PATH:/usr/lib/postgresql/15/bin/
RUN initdb /var/lib/postgresql/15/data
COPY pg_hba.conf /var/lib/postgresql/15/data/pg_hba.conf

WORKDIR /var/lib/postgresql/15/data

CMD ["postgres", "-D", "/var/lib/postgresql/15/data", "-h", "0.0.0.0"]
