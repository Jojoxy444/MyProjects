import Recipe from './Recipe'
import * as fs from 'fs';

export default function searchRecipe(name : string, path : string) {
    const contentFile = fs.readFileSync(path, 'utf-8');
    const json : Recipe[] = JSON.parse(contentFile);

    for (let i = 0; i < json.length; i++) 
    {
      if (json[i].name === name) 
      {
        displayRecipe(json[i]);
        return;
      }
    }
    console.log('No match.');
}

function displayRecipe(recipe : Recipe) 
  {
    console.log(`==== ${recipe.name} ====`);
    for (let i = 0; i < recipe.ingredients.length; i++) 
    {
      console.log(`- ${recipe.ingredients[i]}`);
    }
}

