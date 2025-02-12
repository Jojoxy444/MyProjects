# Quelques petites choses à savoir

## Quelques commandes bash utiles

### Commandes bash générales
- ```cd [chemin]``` Permet de se déplacer dans les dossiers.
- ```ls``` Permet de lister les fichiers et/ou dossiers contenus dans le dossier actuel.
- ```mkdir [dossier]``` Permet de créer un dossier.
- ```mv [fichier] [chemin]``` Permet de déplacer un fichier ou un dossier vers un autre dossier.
- ```mv [fichier] [nouveau nom]``` Permet de renommer un fichier ou dossier.
- ```cp [fichier] [dossier]``` Permet de copier un fichier puis de le coller dans un autre dossier.
- ```cat [fichier]``` Permet d'afficher le contenu d'un fichier.
- ```touch [fichier]``` Permet de créer un fichier.
- ```rm [fichier]``` Permet de supprimer un fichier.
- ```rm -r [dossier]``` Permet de supprimer un dossier.
- ```man [commande]``` Affiche la documentation d'une commande.
- ```emacs [fichier]``` Permet d'ouvrir un fichier dans l'éditeur de texte emacs.*

\*Je vous invite à utiliser la commande ```man``` pour obtenir la documentation liée à une commande.

### Commandes bash liées à git
- ```git add [fichier]``` Permet d'ajouter un dossier à un commit git.
- ```git rm [fichier]``` Permet de supprimer un dossier d'un commit git.
- ```git commit -m '[commentaire]'``` Permet de nommer un commit git.
- ```git push``` Permet d'envoyer votre commit vers le repository en ligne.

Pour plus de simplicité j'ai ordonné les commandes git dans leur ordre d'exécution habituel.

### Commandes bash liées à Node
- ```npm install [package]``` Permet d'installer un package JavaScript.
- ```npm uninstall [package]``` Permet de désinstaller un package JavaScript.
- ```npx tsc [fichier.ts]``` Permet de compiler un fichier TypeScript.*
- ```node [fichier.js]``` Permet d'exécuter un fichier JavaScript.

\*Je vous rappelle qu'un fichier TypeScript ne peut pas être exécuté. TypeScript est une surcouche JavaScript, cela veut donc dire qu'il faut compiler votre fichier ```.ts``` pour générer un fichier ```.js``` qui lui sera exécutable.

## Quelques outils JavaScript/TypeScript utiles

### Les conditions

```js
if (/* Votre condition*/) {
    /* Il s'agit de votre condition principale*/
    ...
} else if (/* Votre condition alternative */) {
    /* Cette condtition pourra être éxécutée si la ou les conditions précédentes n'ont pas été validées.*/
    ...
} else {
    /* Cette condition s'exécute si aucune des conditions précédentes n'a été validée */
    ...
}
```

### Exemples de conditions

Si égal à
```js
if (nombre == autre_nombre) {...}
```
Si différent de
```js
if (nombre != autre_nombre) {...}
```
Si supérieur à
```js
if (nombre > autre_nombre) {...}
```
Si inférieur à
```js
if (nombre < autre_nombre)
```
Si supérieur ou égal à
```js
if (nombre >= autre_nombre)
```
Si inférieur ou égal à
```js
if (nombre <= autre_nombre) {...}
```
Si égal à (pour les chaînes de caractères)
```js
if (string === autre_string) {...}
```
Si différent de (pour les chaînes de caractères)
```js 
if (string !== autre_string) {...}
```

### Les boucles

```js
for (let i = 0; i < x; i = i + 1) {
    /* Le code contenu dans la boucle sera exécuté x - 1 fois */
    ...
}
```

### Les whiles

```js
while(/* Votre condition */) {
    /* Cela fonctionne comme une boucle à la différence que la boucle ne s'arrête que lorsqu'une condition précise sera respectée */
    /* "Tant que ... faire ceci..." */
    /* À noter que cela fonctionne également dans l'autre sens, "tant que ... n'est pas validé faire ceci..." */
    ...
}
```

### Les tableaux/listes

Un tableau ou liste est un variable contenant une suite d'autres variables. Les variables contenues dans la liste s'identifie par un index: un nombre indiquant leur position dans la liste.

```js
// Création et remplissage de la liste
const array : string[] = ['Je', 'Pète', 'Ma', 'Bière'];

// Affichage de la variable contenue à l'index 2, soit la troisième position dans le tableau
console.log(array[2]);
// Sortie: Ma
```

Ajout de variable à la fin de la liste
```js
const array : string[] = ['Ma', 'Lubululle'];

// Ajout d'une nouvelle variable à la fin de la liste
array.push('!');

console.log(array);
// Sortie: [ 'Ma', 'Lubululle', '!' ]
```

Modification d'une variable dans la liste
```js
const array : number[] = [1, 2, 3, 4, 5];

array[4] = 6;

// Affichage de la liste
console.log(array);
// Sortie: [ 1, 2, 3, 4, 6 ] 
```

Suppression de la dernière variable de la liste
```js
const array : string[] = ['Salut', 'Michel'];

// Suppression de la dernière variable
array.pop();

console.log(array);
// Sortie: [ 'Salut' ]
```

Suppression d'une variable à un index donné
```js
const array : string[] = ['Je', 'sais', 'pas', 'quoi', 'dire'];

// Suppression de la variable à l'index 2
array.splice(2);

console.log(array);
// Sortie: [ 'Je', 'sais', 'quoi', 'dire' ]
```

Parcourir une liste
```js
const array : number[] = [5, 4, 3, 2, 1, 0];

/
for (let i = 0; i < array.length; i = i + 1) {
    /* Manipulez les variables contenues dans votre liste via array[i] */
    console.log(array[i]);
    ...
}

// Sortie: 5
// 4
// 3
// 2
// 1
// 0
```

<u>Exemple d'algorithme parcourant une liste</u>
```js
const array : string[] = ['Les', 'joueurs', 'de', 'lol', 'ne', 'se', 'douchent', 'pas'];

// Algorithme affichant une phrase grâce aux mots contenus dans la liste
let texte : string = '';
for (let i = 0; i < array.length; i = i + 1) {
    // Détecte quand la l'index se trouve sur la dernière variable de la liste
    if(i == aray.length - 1) {
        texte = texte + array[i] + '.';
    } else {
        texte = texte + array[i] + ' ';
    }
}

console.log(texte);
// Sortie: Les joueurs de lol ne se douchent pas.
```