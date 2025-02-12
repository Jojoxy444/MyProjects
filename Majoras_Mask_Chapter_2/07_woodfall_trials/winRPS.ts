export default function winRPS(enemyMoves: string[])
{
  const win =
  {
    rock: 'paper',
    paper: 'scissors',
    scissors: 'rock'
  }
  return enemyMoves.map(move => win[move]);
}
