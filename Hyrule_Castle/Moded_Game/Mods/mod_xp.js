"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var basic_game_customization_1 = require("./basic_game_customization");
function entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// La variable contient un nombre aléatoire compris entre 15 et 50
function Experience(player) {
    var rankup = 30;
    var xp = entierAleatoire(15, 50);
    player.xp += xp;
    console.log("You earned ".concat(xp, " experiences !"));
    while (player.xp >= rankup) {
        player.xp -= rankup;
        player.level++;
        if (basic_game_customization_1.difficulty == 1) {
            player.str = player.str + 0.25;
            player.max_hp = player.max_hp + 0.25;
        }
        else if (basic_game_customization_1.difficulty == 1.5) {
            player.str = player.str + 0.5;
            player.max_hp = player.max_hp + 0.5;
        }
        else {
            player.str++;
            player.max_hp++;
        }
        console.log('\x1b[33;3m%s\x1b[0m', "You passed level ".concat(player.level, " !"));
    }
}
exports.default = Experience;
