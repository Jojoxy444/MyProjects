"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter_boss = exports.filter_mob = exports.filter_player = void 0;
var fs = require("fs");
var jsonString = fs.readFileSync("./Ressources/players.json", 'utf-8');
var personnage = JSON.parse(jsonString);
var jsonString2 = fs.readFileSync("./Ressources/enemies.json", 'utf-8');
var personnage2 = JSON.parse(jsonString2);
var jsonString3 = fs.readFileSync("./Ressources/bosses.json", 'utf-8');
var personnage3 = JSON.parse(jsonString3);
function draw_rarity() {
    var rarity = Math.floor(Math.random() * 100) + 1;
    if (rarity <= 50) {
        return 1;
    }
    else if (rarity <= 80) {
        return 2;
    }
    else if (rarity <= 95) {
        return 3;
    }
    else if (rarity <= 99) {
        return 4;
    }
    else {
        return 5;
    }
}
function filter_player() {
    var rarity = draw_rarity();
    //JSON.parse(JSON.stringify()) permet de faire une copie du joueur
    var player = JSON.parse(JSON.stringify(personnage.filter(function (personnage) { return personnage.rarity === rarity; })[0]));
    player.max_hp = player.hp;
    return player;
}
exports.filter_player = filter_player;
function filter_mob() {
    var rarity = draw_rarity();
    var enemies_filter = personnage2.filter(function (personnage) { return personnage.rarity === rarity; });
    var nb_random = Math.floor(Math.random() * enemies_filter.length);
    var ennemy = JSON.parse(JSON.stringify(enemies_filter[nb_random]));
    ennemy.max_hp = ennemy.hp;
    return ennemy;
}
exports.filter_mob = filter_mob;
function filter_boss() {
    var rarity = draw_rarity();
    var boss_filter = personnage3.filter(function (personnage) { return personnage.rarity === rarity; });
    var nb_random2 = Math.floor(Math.random() * boss_filter.length);
    var boss = JSON.parse(JSON.stringify(boss_filter[nb_random2]));
    boss.max_hp = boss.hp;
    return boss;
}
exports.filter_boss = filter_boss;
