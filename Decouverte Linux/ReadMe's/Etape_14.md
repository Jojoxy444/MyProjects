## Désactivation d'Apache

Pour stopper `Apache`, on exécute la commande suivante :

```sh
sudo systemctl stop apache2
```

Puis, pour désactiver `Apache`, on exécute la commande suivante :

```sh
sudo systemctl disable apache2
```

---

## Installation de Nginx :

Pour installer `Nginx`, on exécute les commandes suivantes :

```sh
sudo apt-get update
sudo apt-get install nginx
```

---

## Configuration de Nginx

### Wordpress

On créé un nouveau bloc serveur pour WordPress :

```sh
sudo nano /etc/nginx/sites-available/wordpress
```

et on y ajoute la configuration suivante :

```nginx
server {
listen 80;
server_name wordpress.nginx.local;

    root /www/var/html/wordpress;
    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.x-fpm.sock;
    }

    location ~ /\.ht {
        deny all;
    }

}
```

Enfin, on active le bloc serveur :

```sh
sudo ln -s /etc/nginx/sites-available/wordpress /etc/nginx/sites-enabled/
```

### Symfony

On créé un nouveau bloc serveur pour Symfony :

```sh
sudo nano /etc/nginx/sites-available/symfony
```

et on y ajoute la configuration suivante :

```nginx
server {
listen 80;
server_name symfony.nginx.local;

    root /home/student/projet/public;
    index index.php index.html index.htm;

    location / {
        try_files $uri /index.php$is_args$args;
    }

    location ~ ^/index\.php(/|$) {
        fastcgi_pass unix:/var/run/php/php7.x-fpm.sock;
        fastcgi_split_path_info ^(.+\.php)(/.*)$;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT $realpath_root;
        internal;
    }

    location ~ \.php$ {
        return 404;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }

}
```

Enfin, on active le bloc serveur :

```sh
sudo ln -s /etc/nginx/sites-available/symfony /etc/nginx/sites-enabled/
```

---

## Mise à jour du fichier Hosts

On ajoute les lignes suivantes à notre fichier `/etc/hosts` pour accéder aux différentes URL :

```sh
sudo nano /etc/hosts
```

```sh
127.0.0.1 wordpress.nginx.local
127.0.0.1 symfony.nginx.local
```

## Redémarrage de Nginx

```sh
sudo systemctl restart nginx
```

---

Désormais nous pouvons être en mesure d'accéder à notre site WordPress à l'adresse http://wordpress.nginx.local et à notre projet Symfony à l'adresse http://symfony.nginx.local.
