import json
import os
import getpass

CONFIG_FILE = "config.json"


def create_config():
    username = input("Enter username: ")
    password = getpass.getpass("Enter password: ")

    config = {
        "username": username,
        "password": password
    }

    with open(CONFIG_FILE, "w") as f:
        json.dump(config, f)


if __name__ == "__main__":
    if os.path.exists(CONFIG_FILE):
        print("Configuration file already exists.")
    else:
        create_config()
