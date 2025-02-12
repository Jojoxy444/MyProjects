Le code est composé de deux boucles imbriquées :

- Une boucle extérieure (i) parcourant toutes les lignes de la matrice.
  Le nombre total d'itérations pour cette boucle est égal au nombre de lignes dans la matrice. La compléxité de cette boucle est donc égale à O(n), où n est le nombre de lignes dans la matrice.

- Une boucle intérieure (j) parcourant, cette fois-ci, toutes les colonnes dans chaque ligne de la matrice.
  Le nombre total d'itérations pour cette boucle est égal au nombre maximum de colonnes dans une ligne de la matrice, et cela peut varier d'une ligne à l'autre.
  On peut donc considérer que le nombre maximum de colonnes est la taille maximale d'une ligne dans la matrice
  Ainsi, la compléxité de cette boucle est aussi égale à O(n) où n est le nombre de lignes dans la matrice.

Les deux boucles étant imbriquées, la complexité totale de l'algorithme est le produit des complexités de chaque boucle, soit O(n)*O(n) = O(n^2).
Le code a donc une compléxité algorithmique quadratique.
