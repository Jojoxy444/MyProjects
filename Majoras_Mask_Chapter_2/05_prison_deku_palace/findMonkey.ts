interface cells {
  number: number,
  is_guarded: boolean,
  prisoners: prisoner[]
}

interface prisoner {
  species: string,
  days_left: number,
  crime: string
}

export default function findMonkey(prison: any)
{
  let trouve = false;
  
  prison.forEach((cell: any) =>
  {
    cell.prisoners.forEach((prisoner: any) =>
    {
     if (prisoner.species === `Monkey`)
     {
      if (cell.is_guarded)
      {
        console.log(`The monkey is in the cell number ${cell.number}. The cell is guarded.`);
      }
      else
      {
        console.log(`The monkey is in the cell number ${cell.number}. The cell is not guarded.`);
      }
      trouve = true; 
     }
    });  
  });

  if (trouve == false)
  {
    console.log(`The monkey isn't here.`);
  }
}