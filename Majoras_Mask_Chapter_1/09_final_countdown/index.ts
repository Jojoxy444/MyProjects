let seconde: any = (process.argv[2]);
const phrase: any = (process.argv[3]);
const majuscule: any = phrase.toUpperCase();

while (seconde > 10)
{
  let minute: any = (Math.floor(seconde / 60))
  if (seconde >= 60)
  {
    console.log(minute + `'` + (seconde % 60));
    seconde--;
  }
  else
  {
    console.log(seconde);
    seconde--; 
  }
}

while ((seconde <= 10) && (seconde > 0))
{
  console.log(seconde + `...`);
  seconde--;
}

console.log(majuscule + `!`);
