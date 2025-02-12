export default function winRPS(enemyMoves: any[])
{
  let affichage: string[] = [` `]
  for (let i = 0; i <= enemyMoves.length; i++)
  {
    let play: string = (enemyMoves[i].move);
    let numéro: number = (enemyMoves[i].count);
    while (numéro > 0)  
    {
      if (play === `paper`)
      {
        let affichage_total = affichage.push(`scissors, `);
      }
      if (play === `scissors`)
      {
        let affichage_total = affichage.push(`rock, `);
      }
      if (play === `rock`)
      {
        let affichage_total = affichage.push(`paper, `);
      }
    }
  }
  return(winRPS);
}

const enemyMoves: any[] = [{
    move: 'paper',
    count: 2,
  },
  {
    move: 'scissors',
    count: 1,
  },
  {
    move: 'paper',
    count: 1,
  },
  {
    move: 'rock',
    count: 2,
  }];
  
  console.log(winRPS(enemyMoves));


