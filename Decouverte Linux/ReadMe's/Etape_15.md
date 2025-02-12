# Configuration `Fail2Ban`

## Installation

Pour installer Fail2Ban, on exécute les commandes suivantes :

```sh
sudo apt-get update
sudo apt-get install fail2ban
```

## Configuration

On créé ou modifie le fichier /etc/fail2ban/jail.local avec le contenu suivant :

```sh
[DEFAULT]
bantime = 10m
findtime = 10m
maxretry = 7

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 7

[apache-403]
enabled = true
port = http,https
filter = apache-403
logpath = /var/log/apache2/error.log
maxretry = 5
```

On créé le filtre apache-403 dans /etc/fail2ban/filter.d/apache-403.conf :

```sh
[Definition]
failregex = ^<HOST> -.\*" 403
ignoreregex =
```

Puis, on redémarre le service Fail2Ban pour appliquer les changements :

```sh
sudo systemctl restart fail2ban
```

## Utilisation des commandes Fail2Ban

### Voir les jails actives sur Fail2Ban :

```sh
sudo fail2ban-client status
```

### Voir quelles IPs ont été bloquées :

```sh
sudo fail2ban-client status sshd
sudo fail2ban-client status apache-403
```

### Débloquer une IP bloquée :

```sh
sudo fail2ban-client set sshd unbanip <IP_ADDRESS>
sudo fail2ban-client set apache-403 unbanip <IP_ADDRESS>
```
