"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter_player = filter_player;
exports.filter_mob = filter_mob;
exports.filter_boss = filter_boss;
const fs = __importStar(require("fs"));
const jsonString = fs.readFileSync(`./Ressources/players.json`, 'utf-8');
const personnage = JSON.parse(jsonString);
const jsonString2 = fs.readFileSync(`./Ressources/enemies.json`, 'utf-8');
const personnage2 = JSON.parse(jsonString2);
const jsonString3 = fs.readFileSync(`./Ressources/bosses.json`, 'utf-8');
const personnage3 = JSON.parse(jsonString3);
function draw_rarity() {
    const rarity = Math.floor(Math.random() * 100) + 1;
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
    const rarity = draw_rarity();
    //JSON.parse(JSON.stringify()) permet de faire une copie du joueur
    const player = JSON.parse(JSON.stringify(personnage.filter(personnage => personnage.rarity === rarity)[0]));
    player.max_hp = player.hp;
    return player;
}
function filter_mob() {
    const rarity = draw_rarity();
    const enemies_filter = personnage2.filter(personnage => personnage.rarity === rarity);
    const nb_random = Math.floor(Math.random() * enemies_filter.length);
    const ennemy = JSON.parse(JSON.stringify(enemies_filter[nb_random]));
    ennemy.max_hp = ennemy.hp;
    return ennemy;
}
function filter_boss() {
    const rarity = draw_rarity();
    const boss_filter = personnage3.filter(personnage => personnage.rarity === rarity);
    const nb_random2 = Math.floor(Math.random() * boss_filter.length);
    const boss = JSON.parse(JSON.stringify(boss_filter[nb_random2]));
    boss.max_hp = boss.hp;
    return boss;
}
//# sourceMappingURL=rarity.js.map