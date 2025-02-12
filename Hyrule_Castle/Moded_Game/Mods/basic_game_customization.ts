import * as readlineSync from "readline-sync";
import { floor } from "../level";
import { Personnage } from "../kda";
const sound = require(`sound-play`);

export let difficulty = 1;
export let fights = 0;

export function applyDifficulty(perso: Personnage) {
    perso.hp *= difficulty;
    perso.max_hp *= difficulty;
    perso.mp *= difficulty;
    perso.str *= difficulty;
    perso.int *= difficulty;
    perso.def *= difficulty;
    perso.res *= difficulty;
    perso.spd *= difficulty;
    perso.luck *= difficulty;
}

export function startMenu() {
  console.clear();
  sound.play(`./Ressources/theme.mp3`);
  console.log(" _   _                  _        _____           _   _      \r\n| | | |                | |      /  __ \\         | | | |     \r\n| |_| |_   _ _ __ _   _| | ___  | /  \\/ __ _ ___| |_| | ___ \r\n|  _  | | | | '__| | | | |/ _ \\ | |    / _` / __| __| |/ _ \\\r\n| | | | |_| | |  | |_| | |  __/ | \\__/\\ (_| \\__ \\ |_| |  __/\r\n\\_| |_/\\__, |_|   \\__,_|_|\\___|  \\____/\\__,_|___/\\__|_|\\___|\r\n        __/ |                                               \r\n       |___/                                                ");
  console.log(``);
  readlineSync.question(`========== Press Enter to Continue ==========`);
  console.clear();

  console.log("========== Lore ==========");
  console.log("");
  console.log("\x1b[1mDans le royaume d'Hyrule, la princesse Zelda a été enlevée par de puissants ennemis et retenue captive dans la sinistre tour de Ganon et ses confrères.\x1b[22m") 
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
    floor(difficulty, fights);
  } else if (userInput === `2`) {
    process.exit();
  }

  console.clear();
}

function chooseDifficulty() {
    let userInput = "";

  while (userInput !== "1" && userInput !== "2" && userInput !== "3") {
    //Pour dire que si c'est différent alors tu réitère le choix
    console.log(`Set your game difficulty`)
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
    difficulty = 1;
  } else if (userInput === `2`) {
    difficulty = 1.5;
  } else if (userInput === `3`) {
    difficulty = 2;
  }
}

function chooseFights() {
    let userInput = "";

  while (userInput !== "1" && userInput !== "2" && userInput !== "3" && userInput !== "4") {
    //Pour dire que si c'est différent alors tu réitère le choix sans continuer le round
    console.log(`Set the number of stages`)
    userInput = readlineSync.question(`1. 10        2. 20        3. 50        4. 100 `);
    console.log(``);

    if (userInput !== "1" && userInput !== "2" && userInput !== "3" && userInput !== "4") {
      console.log(`\x1b[1mPlease press 1, 2, 3 or 4 to set the number of stages !\x1b[22m`);
      console.log(``);
      // la boucle recommence ici
    }
  }

  if (userInput === `1`) {
    fights = 10;
  } else if (userInput === `2`) {
    fights = 20;
  } else if (userInput === `3`) {
    fights = 50;
  } else if (userInput === `4`) {
    fights = 100;
  }

  console.clear();
}
