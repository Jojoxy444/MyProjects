import axios from 'axios';

export default function getSecretIngredients(path: string) {
    axios.get(path)
        .then((response: { data: any; }) => {
            const ingredients = response.data

            ingredients.forEach((ingredient: any) => {
                console.log(`- ${ingredient.name}`);
            });
        })
}

//getSecretIngredients('https://pastebin.com/raw/tHgDw2YB')