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
  
export function info (path : string)
{
  const jsonString = fs.readFileSync(path, 'utf-8');
  const quest: Quest[] = JSON.parse(jsonString);

  for (let i = 0; i < quest.length; i++)
  {
    if (Number(process.argv[3]) == quest[i].id)
    {
      console.log('========================================')
      console.log(`#${quest[i].id} ${quest[i].name} (${quest[i].quest_type} quest)`)
      console.log('========================================')
      console.log(`Given by ${quest[i].quest_giver}`)
      if (quest[i].completion_state == 0)
      {
        console.log(`Currently ongoing.`);
      }
      if (quest[i].completion_state == 1)
      {
        console.log(`Completed since the ${quest[i].end_date}`)
      }
      if (quest[i].completion_state == 2)
      {
        console.log(`Failed the ${quest[i].end_date}`)
      }
      console.log('========================================')
      console.log(`Goal: ${quest[i].description}`)
      if (quest[i].reward == ``)
      {
        console.log(`Reward: ---`)
      }
      else 
      {
        console.log(`Reward: ${quest[i].reward}`)
      }
    }
  }
}

export function main ()
{
  if ((process.argv[2]) === '--info')
  {
    info(process.argv[process.argv.length - 1]);
  }
  else 
  {
    console.error('Wrong use of the program.');
  }
}

main()