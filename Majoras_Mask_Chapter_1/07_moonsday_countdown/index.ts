const second: any = (process.argv[2]);
const heure: any = (second/3600);
let heure_arrondi: any = (Math.ceil(heure));

while (heure_arrondi > 0)
{
  heure_arrondi--
  console.log(heure_arrondi);
}