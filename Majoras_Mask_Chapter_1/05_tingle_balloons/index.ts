let phrase: string = (process.argv[2]);

const prenom: string = phrase.substring(0, phrase.indexOf(' ')); 
const nom: string = phrase.substring(phrase.lastIndexOf(' ') + 1)

const initiale_prenom: string = prenom.charAt(0)
const initiale_nom: string = nom.charAt(0)

const majuscule_initiale_prenom: string = initiale_prenom.toUpperCase()
const majuscule_initiale_nom: string = initiale_nom.toUpperCase()

console.log(`${majuscule_initiale_prenom}.${majuscule_initiale_nom}`);