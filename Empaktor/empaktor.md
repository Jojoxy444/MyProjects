# Empaktor
## Compression (`--compression`):
### Informations requises : 
*Pour la compression, les informations suivantes sont nécessaires :*

- <span style = "color :#8A84E2">**nom_archive**</span>: *Le nom du fichier d'archive résultant.*
- <span style = "color :#8A84E2">**algorithme**</span>: *L'algorithme de compression à utiliser ([rle](/cmp_rle/rle.md), [bwt](/cmp_burrows/bwt.md), [huffman](/cmp_huffman/huffman.md).)*
- <span style = "color :#8A84E2">**fichier1, fichier2, ..., fichierN**</span>: *Les fichiers à compresser.*


### Exemple de requête : 
```bash
python3 script.py nom_archive --compression algorithme fichier1 fichier2 ... fichierN
```
### Description :
*En fonction de l'algorithme choisi, le script effectuera la compression appropriée et générera les fichiers encodés, les fichiers de clé, les tables de fréquence et les arbres de <span style="color: #EEB902">**Huffman.**</span>*


## Extraction (`--extract`):
### Informations requises : 
*Pour l'extraction, les informations suivantes sont nécessaires :*
- <span style = "color :#8A84E2">**nom_archive**</span>: *Le nom du fichier d'archive à extraire*

### Exemple de requête : 
```bash
python script.py --extract nom_archive
```
### Description : 
*En mode extraction, le script décompresse les fichiers à partir de l'archive en utilisant les informations stockées pendant la compression (par exemple, les fichiers encodés, les fichiers de clé, les tables de fréquence et les arbres de <span style="color: #EEB902">**Huffman**</span>).*