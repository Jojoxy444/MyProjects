## Étape 4 : Configuration du Répertoire `coms` et gestion des accès pour chacun des utilisateurs

1. **Ajouter le Répertoire `coms` :**

   ```bash
   mkdir -p /data/compta/coms
   ```

2. **Configurer les Permissions :**

   - Les membres du groupe `commercial` ont les droits de lecture et d'écriture uniquement sur ce répertoire (`coms`), mais pas sur les autres répertoires dans `/data/compta`.
   - Les autres groupes n'ont aucun accès à ce répertoire.

   ```bash
   sudo chown root:compta /data/compta/coms
   sudo chmod 770 /data/compta/coms
   sudo setfacl -m g:commercial:rw /data/compta/coms
   sudo setfacl -m g:compta:0 /data/compta/coms
   sudo setfacl -m g:admin:0 /data/compta/coms
   sudo setfacl -m o::0 /data/compta/coms
   ```

---

## Création et Permissions des Fichiers

1.1. **Se connecter en tant que l'utilisateur concerné :**

```bash
su marc
```

1.2. **Créer les Fichiers :**

```bash
touch /data/compta/coms/com_marc
```

- Réeffectuer la même opération pour chacun des utilisateurs, jean et tata

---

2. **Définir les Propriétaires et Groupes :**

   ```bash
   sudo chown marc:commercial /data/compta/coms/com_marc
   sudo chown jean:commercial /data/compta/coms/com_jean
   sudo chown tata:commercial /data/compta/coms/com_tata
   ```

---

3. **Définir les Permissions des Fichiers :**

   ```bash
   sudo chmod 640 /data/compta/coms/com_marc
   sudo chmod 640 /data/compta/coms/com_jean
   sudo chmod 640 /data/compta/coms/com_tata
   ```

   - **Permissions définies :**
     - **`640`** : Le propriétaire peut lire et écrire (`rw-`), le groupe peut lire (`r--`), et les autres n'ont aucun accès (`---`).

---

## Vérification des Accès

- **Marc peut-il ouvrir le fichier `com_jean` ?**

  Oui, Marc peut ouvrir le fichier `com_jean`. Etant donné que Marc fait lui aussi parti du groupe `commercial`, il possède lui aussi les permissions de lecture et d'écriture dans le répertoire `/data/compta/coms`. Cependant les permissions du fichier `com_jean` sont définies de manière à ce que seul le propriétaire (Jean) puisse écrire. Ainsi, Marc peut simplement lire le fichier de Jean, sans pouvoir le modifier.

  - **Explication :** Le fichier `com_jean` a les permissions `640`, ce qui signifie que seul Jean (propriétaire) a les droits d'écriture, et les membres du groupe `commercial` peuvent seulement lire le fichier. Marc, bien qu'il soit dans le même groupe, n'aura ainsi que les permissions de lecture, et ne pourra donc pas modifier le fichier.

---
