## Étape 2 : Création des `Groupes` et `Utilisateurs`

1. **Création des `Groupes` :**

   ```bash
   sudo groupadd -g 4242 admin
   sudo groupadd -g 4343 compta
   sudo groupadd -g 4444 commercial
   ```

2. **Création des `Utilisateurs` et Ajout aux `Groupes` :**

   ```bash
   sudo useradd -m -G admin bob
   sudo useradd -m -G admin toto
   sudo useradd -m -G admin john

   sudo useradd -m -G compta alice
   sudo useradd -m -G compta martine

   sudo useradd -m -G commercial marc
   sudo useradd -m -G commercial jean
   sudo useradd -m -G commercial tata
   ```

---
