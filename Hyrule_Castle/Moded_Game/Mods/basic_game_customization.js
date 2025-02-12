"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startMenu = exports.applyDifficulty = exports.fights = exports.difficulty = void 0;
var readlineSync = require("readline-sync");
var level_1 = require("../level");
var sound = require("sound-play");
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
exports.applyDifficulty = applyDifficulty;
function startMenu() {
    console.clear();
    sound.play("./Ressources/theme.mp3");
    console.log(" _   _                  _        _____           _   _      \r\n| | | |                | |      /  __ \\         | | | |     \r\n| |_| |_   _ _ __ _   _| | ___  | /  \\/ __ _ ___| |_| | ___ \r\n|  _  | | | | '__| | | | |/ _ \\ | |    / _` / __| __| |/ _ \\\r\n| | | | |_| | |  | |_| | |  __/ | \\__/\\ (_| \\__ \\ |_| |  __/\r\n\\_| |_/\\__, |_|   \\__,_|_|\\___|  \\____/\\__,_|___/\\__|_|\\___|\r\n        __/ |                                               \r\n       |___/                                                ");
    console.log("");
    readlineSync.question("========== Press Enter to Continue ==========");
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
    readlineSync.question("========== Press Enter to Continue ==========");
    console.clear();
    var userInput = "";
    while (userInput !== "1" && userInput !== "2") {
        //Pour dire que si c'est différent alors tu réitère le choix sans continuer le round
        userInput = readlineSync.question("1. New Game        2. Quit ");
        console.log("");
        if (userInput !== "1" && userInput !== "2") {
            console.log("\u001B[1mPlease press 1 or 2 to make a choice !\u001B[22m");
            console.log("");
            // la boucle recommence ici
        }
    }
    if (userInput === "1") {
        chooseDifficulty();
        chooseFights();
        (0, level_1.floor)(exports.difficulty, exports.fights);
    }
    else if (userInput === "2") {
        process.exit();
    }
    console.clear();
}
exports.startMenu = startMenu;
function chooseDifficulty() {
    var userInput = "";
    while (userInput !== "1" && userInput !== "2" && userInput !== "3") {
        //Pour dire que si c'est différent alors tu réitère le choix
        console.log("Set your game difficulty");
        console.log("");
        userInput = readlineSync.question("1. Normal        2. Difficult        3. Insane ");
        console.log("");
        if (userInput !== "1" && userInput !== "2" && userInput !== "3") {
            console.log("\u001B[1mPlease press 1, 2 or 3 to choose a difficulty !\u001B[22m");
            console.log("");
            // la boucle recommence ici
        }
    }
    if (userInput === "1") {
        exports.difficulty = 1;
    }
    else if (userInput === "2") {
        exports.difficulty = 1.5;
    }
    else if (userInput === "3") {
        exports.difficulty = 2;
    }
}
function chooseFights() {
    var userInput = "";
    while (userInput !== "1" && userInput !== "2" && userInput !== "3" && userInput !== "4") {
        //Pour dire que si c'est différent alors tu réitère le choix sans continuer le round
        console.log("Set the number of stages");
        userInput = readlineSync.question("1. 10        2. 20        3. 50        4. 100 ");
        console.log("");
        if (userInput !== "1" && userInput !== "2" && userInput !== "3" && userInput !== "4") {
            console.log("\u001B[1mPlease press 1, 2, 3 or 4 to set the number of stages !\u001B[22m");
            console.log("");
            // la boucle recommence ici
        }
    }
    if (userInput === "1") {
        exports.fights = 10;
    }
    else if (userInput === "2") {
        exports.fights = 20;
    }
    else if (userInput === "3") {
        exports.fights = 50;
    }
    else if (userInput === "4") {
        exports.fights = 100;
    }
    console.clear();
}
