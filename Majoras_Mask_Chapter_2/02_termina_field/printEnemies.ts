export default function printEnemies(names: string[])
{
  const ennemy: string[] = ['evil', 'bad', 'mean', 'rotten', 'cruel'];

  names.forEach(nom =>
  {
    const bon = nom.toLowerCase().split(' ');
    const mauvais = bon.some(bon => ennemy.includes(bon));
    if (mauvais)
    {
      console.log(bon.join('_'));
    }
  });
}
