# Configuration du Serveur SSH pour Écouter sur le Port 2242

## Étapes de Configuration

### 1. Modifier le Fichier de Configuration SSH

1. **Ouvrir le fichier de configuration SSH avec un éditeur de texte :**

   ```bash
   sudo nano /etc/ssh/sshd_config
   ```

2. **Rechercher la ligne contenant `#Port 22` et la modifier pour :**

   ```plaintext
   Port 2242
   ```

   - Si la ligne est commentée (précédée par un `#`), décommentez-la en supprimant le `#`.
   - Changez `22` en `2242`.

---

### 2. Redémarrer le Service SSH

1. **Sauvegarder et fermer le fichier (`Ctrl+X`, puis `Y` et `Enter` pour `nano`).**

2. **Redémarrer le service SSH pour appliquer les changements :**

   ```bash
   sudo systemctl restart sshd
   ```

---
