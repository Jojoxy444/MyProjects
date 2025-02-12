const titre: any = (process.argv[2]);
const majuscule: any = titre.toUpperCase(); 

let count1 = 0;
let count2 = 0;
let count3 = 0;
let caractere1 = majuscule.indexOf("R");
let caractere2 = majuscule.indexOf("A");
let caractere3 = majuscule.indexOf("D");

while (caractere1 != -1)
{
  count1++;
  caractere1 = majuscule.indexOf("R", caractere1 + 1);
}

while (caractere2 != -1)
{
  count2++;
  caractere2= majuscule.indexOf("A", caractere2 + 1);
}

while (caractere3 != -1)
{
  count3++;
  caractere3 = majuscule.indexOf("D", caractere3 + 1);
}

if ((count1 == 2) && (count2 == 2) && (count3 == 2))
{
  console.log(`Playing the Song of Time...`);
}
else
{
  console.log(`That doesn't feel right.`);
}