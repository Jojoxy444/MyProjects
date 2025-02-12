# Informations sur PHP

## 1. Affichage de l'emplacement du binaire PHP

### Commande 1

```bash
which php
```

Résultat :

```bash
/usr/bin/php
```

### Commande 2

```bash
whereis php
```

Résultat :

```bash
php: /usr/bin/php /usr/lib/php /etc/php /usr/share/man/man1/php.1.gz
```

## 2. Affichage de la version de PHP actuelle

Pour afficher la version actuelle de PHP, on utilise la commande suivante :

```bash
php -v
```

Résultat :

```bash
PHP 7.4.33 (cli) (built: Apr 22 2024 09:44:17) ( NTS )
Copyright (c) The PHP Group
Zend Engine v3.4.0, Copyright (c) Zend Technologies
    with Zend OPcache v7.4.33, Copyright (c), by Zend Technologies
```

## 3. Installation de PHP 5.6 en parallèle

Pour installer PHP 5.6 en parallèle de la version actuelle, on ajoute un dépôt pour installer PHP 5.6 :

```bash
apt-get -y install apt-transport-https lsb-release ca-certificates
wget -q -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list
```

On met à jour la liste des paquets disponibles :

```bash
sudo apt-get update
```

On installe PHP 5.6 et les modules supplémentaires nécessaires :

```bash
sudo apt-get -y install php5.6 php5.6-common php5.6-gd php5.6-mysql php5.6-imap php5.6-cli php5.6-cgi php-pear php5.6-curl php5.6-intl php5.6-pspell php5.6-sqlite3 php5.6-tidy php5.6-xmlrpc php5.6-xsl php-memcache php-imagick php-gettext php5.6-zip php5.6-mbstring php5.6-soap php5.6-memcached php5.6-redis php5.6-fpm
```

On vérifie que PHP 5.6 est installé correctement :

```bash
php5.6 -v
```

Et on obtient ce résultat :

```bash
PHP 5.6.40-70+0~20240421.84+debian12~1.gbp0c0ec4 (cli)
Copyright (c) 1997-2016 The PHP Group
Zend Engine v2.6.0, Copyright (c) 1998-2016 Zend Technologies
    with Zend OPcache v7.0.6-dev, Copyright (c) 1999-2016, by Zend Technologies
```
