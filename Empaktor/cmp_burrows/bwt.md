# CMP_Burrows Wheeler

### Informations requises : 

 - <span style="color: #8A84E2">**Input Data (Données en entrée)**</span>: Les données à compresser, généralement sous forme de chaîne de caractères.

 - <span style="color: #8A84E2">**Transformation Function (Fonction de transformation)**</span>: La fonction qui applique la transformation de Burrows-Wheeler aux données en entrée. C'est la fonction <span style="color: #EEB902">**transform_bwt**</span> dans votre exemple.

 - <span style="color: #8A84E2">**Inverse Transformation Function (Fonction de transformation inverse)**</span>: La fonction qui inverse la transformation de Burrows-Wheeler pour récupérer les données d'origine. C'est la fonction <span style="color: #EEB902">**inverse_bwt**</span> dans votre exemple.

 - <span style="color: #8A84E2">**Original Index (Indice d'origine)**</span>: Lors de la transformation de Burrows-Wheeler, l'algorithme génère une nouvelle séquence et renvoie également l'indice de la rotation d'origine dans cette séquence. Cet indice est important pour inverser la transformation.

 - <span style="color: #8A84E2"> **Output (Sortie)** </span>: La séquence transformée par Burrows-Wheeler ainsi que d'autres informations nécessaires pour la décompression, telles que l'indice d'origine.

### Exemple de requête : 

```py
from burrows_wheeler import transform_bwt, inverse_bwt

# Exemple 1
data = "pomme"
transformed_data, key = transform_bwt(data)
original_data = inverse_bwt(transformed_data, key)
print("Exemple 1:")
print("Données d'origine:", data)
print("Transformée de Burrows-Wheeler:", transformed_data)
print("Données inversées:", original_data)
print()

# Exemple 2
data = "abracadabra"
transformed_data, key = transform_bwt(data)
original_data = inverse_bwt(transformed_data, key)
print("Exemple 2:")
print("Données d'origine:", data)
print("Transformée de Burrows-Wheeler:", transformed_data)
print("Données inversées:", original_data)
print()
```

### Exemple d'Output : 
```
Exemple 1:
Données d'origine: pomme
Transformée de Burrows-Wheeler: mmope
Données inversées: pomme

Exemple 2:
Données d'origine: abracadabra
Transformée de Burrows-Wheeler: rdarcaaaabb
Données inversées: abracadabra
```

### Description : 

*Le <span style="color: #97CC04">**Burrows-Wheeler Transform**</span> réarrange les caractères d'une chaîne de manière à regrouper les caractères similaires, ce qui peut rendre la compression plus efficace, en particulier lorsqu'il est combiné avec d'autres méthodes de compression comme le codage de <span style="color: #97CC04">**Huffman**</span>. La transformation peut être inversée en utilisant l'indice de la rotation d'origine pour retrouver la chaîne d'origine*