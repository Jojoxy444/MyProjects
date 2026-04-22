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
exports.fights = exports.difficulty = void 0;
exports.applyDifficulty = applyDifficulty;
exports.startMenu = startMenu;
const readlineSync = __importStar(require("readline-sync"));
const level_1 = require("../level");
const sound = require(`sound-play`);
exports.difficulty = 1;
exports.fights = 0;
function applyDifficulty(perso) {
    perso.hp *= exports.difficulty;
    perso.max_hp *= exports.difficulty;
    perso.mp *= exports.difficulty;
    perso.str *= exports.difficulty;
    perso.int *= exports.difficulty;
    perso.def *= exports.difficulty;
    perso.res *= exports.difficulty;
    perso.spd *= exports.difficulty;
    perso.luck *= exports.difficulty;
}
function startMenu() {
    console.clear();
    sound.play(`./Ressources/theme.mp3`);
    console.log(" _   _                  _        _____           _   _      \r\n| | | |                | |      /  __ \\         | | | |     \r\n| |_| |_   _ _ __ _   _| | ___  | /  \\/ __ _ ___| |_| | ___ \r\n|  _  | | | | '__| | | | |/ _ \\ | |    / _` / __| __| |/ _ \\\r\n| | | | |_| | |  | |_| | |  __/ | \\__/\\ (_| \\__ \\ |_| |  __/\r\n\\_| |_/\\__, |_|   \\__,_|_|\\___|  \\____/\\__,_|___/\\__|_|\\___|\r\n        __/ |                                               \r\n       |___/                                                ");
    console.log(``);
    readlineSync.question(`========== Press Enter to Continue ==========`);
    console.clear();
    console.log("========== Lore ==========");
    console.log("");
    console.log("\x1b[1mDans le royaume d'Hyrule, la princesse Zelda a été enlevée par de puissants ennemis et retenue captive dans la sinistre tour de Ganon et ses confrères.\x1b[22m");
    console.log("\x1b[1mLink et ses amis prennent la décision de la sauver. Ils entreprennent un périple dangereux, affrontant des créatures maléfiques et des boss redoutables pour la retrouver.\x1b[22m");
    console.log("");
    console.log("\x1b[1mDésormais, le sort de la princesse Zelda est entre vos mains.\x1b[22m");
    console.log("");
    console.log("\x1b[1mParviendrez-vous à la sauver ?\x1b[22m");
    console.log("");
    readlineSync.question(`========== Press Enter to Continue ==========`);
    console.clear();
    let userInput = "";
    while (userInput !== "1" && userInput !== "2") {
        //Pour dire que si c'est différent alors tu réitère le choix sans continuer le round
        userInput = readlineSync.question(`1. New Game        2. Quit `);
        console.log(``);
        if (userInput !== "1" && userInput !== "2") {
            console.log(`\x1b[1mPlease press 1 or 2 to make a choice !\x1b[22m`);
            console.log(``);
            // la boucle recommence ici
        }
    }
    if (userInput === `1`) {
        chooseDifficulty();
        chooseFights();
        (0, level_1.floor)(exports.difficulty, exports.fights);
    }
    else if (userInput === `2`) {
        process.exit();
    }
    console.clear();
}
function chooseDifficulty() {
    let userInput = "";
    while (userInput !== "1" && userInput !== "2" && userInput !== "3") {
        //Pour dire que si c'est différent alors tu réitère le choix
        console.log(`Set your game difficulty`);
        console.log(``);
        userInput = readlineSync.question(`1. Normal        2. Difficult        3. Insane `);
        console.log(``);
        if (userInput !== "1" && userInput !== "2" && userInput !== "3") {
            console.log(`\x1b[1mPlease press 1, 2 or 3 to choose a difficulty !\x1b[22m`);
            console.log(``);
            // la boucle recommence ici
        }
    }
    if (userInput === `1`) {
        exports.difficulty = 1;
    }
    else if (userInput === `2`) {
        exports.difficulty = 1.5;
    }
    else if (userInput === `3`) {
        exports.difficulty = 2;
    }
}
function chooseFights() {
    let userInput = "";
    while (userInput !== "1" && userInput !== "2" && userInput !== "3" && userInput !== "4") {
        //Pour dire que si c'est différent alors tu réitère le choix sans continuer le round
        console.log(`Set the number of stages`);
        userInput = readlineSync.question(`1. 10        2. 20        3. 50        4. 100 `);
        console.log(``);
        if (userInput !== "1" && userInput !== "2" && userInput !== "3" && userInput !== "4") {
            console.log(`\x1b[1mPlease press 1, 2, 3 or 4 to set the number of stages !\x1b[22m`);
            console.log(``);
            // la boucle recommence ici
        }
    }
    if (userInput === `1`) {
        exports.fights = 10;
    }
    else if (userInput === `2`) {
        exports.fights = 20;
    }
    else if (userInput === `3`) {
        exports.fights = 50;
    }
    else if (userInput === `4`) {
        exports.fights = 100;
    }
    console.clear();
}
//# sourceMappingURL=basic_game_customization.js.map