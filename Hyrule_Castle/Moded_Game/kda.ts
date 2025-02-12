import * as fs from 'fs';
import * as readlineSync from 'readline-sync';

export interface Personnage {
    id : number;
    name : string;
    hp : number;
    max_hp : number;
    mp : number ;
    str : number;
    int : number;
    def : number;
    res : number;
    spd : number;
    luck : number;
    race : number;
    class : number;
    rarity : number;
    xp: number;
    level: number;
  }  

export function attack(attacker: Personnage, target: Personnage)
{ 
    target.hp = Math.max(target.hp - attacker.str, 0);
    // si les pv descendent en dessous de 0 tu garde 0 et si au dessus tu garde le dessus
}

export function heal(target: Personnage)
{
  target.hp = Math.min(target.max_hp, target.hp + target.max_hp/2);
}

export function display(player: Personnage, ennemy: Personnage)
{
  console.log(`\x1b[31m${ennemy.name}\x1b[0m`);
  console.log(`HP:`, `❤️`.repeat(ennemy.hp)+`🖤`.repeat(ennemy.max_hp - ennemy.hp), `${ennemy.hp} / ${ennemy.max_hp}`);
    
  console.log(``);
  
  console.log(`\x1b[32m${player.name}\x1b[0m`);
  console.log(`HP:`, `❤️`.repeat(player.hp)+`🖤`.repeat(player.max_hp - player.hp), `${player.hp} / ${player.max_hp}`);
    
  console.log(``);
}
