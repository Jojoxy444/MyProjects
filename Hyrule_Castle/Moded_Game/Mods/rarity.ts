import * as fs from 'fs';
import { Personnage } from '../kda';

const jsonString = fs.readFileSync(`./Ressources/players.json`, 'utf-8');
const personnage: Personnage[] = JSON.parse(jsonString);

const jsonString2 = fs.readFileSync(`./Ressources/enemies.json`, 'utf-8');
const personnage2: Personnage[] = JSON.parse(jsonString2);

const jsonString3 = fs.readFileSync(`./Ressources/bosses.json`, 'utf-8');
const personnage3: Personnage[] = JSON.parse(jsonString3);

function draw_rarity()
{
  const rarity : number = Math.floor(Math.random() * 100) + 1;

  if (rarity <= 50) 
  {
    return 1;
  } 
  else if (rarity <= 80) 
  {
    return 2;
  } 
  else if (rarity <= 95) 
  {  
    return 3;
  } 
  else if (rarity <= 99) 
  {
    return 4;
  } 
  else 
  {
    return 5;
  }
}

export function filter_player(): Personnage
{ 
  const rarity = draw_rarity();

  //JSON.parse(JSON.stringify()) permet de faire une copie du joueur
  const player = JSON.parse(JSON.stringify(personnage.filter(personnage => personnage.rarity === rarity)[0]));
  player.max_hp = player.hp;
  player.xp = 0;
  player.level = 0;
  return player;
}
  
export function filter_mob(): Personnage
{ 
  const rarity = draw_rarity();
  
  const enemies_filter = personnage2.filter(personnage => personnage.rarity === rarity);

  const nb_random = Math.floor(Math.random() * enemies_filter.length);

  const ennemy = JSON.parse(JSON.stringify(enemies_filter[nb_random]));
  ennemy.max_hp = ennemy.hp;
  return ennemy;
}

export function filter_boss(): Personnage
{
  const rarity = draw_rarity();

  const boss_filter = personnage3.filter(personnage => personnage.rarity === rarity);

  const nb_random2 = Math.floor(Math.random() * boss_filter.length)
  
  const boss = JSON.parse(JSON.stringify(boss_filter[nb_random2]));
  boss.max_hp = boss.hp;
  return boss;
}