echo "Mise à jour de Homebrew..."
brew update

echo "Installation de Python..."
brew install python

echo "Installation de pip..."
brew install pip

echo "Vérification de l'installation de Python et pip..."
python3 --version
pip3 --version

echo "Création de l'environnement virtuel..."
python3 -m venv minitel_env

echo "Activation de l'environnement virtuel..."
source minitel_env/bin/activate

if [ $? -eq 0 ]; then
    echo "L'environnement virtuel est maintenant activé."
    echo "Utilisez 'deactivate' pour quitter l'environnement virtuel."
else
    echo "Erreur lors de l'activation de l'environnement virtuel."
    exit 1
fi

python3 --version
pip3 --version

cd minitel_project

echo "Installation des dépendances..."
pip install -r ../requirements.txt --break-system-packages

python3 main.py
