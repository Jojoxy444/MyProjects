# CMP_Huffman


### Informations requises : 
- <span style="color: #8A84E2">**Fréquences des Symboles**</span> : La fréquence d'occurrence de chaque symbole dans les données à compresser. Ces fréquences sont souvent calculées avant le processus de compression.

- <span style="color: #8A84E2">**Arbre de Huffman**</span> : L'arbre binaire construit à partir des fréquences des symboles. Cet arbre est utilisé pour générer les codes binaires. Chaque feuille de l'arbre représente un symbole, et le chemin de la racine à une feuille donne le code binaire associé au symbole.

- <span style="color: #8A84E2">**Table de Codage**</span> : Une table qui associe chaque symbole à son code binaire correspondant dans l'arbre de <span style="color: #97CC04">**Huffman**</span>. Cela est souvent utilisé lors de la compression et de la décompression pour traduire entre les symboles d'origine et leurs représentations binaires.

- <span style="color: #8A84E2">**Données à Compresser**</span> : Les données réelles à compresser, constituées de symboles à encoder.

- <span style="color: #8A84E2">**Données Compressées**</span> : Les données résultantes après l'application du codage Huffman. Ces données peuvent être stockées ou transmises de manière plus efficace que les données d'origine.


### Exemple de requête : 
```py 
from huffman import compress_data

# Exemple 1
data = "aabbbccdddd"
compressed_data = compress_data(data)
print("Données compressées:", compressed_data)
```


### Exemple d'Output :
```
Données compressées: 0000101010010111111111
```


### Description : 
*Le codage <span style="color: #97CC04">**Huffman**</span> nécessite des informations sur la fréquence des symboles dans les données à compresser, et il utilise ces informations pour construire un arbre de <span style="color: #97CC04">**Huffman**</span> qui guide la création des codes binaires pour chaque symbole. La table de codage ainsi créée est ensuite utilisée pour encoder et décoder les données.*

