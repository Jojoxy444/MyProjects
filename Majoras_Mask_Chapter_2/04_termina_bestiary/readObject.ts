export interface Monster
{
  name : string,
  hp: number,
  description: string
}

export function readObject(monster: Monster)
{
  console.log(`${monster.name} (${monster.hp}hp): ${monster.description}`);
}
