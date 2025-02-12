"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
var rarity = require("./rarity");
var kda = require("./kda");
var sound = require("sound-play");
var player;
var mob;
var boss;
// Stocké les personnages en entier au lieu de juste leur hp
// définir les hp max et les initialisés
function level() {
    var level = 1;
    mob = rarity.filter_mob();
    while (true) {
        console.log("========== LEVEL ".concat(level, " =========="));
        kda.display(player, mob);
        var userInput = "";
        while (userInput !== "1" && userInput !== "2") {
            //Pour dire que si c'est différent alors tu réitère le choix sans continuer le round
            console.log("----------Options----------");
            userInput = readlineSync.question("1.Attack        2.Heal        ");
            console.log("");
            if (userInput !== "1" && userInput !== "2") {
                console.log("\u001B[1mPlease press 1 or 2 to make a choice !\u001B[22m");
                console.log("");
                // la boucle recommence ici
            }
        }
        if (userInput === "1") {
            kda.attack(player, mob);
            console.log("\u001B[3mYou attacked and dealt ".concat(player.str, " damages !\u001B[23m"));
            console.log("");
        }
        else if (userInput === "2") {
            kda.heal(player);
            console.log("\u001B[3mYou used heal !\u001B[23m");
            console.log("");
        }
        if (mob.hp <= 0) {
            console.log("\u001B[3m".concat(mob.name, " died !\u001B[23m"));
            readlineSync.question("========== Press Enter to Continue ==========");
            return false;
        }
        kda.attack(mob, player);
        console.log("\u001B[3m".concat(mob.name, " attacked and dealt ").concat(mob.str, " damages !\u001B[23m"));
        console.log("");
        if (player.hp <= 0) {
            return true;
        }
        level++;
    }
}
function level_boss() {
    var level = 1;
    while (true) {
        console.log("========== LEVEL ".concat(level, " =========="));
        kda.display(player, boss);
        var userInput = "";
        while (userInput !== "1" && userInput !== "2") {
            //Pour dire que si c'est différent alors tu réitère le choix sans continuer le round
            console.log("----------Options----------");
            userInput = readlineSync.question("1.Attack        2.Heal        ");
            console.log("");
            if (userInput !== "1" && userInput !== "2") {
                console.log("\u001B[1mPlease press 1 or 2 to make a choice !\u001B[22m");
                console.log("");
                // la boucle recommence ici
            }
        }
        if (userInput === "1") {
            kda.attack(player, boss);
            console.log("\u001B[3mYou attacked and dealt ".concat(player.str, " damages !\u001B[23m"));
            console.log("");
        }
        else if (userInput === "2") {
            kda.heal(player);
            console.log("\u001B[3mYou used heal !\u001B[23m");
            console.log("");
        }
        if (boss.hp <= 0) {
            console.log("\u001B[3m".concat(boss.name, " died !\u001B[23m"));
            readlineSync.question("========== Press Enter to Continue ==========");
            return false;
        }
        kda.attack(boss, player);
        console.log("\u001B[3m".concat(boss.name, " attacked and dealt ").concat(boss.str, " damages !\u001B[23m"));
        console.log("");
        if (player.hp <= 0) {
            return true;
        }
        level++;
    }
}
function floor() {
    var maxStages = 10;
    var stage = 1;
    player = rarity.filter_player();
    boss = rarity.filter_boss();
    console.clear();
    sound.play("./Ressources/theme.mp3");
    console.log(" _   _                  _        _____           _   _      \r\n| | | |                | |      \/  __ \\         | | | |     \r\n| |_| |_   _ _ __ _   _| | ___  | \/  \\\/ __ _ ___| |_| | ___ \r\n|  _  | | | | \'__| | | | |\/ _ \\ | |    \/ _` \/ __| __| |\/ _ \\\r\n| | | | |_| | |  | |_| | |  __\/ | \\__\/\\ (_| \\__ \\ |_| |  __\/\r\n\\_| |_\/\\__, |_|   \\__,_|_|\\___|  \\____\/\\__,_|___\/\\__|_|\\___|\r\n        __\/ |                                               \r\n       |___\/                                                ");
    console.log("");
    readlineSync.question("========== Press Enter to Continue ==========");
    console.clear();
    while (stage < maxStages) {
        console.log("========== FLOOR ".concat(stage, "==========="));
        if (level() === true) {
            // Si return renvoie true alors le joueur est mort = GAME OVER
            console.clear();
            console.log(" _____   ___  ___  ___ _____   _____  _   _ ___________   _ \r\n|  __ \\ \/ _ \\ |  \\\/  ||  ___| |  _  || | | |  ___| ___ \\ | |\r\n| |  \\\/\/ \/_\\ \\| .  . || |__   | | | || | | | |__ | |_\/ \/ | |\r\n| | __ |  _  || |\\\/| ||  __|  | | | || | | |  __||    \/  | |\r\n| |_\\ \\| | | || |  | || |___  \\ \\_\/ \/\\ \\_\/ \/ |___| |\\ \\  |_|\r\n \\____\/\\_| |_\/\\_|  |_\/\\____\/   \\___\/  \\___\/\\____\/\\_| \\_| (_)");
            console.log("");
            var sound_1 = require("sound-play");
            sound_1.play("./Ressources/lose.mp3");
            // Retry ou quitter le jeu      
            var userInput_minuscule = "";
            while ((userInput_minuscule !== "y") && (userInput_minuscule !== "n")) {
                var userInput = readlineSync.question("Do you want to retry (y/n) ");
                userInput_minuscule = userInput.toLowerCase();
                if (userInput_minuscule === "y") {
                    floor();
                }
                else if (userInput_minuscule === "n") {
                    process.exit();
                }
                else {
                    console.log("");
                    console.log("\u001B[1mPlease press y or n to make a choice !\u001B[22m");
                    console.log("");
                }
            }
        }
        // Si return renvoie false le joueur est vivant = next floor
        stage++;
        console.clear();
    }
    if (stage = maxStages) {
        console.log("========== FLOOR ".concat(stage, "=========="));
        if (level_boss() === true) {
            // Si return renvoie true alors le joueur est mort = GAME OVER
            console.clear();
            console.log(" _____   ___  ___  ___ _____   _____  _   _ ___________   _ \r\n|  __ \\ \/ _ \\ |  \\\/  ||  ___| |  _  || | | |  ___| ___ \\ | |\r\n| |  \\\/\/ \/_\\ \\| .  . || |__   | | | || | | | |__ | |_\/ \/ | |\r\n| | __ |  _  || |\\\/| ||  __|  | | | || | | |  __||    \/  | |\r\n| |_\\ \\| | | || |  | || |___  \\ \\_\/ \/\\ \\_\/ \/ |___| |\\ \\  |_|\r\n \\____\/\\_| |_\/\\_|  |_\/\\____\/   \\___\/  \\___\/\\____\/\\_| \\_| (_)");
            console.log("");
            var sound_2 = require("sound-play");
            sound_2.play("./Ressources/lose.mp3");
            // Retry ou quitter le jeu      
            var userInput_minuscule = "";
            while ((userInput_minuscule !== "y") && (userInput_minuscule !== "n")) {
                var userInput = readlineSync.question("Do you want to retry (y/n) ");
                // AVANT: const userInput_minuscule = userInput.toLowerCase(); 
                userInput_minuscule = userInput.toLowerCase();
                if (userInput_minuscule === "y") {
                    floor();
                }
                else if (userInput_minuscule === "n") {
                    process.exit();
                }
                else {
                    console.log("");
                    console.log("\u001B[1mPlease press y or n to make a choice !\u001B[22m");
                    console.log("");
                }
            }
        }
        console.clear();
        console.log(" _____                             _         _       _   _                   _ \r\n\/  __ \\                           | |       | |     | | (_)                 | |\r\n| \/  \\\/ ___  _ __   __ _ _ __ __ _| |_ _   _| | __ _| |_ _  ___  _ __  ___  | |\r\n| |    \/ _ \\| \'_ \\ \/ _` | \'__\/ _` | __| | | | |\/ _` | __| |\/ _ \\| \'_ \\\/ __| | |\r\n| \\__\/\\ (_) | | | | (_| | | | (_| | |_| |_| | | (_| | |_| | (_) | | | \\__ \\ |_|\r\n \\____\/\\___\/|_| |_|\\__, |_|  \\__,_|\\__|\\__,_|_|\\__,_|\\__|_|\\___\/|_| |_|___\/ (_)\r\n                    __\/ |                                                      \r\n                   |___\/                                                       ");
        var sound_3 = require("sound-play");
        sound_3.play("./Ressources/victory.mp3");
        process.exit();
    }
}
floor();
