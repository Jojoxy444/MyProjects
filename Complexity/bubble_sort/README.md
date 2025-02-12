Le code est composé de deux boucles imbriquées :

- Une boucle extérieure (i) parcourant le tableau de gauche à droite en effectuant n itérations, où n est la taille du tableau. Elle a donc une compléxité égale à O(n)
- Une boucle intérieure (j) parcourant le tableau cette fois-ci de droite à gauche, en effectuant dans le pire des cas n itérations, où n est la taille du tableau. Elle a donc une compléxité, elle aussi, égale à O(n)

Les deux boucles étant imbriquées, la compléxité globale du code est donc égale à O(n)*0(n), soit O(n²)
Le code a donc une compléxité algorithmique quadratique.
