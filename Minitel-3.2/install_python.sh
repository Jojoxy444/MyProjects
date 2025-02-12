#!/bin/bash

echo "Mise à jour du système..."
sudo apt update && sudo apt upgrade -y

echo "Installation de Python..."
sudo apt install python3 python3-venv -y

echo "Installation de pip..."
sudo apt install python3-pip -y

echo "Vérification de l'installation de Python et pip..."
python3 --version
pip3 --version

echo "Activation de l'environnement virtuel..."
source minitel_env/bin/activate

echo "L'environnement virtuel est maintenant activé."
echo "Utilisez 'deactivate' pour quitter l'environnement virtuel."

python3 --version
pip3 --version

cd minitel_project
python3 main.py
