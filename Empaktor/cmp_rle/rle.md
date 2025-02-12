# CMP_RLE


### Informations requises :
- <span style="color: #8A84E2">**Données à Compresser**</span> : Les données d'entrée, souvent constituées de symboles répétitifs ou de séquences répétées.

- <span style="color: #8A84E2">**Compteur d'Occurrences**</span> : Un compteur pour suivre le nombre d'occurrences consécutives d'un symbole spécifique.

- <span style="color: #8A84E2">**Symbole Courant**</span> : Le symbole actuel en cours d'examen pendant le processus de compression.

- <span style="color: #8A84E2">**Données Compressées**</span> : Les données résultantes après l'application du codage <span style="color: #97CC04">**RLE**</span>. Ces données peuvent être stockées ou transmises de manière plus efficace que les données d'origine.


### Exemple de requête :
```py
from rle import encode_rle, decode_rle

# Exemple 1
data = "AAABBBCCD"
encoded_data = encode_rle(data)
decoded_data = decode_rle(encoded_data)
print("Exemple 1:")
print("Données d'origine:", data)
print("Données encodées:", encoded_data[0])
print("Données décodées:", decoded_data)
print()

# Exemple 2
data = "@@@@11111111bbbb(((§§è!(§è§è!!çç!è!§è!çbbbaagggggyyyyyAAAççççç0000"
encoded_data = encode_rle(data)
decoded_data = decode_rle(encoded_data)
print("Exemple 2:")
print("Données d'origine:", data)
print("Données encodées:", encoded_data[0])
print("Données décodées:", decoded_data)
print()
```


### Exemple d'Output : 
```
Exemple 1:
Données d'origine: AAABBBCCD
Données encodées: 3A3B2C1D
Données décodées: AAABBBCCD

Exemple 2:
Données d'origine: @@@@11111111bbbb(((§§è!(§è§è!!çç!è!§è!çbbbaagggggyyyyyAAAççççç0000
Données encodées: 4@814b3(2§1è1!1(1§1è1§1è2!2ç1!1è1!1§1è1!1ç3b2a5g5y3A5ç40
Données décodées: @@@@11111111bbbb(((§§è!(§è§è!!çç!è!§è!çbbbaagggggyyyyyAAAççççç0000
```


### Description : 
 *Le codage <span style="color: #97CC04">**RLE**</span> requiert principalement les données d'entrée, et le processus de compression implique le suivi du nombre d'occurrences consécutives de chaque symbole. Cela permet de créer une version compressée des données en remplaçant les séquences répétées par des paires (nombre d'occurrences, symbole).*