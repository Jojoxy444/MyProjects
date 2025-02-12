# Installation d'Apache 2.4 et PHP 7.4 avec blocage des versions

## Étapes d'installation

1. **Mise à jour des paquets** :
   Avant d'installer de nouveaux logiciels, on s'assure que les paquets actuels sont à jour en exécutant les commandes suivantes :

   ```bash
   sudo apt update
   sudo apt upgrade
   ```

2. **Installation d'Apache 2.4** :
   Pour installer Apache 2.4, on utilise la commande suivante :

   ```bash
   sudo apt install apache2
   ```

3. **Installation de PHP 7.4** :
   Pour installer PHP 7.4 et ses modules, on utilise les commandes suivantes :

   **_Mise à jour du système :_**

   ```bash
   sudo apt-get update
   ```

   **_On télécharge la clé GPG le dépot PPA :_**

   ```bash
   sudo apt -y install lsb-release apt-transport-https ca-certificates
   sudo wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
   ```

   **_On ajoute le dépot PPA :_**

   ```bash
   echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/php.list
   ```

   **_Puis on installe enfin PHP 7.4 :_**

   ```bash
   sudo apt update
   sudo apt -y install php7.4
   ```

---

## Blocage des versions

1. **Blocage des versions avec apt** :
   Pour empêcher la mise à jour des versions actuellement installées d'Apache 2.4 et PHP 7.4, on utilise la commande `apt-mark` pour marquer ces paquets comme étant installés manuellement. Cela les empêchera d'être mis à jour automatiquement lors des mises à jour du système.

   ```bash
   sudo apt-mark hold apache2 php7.4 php7.4-common php7.4-cli php7.4-mysql php7.4-xml php7.4-curl php7.4-json php7.4-zip
   ```

---
