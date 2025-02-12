"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.display = exports.heal = exports.attack = void 0;
function attack(attacker, target) {
    target.hp = Math.max(target.hp - attacker.str, 0);
    // si les pv descendent en dessous de 0 tu garde 0 et si au dessus tu garde le dessus
}
exports.attack = attack;
function heal(target) {
    target.hp = Math.min(target.max_hp, target.hp + target.max_hp / 2);
}
exports.heal = heal;
function display(player, ennemy) {
    console.log("\u001B[31m".concat(ennemy.name, "\u001B[0m"));
    console.log("HP:", "\u2764\uFE0F".repeat(ennemy.hp) + "\uD83D\uDDA4".repeat(ennemy.max_hp - ennemy.hp), "".concat(ennemy.hp, " / ").concat(ennemy.max_hp));
    console.log("");
    console.log("\u001B[32m".concat(player.name, "\u001B[0m"));
    console.log("HP:", "\u2764\uFE0F".repeat(player.hp) + "\uD83D\uDDA4".repeat(player.max_hp - player.hp), "".concat(player.hp, " / ").concat(player.max_hp));
    console.log("");
}
exports.display = display;
