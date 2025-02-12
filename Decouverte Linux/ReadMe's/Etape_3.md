## Étape 3 : Configuration des Répertoires et Permissions

1. **Créer les Répertoires :**

   ```bash
   sudo mkdir -p /data/admin
   sudo mkdir -p /data/compta
   sudo mkdir -p /data/commercial
   ```

2. **Définir les Permissions des Répertoires :**

   - **Répertoire `/data/admin` :**

     - Seuls les utilisateurs du groupe `admin` ont tous les droits.
     - Les autres groupes n'ont aucun droit.

     ```bash
     sudo chown root:admin /data/admin
     sudo chmod 770 /data/admin
     ```

   - **Répertoire `/data/compta` :**

     - Les membres des groupes `compta` et `admin` ont tous les droits.
     - Aucun accès pour les autres.

     ```bash
     sudo chown root:compta /data/compta
     sudo chmod 770 /data/compta
     sudo setfacl -m g:admin:rwx /data/compta
     ```

   - **Répertoire `/data/commercial` :**
     - Les membres des groupes `commercial` et `admin` ont tous les droits.
     - Les membres du groupe `compta` ont les droits de lecture uniquement.
     ```bash
     sudo chown root:commercial /data/commercial
     sudo chmod 770 /data/commercial
     sudo setfacl -m g:admin:rwx /data/commercial
     sudo setfacl -m g:compta:r-- /data/commercial
     ```

---
