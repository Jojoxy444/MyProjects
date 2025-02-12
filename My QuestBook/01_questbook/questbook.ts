import * as fs from 'fs';

interface Quest {
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

function displaylist () {
  console.log('Using list.');
}

function displayinfo () {
    console.log('Using info.');
}

function displayadd () {
  console.log('Using add.');
}

function displayerror () {
  console.error('Wrong use of the program.');
}

function list(path : string)
{  
  const jsonString = fs.readFileSync(path, 'utf-8');
  const quest: Quest[] = JSON.parse(jsonString); 
  displaylist();
}

function info (path : string)
{
  const jsonString = fs.readFileSync(path, 'utf-8');
  const quest: Quest[] = JSON.parse(jsonString);   
  displayinfo();
  process.exit();
}
  
function add (path : string)
{
  const jsonString = fs.readFileSync(path, 'utf-8');
  const quest: Quest[] = JSON.parse(jsonString); 
  displayadd();
  process.exit();
}  

function iflist ()
{
  if ((String(process.argv[2]) === '--list') && ((process.argv[process.argv.length - 1].includes('json')) == true))
  {
    list(String(process.argv[3]));
  }
  else if ((String(process.argv[2]) !== '--list') || ((process.argv[process.argv.length - 1].includes('json')) == false))
  {
    displayerror();
  }
}

function ifinfo (path : string)
{
  const jsonString = fs.readFileSync(path, 'utf-8');
  const quest: Quest[] = JSON.parse(jsonString);
  
  for (let i = 0; i < quest.length; i++)
  {
    if (((process.argv[2]) === '--info') && (Number(process.argv[3]) == quest[i].id) && ((process.argv[process.argv.length - 1].includes('json')) == true))
    {
      info(String(process.argv[process.argv.length - 1]));
    }
    if ((String(process.argv[2]) !== '--info') || ((process.argv[process.argv.length - 1].includes('json')) == false))
    {
      continue
    }
  }
  displayerror()
}

function ifadd (path : string)
{
  const jsonString = fs.readFileSync(path, 'utf-8');
  const quest: Quest[] = JSON.parse(jsonString);
  
  for (let x = 0; x < quest.length; x++)
  {
    if (((process.argv[2]) === '--add') 
    && ((process.argv[3]) === '-name') 
    && ((process.argv[5]) === '-type') 
    && ((process.argv[7]) === '-desc') 
    && ((process.argv[9]) === '-completion') 
    && ((process.argv[11]) === '-giver') 
    && ((process.argv[13]) === '-start_date')
    && ((process.argv[15]) === '-end_date')
    && ((process.argv[17]) === '-reward') 
    && ((process.argv[process.argv.length - 1].includes('.json')) == true))
    {
      add(String(process.argv[process.argv.length - 1]));
    }
    if (((process.argv[2]) !== '--add') 
    || ((process.argv[3]) !== '-name') 
    || ((process.argv[5]) !== '-type') 
    || ((process.argv[7]) !== '-desc') 
    || ((process.argv[9]) !== '-completion') 
    || ((process.argv[11]) !== '-giver') 
    || ((process.argv[13]) !== '-start_date')
    || ((process.argv[15]) !== '-end_date')
    || ((process.argv[17]) !== '-reward') 
    || ((process.argv[process.argv.length - 1].includes('.json')) == false))
    {
      continue
    }
  }
  displayerror();
}

function main ()
{
  if ((process.argv[2]) === '--list')
  {
    iflist();
  }
  
  if ((process.argv[2]) === '--info')
  {
    ifinfo(process.argv[process.argv.length - 1]);
  }
  
  if ((process.argv[2]) === '--add')
  {
    ifadd(process.argv[process.argv.length - 1]);
  }
  if (((process.argv[2]) !== '--list') && ((process.argv[2]) !== '--info') && ((process.argv[2]) !== '--add'))
  {
    displayerror();
  }
}

main();
