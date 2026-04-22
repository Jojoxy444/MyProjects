"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attack = attack;
exports.heal = heal;
exports.display = display;
function attack(attacker, target) {
    target.hp = Math.max(target.hp - attacker.str, 0);
    // si les pv descendent en dessous de 0 tu garde 0 et si au dessus tu garde le dessus
}
function heal(target) {
    target.hp = Math.min(target.max_hp, target.hp + target.max_hp / 2);
}
function display(player, ennemy) {
    console.log(`\x1b[31m${ennemy.name}\x1b[0m`);
    console.log(`HP:`, `❤️`.repeat(ennemy.hp) + `🖤`.repeat(ennemy.max_hp - ennemy.hp), `${ennemy.hp} / ${ennemy.max_hp}`);
    console.log(``);
    console.log(`\x1b[32m${player.name}\x1b[0m`);
    console.log(`HP:`, `❤️`.repeat(player.hp) + `🖤`.repeat(player.max_hp - player.hp), `${player.hp} / ${player.max_hp}`);
    console.log(``);
}
//# sourceMappingURL=kda.js.map