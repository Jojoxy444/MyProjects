from interface import launch_menu
from login import login

if __name__ == "__main__":
    if login():
        launch_menu()
