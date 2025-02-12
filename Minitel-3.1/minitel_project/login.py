import os
import json
import getpass
import curses
from interface import launch_menu

CONFIG_FILE = "config.json"


def load_config():
    if not os.path.exists(CONFIG_FILE):
        print("Configuration file not found. Please run the setup script.")
        return None

    with open(CONFIG_FILE, "r") as f:
        return json.load(f)


def authenticate_user(config):
    attempts = 3
    while attempts > 0:
        username = input("Enter username: ")
        password = getpass.getpass("Enter password: ")

        if username == config["username"] and password == config["password"]:
            return True
        else:
            attempts -= 1
            print(f"Invalid credentials. You have {attempts} attempts left.")

    return False


if __name__ == "__main__":
    config = load_config()
    if config and authenticate_user(config):
        curses.wrapper(launch_menu)
    else:
        print("Authentication failed. Please try again.")
