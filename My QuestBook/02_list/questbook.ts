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

  for (let i = 0; i < quest.length; i++)
  {
    console.log(`#${quest[i].id} ${quest[i].name}`);
  }
}

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