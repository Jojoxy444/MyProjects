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
  
export function add (path : string)
{
  const jsonString = fs.readFileSync(path, 'utf-8');
  const quest: Quest[] = JSON.parse(jsonString);

  for (let i = 0; i < quest.length; i++)
  {  
    if ((process.argv[i]) === '-name')
    {
      const name = {name: process.argv[i+1]}
    }
    if ((process.argv[i]) === '-type')
    {
      const type = {quest_type: process.argv[i+1]}
    }
    if ((process.argv[i]) === '-desc')
    {
      const desc = {description: process.argv[i+1]}
    }
    if ((process.argv[i]) === '-completion')
    {
      const completion = {completion_state: process.argv[i+1]}
    }
    if ((process.argv[i]) === '-giver')
    {
      const giver = {quest_giver: process.argv[i+1]}
    }
    if ((process.argv[i]) === '-start_date')
    {
      const start_date = {start_date: process.argv[i+1]}
    }
    if ((process.argv[i]) === '-end_date')
    {
      const end_date = {end_date: process.argv[i+1]}
    }
    if ((process.argv[i]) === '-reward')
    {
      const reward = {reward: process.argv[i+1]}
    }
  }


}

export function main ()
{
  if ((process.argv[2]) === '--add')
  {
    add(process.argv[process.argv.length - 1])
  }
  else 
  {
    console.error('Wrong use of the program.')
  }
}

main()