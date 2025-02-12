FROM debian:12

RUN apt update && \
    apt install -y python3.11 python3-pip

WORKDIR /app

COPY . /app

RUN pip3 install virtualenv --break-system-packages

RUN virtualenv .venv

RUN /bin/bash -c "source .venv/bin/activate"

RUN pip3 install -r requirements.txt --break-system-packages

EXPOSE 5000

CMD ["gunicorn", "app:app", "-w", "2", "--bind", "0.0.0.0:5000", "--access-logfile=-", "--keep-alive=0"]
