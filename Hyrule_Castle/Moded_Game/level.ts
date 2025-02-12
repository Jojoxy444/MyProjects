import open from "open";
import * as fs from "fs";
import * as readlineSync from "readline-sync";
import * as rarity from "./rarity";
import * as kda from "./kda";
import Experience from "./Mods/mod_xp";
import { applyDifficulty, startMenu } from "./Mods/basic_game_customization";

const sound = require(`sound-play`);

let player: kda.Personnage;
let mob: kda.Personnage;
let boss: kda.Personnage;

// Stocké les personnages en entier au lieu de juste leur hp
// définir les hp max et les initialisés

function level() {
  let level = 1;

  while (true) {
    console.log(`========== LEVEL ${level} ==========`);
    kda.display(player, mob);

    let userInput = "";

    while (userInput !== "1" && userInput !== "2") {
      //Pour dire que si c'est différent alors tu réitère le choix sans continuer le round
      console.log(`----------Options----------`);
      userInput = readlineSync.question(`1.Attack        2.Heal        `);
      console.log(``);

      if (userInput !== "1" && userInput !== "2") {
        console.log(`\x1b[1mPlease press 1 or 2 to make a choice !\x1b[22m`);
        console.log(``);
        // la boucle recommence ici
      }
    }

    if (userInput === `1`) {
      kda.attack(player, mob);

      console.log(
        `\x1b[3mYou attacked and dealt ${player.str} damages !\x1b[23m`
      );
      console.log(``);
    } else if (userInput === `2`) {
      kda.heal(player);

      console.log(`\x1b[3mYou used heal !\x1b[23m`);
      console.log(``);
    }

    if (mob.hp <= 0) {
      console.log(`\x1b[3m${mob.name} died !\x1b[23m`);

      Experience(player);
      // ajout d'xp au joueur
      readlineSync.question(`========== Press Enter to Continue ==========`);

      return false;
    }

    kda.attack(mob, player);

    console.log(
      `\x1b[3m${mob.name} attacked and dealt ${mob.str} damages !\x1b[23m`
    );
    console.log(``);

    if (player.hp <= 0) {
      return true;
    }

    level++;
  }
}

function level_boss() {
  let level = 1;

  while (true) {
    console.log(`========== LEVEL ${level} ==========`);
    kda.display(player, boss);

    let userInput = "";

    while (userInput !== "1" && userInput !== "2") {
      //Pour dire que si c'est différent alors tu réitère le choix sans continuer le round
      console.log(`----------Options----------`);
      userInput = readlineSync.question(`1.Attack        2.Heal        `);
      console.log(``);

      if (userInput !== "1" && userInput !== "2") {
        console.log(`\x1b[1mPlease press 1 or 2 to make a choice !\x1b[22m`);
        console.log(``);
        // la boucle recommence ici
      }
    }

    if (userInput === `1`) {
      kda.attack(player, boss);

      console.log(
        `\x1b[3mYou attacked and dealt ${player.str} damages !\x1b[23m`
      );
      console.log(``);
    } else if (userInput === `2`) {
      kda.heal(player);

      console.log(`\x1b[3mYou used heal !\x1b[23m`);
      console.log(``);
    }

    if (boss.hp <= 0) {
      console.log(`\x1b[3m${boss.name} died !\x1b[23m`);

      readlineSync.question(`========== Press Enter to Continue ==========`);

      return false;
    }

    kda.attack(boss, player);

    console.log(
      `\x1b[3m${boss.name} attacked and dealt ${boss.str} damages !\x1b[23m`
    );
    console.log(``);

    if (player.hp <= 0) {
      return true;
    }

    level++;
  }
}

function normalFloor(stage: number) {
  console.clear();
  console.log(`========== FLOOR ${stage}===========`);

  if (level() === true) {
    // Si return renvoie true alors le joueur est mort = GAME OVER
    console.clear();
    console.log(
      " _____   ___  ___  ___ _____   _____  _   _ ___________   _ \r\n|  __ \\ / _ \\ |  \\/  ||  ___| |  _  || | | |  ___| ___ \\ | |\r\n| |  \\// /_\\ \\| .  . || |__   | | | || | | | |__ | |_/ / | |\r\n| | __ |  _  || |\\/| ||  __|  | | | || | | |  __||    /  | |\r\n| |_\\ \\| | | || |  | || |___  \\ \\_/ /\\ \\_/ / |___| |\\ \\  |_|\r\n \\____/\\_| |_/\\_|  |_/\\____/   \\___/  \\___/\\____/\\_| \\_| (_)"
    );
    console.log(``);

    const sound = require(`sound-play`);
    sound.play(`./Ressources/lose.mp3`);

    // Retry ou quitter le jeu
    let userInput_minuscule = "";

    while (userInput_minuscule !== `y` && userInput_minuscule !== `n`) {
      const userInput = readlineSync.question(`Do you want to retry (y/n) `);
      userInput_minuscule = userInput.toLowerCase();

      if (userInput_minuscule === `y`) {
        startMenu();
      } else if (userInput_minuscule === `n`) {
        process.exit();
      } else {
        console.log(``);
        console.log(`\x1b[1mPlease press y or n to make a choice !\x1b[22m`);
        console.log(``);
      }
    }
  }
  console.clear();
}

function bossFloor(stage: number, maxStages: number) {
  console.log(`========== FLOOR ${stage}==========`);

  if (level_boss() === true) {
    // Si return renvoie true alors le joueur est mort = GAME OVER
    console.clear();
    console.log(
      " _____   ___  ___  ___ _____   _____  _   _ ___________   _ \r\n|  __ \\ / _ \\ |  \\/  ||  ___| |  _  || | | |  ___| ___ \\ | |\r\n| |  \\// /_\\ \\| .  . || |__   | | | || | | | |__ | |_/ / | |\r\n| | __ |  _  || |\\/| ||  __|  | | | || | | |  __||    /  | |\r\n| |_\\ \\| | | || |  | || |___  \\ \\_/ /\\ \\_/ / |___| |\\ \\  |_|\r\n \\____/\\_| |_/\\_|  |_/\\____/   \\___/  \\___/\\____/\\_| \\_| (_)"
    );
    console.log(``);

    const sound = require(`sound-play`);
    sound.play(`./Ressources/lose.mp3`);

    // Retry ou quitter le jeu
    let userInput_minuscule = "";

    while (userInput_minuscule !== `y` && userInput_minuscule !== `n`) {
      const userInput = readlineSync.question(`Do you want to retry (y/n) `);
      // AVANT: const userInput_minuscule = userInput.toLowerCase();
      userInput_minuscule = userInput.toLowerCase();

      if (userInput_minuscule === `y`) {
        startMenu();
      } else if (userInput_minuscule === `n`) {
        process.exit();
      } else {
        console.log(``);
        console.log(`\x1b[1mPlease press y or n to make a choice !\x1b[22m`);
        console.log(``);
      }
    }
  }
  console.clear();

  if (stage == maxStages) {
    console.log(
      " _____                             _         _       _   _                   _ \r\n/  __ \\                           | |       | |     | | (_)                 | |\r\n| /  \\/ ___  _ __   __ _ _ __ __ _| |_ _   _| | __ _| |_ _  ___  _ __  ___  | |\r\n| |    / _ \\| '_ \\ / _` | '__/ _` | __| | | | |/ _` | __| |/ _ \\| '_ \\/ __| | |\r\n| \\__/\\ (_) | | | | (_| | | | (_| | |_| |_| | | (_| | |_| | (_) | | | \\__ \\ |_|\r\n \\____/\\___/|_| |_|\\__, |_|  \\__,_|\\__|\\__,_|_|\\__,_|\\__|_|\\___/|_| |_|___/ (_)\r\n                    __/ |                                                      \r\n                   |___/                                                       "
    );
    const sound = require(`sound-play`);
    sound.play(`./Ressources/victory.mp3`);
    process.exit();
  }
}

export function floor(difficulty: number, maxStages: number) {
  let stage = 1;
  player = rarity.filter_player();

  while (stage <= maxStages) {
    if (stage % 10 === 0) {
      console.clear();
      boss = rarity.filter_boss();
      applyDifficulty(boss);
      bossFloor(stage, maxStages);
    } else {
      mob = rarity.filter_mob();
      applyDifficulty(mob);
      normalFloor(stage);
    }
    console.log(stage);
    stage++;
  }
}

startMenu();
