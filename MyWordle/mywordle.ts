import { getRandomWord } from "./lib";
import { getInput } from "./lib";

function displayHistory(history) {
  console.clear();
  console.log(history.join("\n"));
}

function playGame() {
  let essais = 6;
  let guess = getRandomWord().toUpperCase();
  let history = [];

  console.log("Guess the word !");

  while (essais > 0) {
    let word = getInput("").toUpperCase();
    let output = "";

    if (word === guess) {
      for (let i = 0; i < guess.length; i++) {
        output += `\x1b[41m${guess[i]}\x1b[37m\x1b[0m`;
      }
      output += "\nBien joué !";
      history.push(output);
      displayHistory(history);
      break;
    }

    if (word.length === guess.length) {
      essais--;

      for (let i = 0; i < word.length; i++) {
        let foundAt = guess.indexOf(word[i]);

        if (word[i] === guess[i]) {
          output += `\x1b[41m${word[i]}\x1b[37m\x1b[0m`;
        } else if (foundAt !== -1 && foundAt !== i) {
          output += `\x1b[43m${word[i]}\x1b[37m\x1b[0m`;
        } else {
          output += word[i];
        }
      }

      history.push(output);
      displayHistory(history);
    } else {
      console.log(
        "Invalid word length. Try again with a word of the correct length."
      );
    }

    if (essais === 0) {
      output = `\nLe mot était ${guess}`;
      history.push(output);
      displayHistory(history);
      break;
    }
  }
}

playGame();
