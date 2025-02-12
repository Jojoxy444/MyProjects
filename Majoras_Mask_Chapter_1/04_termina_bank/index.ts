let argent: any = (process.argv[2]);
let day :any = (process.argv[3]);
let interet :any = 0.04;
let argent_finale :any = argent

for (let i = 0; i < day; i++)
{
  argent_finale *= (1 + interet)
}

let benefice: any = (argent_finale - argent).toFixed(2);

if (day > 1)
{
  console.log(`You will earn ${benefice} rupees after ${day} days.`);
}
else
{
  console.log(`You will earn ${benefice} rupees after ${day} day.`);
}
