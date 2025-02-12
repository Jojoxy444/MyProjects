import * as fs from 'fs';

export interface Quest {
    id : number;
    name : string;
    description : string;
    quest_type : string ;
    completion_state : number;
    quest_giver : string;
    start_date : string;
    end_date : string;
    reward : string;
  }
  
export function list (path : string)
{
  const jsonString = fs.readFileSync(path, 'utf-8');
  const quest: Quest[] = JSON.parse(jsonString);

  console.log(`=== Ongoing ===`);
  for (let x = 0; x < quest.length; x++)
  {
    if (quest[x].completion_state == 0)
    {
      console.log(`#${quest[x].id} ${quest[x].name}`);
    }
  }
  console.log(`=== Complete ===`)
  for (let y = 0; y < quest.length; y++)
  {
    if (quest[y].completion_state == 1)
    {
      console.log(`#${quest[y].id} ${quest[y].name}`);
    }
  }   
  console.log(`=== Failed ===`)
  for (let z = 0; z < quest.length; z++) 
  {
    if (quest[z].completion_state == 2)
    {
      console.log(`#${quest[z].id} ${quest[z].name}`);
    }
  }   
}

// 0 ongoing, 1 complete, 2 failed

export function main ()
{
  if ((process.argv[2]) === '--list')
  {
    list(process.argv[3])
  }
  else 
  {
    console.error('Wrong use of the program.')
  }
}

main()