import axios from 'axios';
const fs = require('fs');

export default async function getGrandmaRecipes(recipeBookPath: string, grandmaIngredientsPath: string) 
{
  const contentFile = fs.readFileSync(recipeBookPath, 'utf-8');
  const book = JSON.parse(contentFile);

  const response= await axios.get(grandmaIngredientsPath);
  const grandma = [];
  
  const result = [];

  response.data.forEach(element => 
    {
      grandma.push(element);
    });

    for (let x = 0; x < book.length; x++) 
    {
      let attemp : boolean = false;
      for (let y = 0; y < book[x].ingredients.length; y++) 
      {
        for (let z = 0; z < grandma.length; z++) 
        {
          if (book[x].ingredients[y] === grandma[z].name) 
          {
            attemp = true;
          }
        }
      }
      if(attemp) 
      {
        result.push(book[x]);
      } 
    }
    console.log(result);
}
