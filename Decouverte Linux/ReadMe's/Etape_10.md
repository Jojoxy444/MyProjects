# Installation de WordPress avec Mysql

## Étapes

1. **Installation de MariaDB**

   ```bash
   sudo apt update
   sudo apt install mariadb-server -y
   ```

2. **Sécurisation de MariaDB**

   ```bash
   sudo mysql_secure_installation
   ```

3. **Installation d'Apache et PHP**

   ```bash
   sudo apt install apache2 php libapache2-mod-php php-mysql -y
   ```

4. **Téléchargement et Configuration de WordPress**

   ```bash
   cd /tmp
   wget https://wordpress.org/latest.tar.gz
   tar xvf latest.tar.gz
   sudo mv wordpress /var/www/html/
   cd /var/www/html/wordpress
   sudo cp wp-config-sample.php wp-config.php
   sudo nano wp-config.php
   ```

   Dans le fichier `wp-config.php`, on configure les informations de la base de données MariaDB :

   ```php
   define('DB_NAME', 'wordpress');
   define('DB_USER', 'root');
   define('DB_PASSWORD', 'password');
   define('DB_HOST', 'localhost');
   ```

5. **Attribution des permissions nécessaires**

   ```bash
   sudo chown -R www-data:www-data /var/www/html/wordpress
   sudo chmod -R 755 /var/www/html/wordpress
   ```

6. **Création de la base de données WordPress**

   ```bash
   sudo mysql -u root -p
   ```

   On entre notre mot de passe MySQL et on exécute les commandes SQL suivantes :

   ```sql
   CREATE DATABASE wordpress;
   CREATE USER 'wordpress'@'localhost' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON wordpress.* TO 'wordpress'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

7. **Redémarrage d'Apache**

   ```bash
   sudo systemctl restart apache2
   ```

8. **Accéder à WordPress dans votre navigateur**

   On entre l'adresse IP de votre serveur dans la barre d'adresse du navigateur.

9. **Texte personnalisé sur la page d'accueil**

   On se connecte à l'interface d'administration de WordPress et on ajoute le texte "Bob the builder can break your step." sur la page d'accueil.

---
