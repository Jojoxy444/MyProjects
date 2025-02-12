## Installation de Symfony

Tout d'abord il faut installer `symfony` sur notre VM pour pouvoir l'utiliser:

```sh
wget https://get.symfony.com/cli/installer -O - | bash
```

Juste après il faut créer le fichier ou sera mit notre site internet de `symfony` avec la création du dossier

```sh
sudo rm -rf /home/student/projet
sudo mkdir -p /home/student/projet
cd /home/student/projet
```

Puis il ne manque plus qu'à créer notre projet

```sh
symfony new --full projet
```

## Configuration du Virtual Host Apache2

On ouvre le fichier de configuration Apache2 pour les Virtual Host. Il se trouve généralement dans /etc/apache2/sites-available/.

```sh
sudo nano /etc/apache2/sites-available/symfony.apache2.local.conf
```

Et, on y ajoute le contenu suivant pour configurer le Virtual Host :

```apache
<VirtualHost *:80>
    ServerName symfony.apache2.local
    DocumentRoot /home/student/projet/public

    <Directory /home/student/projet/public>
        AllowOverride None
        Order Allow,Deny
        Allow from All
        Require all granted
        Options -Indexes +FollowSymLinks
        RewriteEngine On
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteRule ^(.*)$ index.php [QSA,L]
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/symfony_error.log
    CustomLog ${APACHE_LOG_DIR}/symfony_access.log combined
</VirtualHost>
```

## Modifier le fichier hosts

On ouvre le fichier hosts de notre système d'exploitation, /etc/hosts

```sh
sudo nano /etc/hosts
```

On y ajoute une entrée pour notre URL personnalisée en associant l'adresse IP de notre machine à symfony.apache2.local :

```sh
127.0.0.1 symfony.apache2.local
```

## Activation du Virtual Host

Pour activer le virtual host, on entre cette commande :

```sh
sudo a2ensite symfony.apache2.local.conf
```

et on active aussi le module `rewrite` d'Apache pour Symfony :

```sh
sudo a2enmod rewrite
```

## Redémarrage d'Apache2

Après avoir sauvegardé nos modifications dans le fichier de configuration Apache2, et activer le virtual host, on redémarre le service Apache2 pour qu'il prenne en compte les changements :

```bash
sudo systemctl restart apache2
```

## Accès au projet

Avant de rentrer directement l'url dans notre navigateur, il faut associer dans le fichier `/etc/hosts` de notre ordinateur l'ip de la VM avec l'url `symfony.apache2.local`

```sh
172.16.230.28   symfony.apache2.local
```

Voila, désormais, on doit maintenant pouvoir accéder à notre projet Symfony en utilisant l'URL http://symfony.apache2.local dans notre navigateur.
