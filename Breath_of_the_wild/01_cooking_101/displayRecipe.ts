import * as fs from 'fs';
import Recipe from './Recipe';

export default function displayRecipe(path: string): any {

       const jsonString = fs.readFileSync(path, 'utf-8');
       const recipe: Recipe = JSON.parse(jsonString);

       console.log(`==== ${recipe.name} ====`);
       recipe.ingredients.forEach(ingredient => {
         console.log(`- ${ingredient}`);
       });
}
