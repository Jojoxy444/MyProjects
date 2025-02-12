# Vote application

This folder contains the code for the vote application.

## How to install it?

First, make sure that you are using a virtual environment:

```console
$ pip install virtualenv    # Install the virtualenv binary
Requirement already satisfied: virtualenv in /usr/local/lib/python3.11/site-packages (20.24.0)
$ virtualenv .venv          # Create a new virtual environment
$ source .venv/bin/activate # Activate the virtual environment. Be careful, this commands may change regarding your python version/installation.
```

Then, install the dependencies:

```console
$ pip install -r requirements.txt
Collecting Flask
  Using cached Flask-2.3.2-py3-none-any.whl (96 kB)
...
```

## How to run it?

You can use the `gunicorn` executable to run your server (recommended):

```console
$ gunicorn app:app -w 2 -b 0.0.0.0:80 --log-file=- --access-logfile=- --keep-alive=0
```

Or for local development, you can directly use the `python` executable:

```console
$ python app.py
```

> For more information about `gunicorn`, check the [official documentation](https://gunicorn.org/).
