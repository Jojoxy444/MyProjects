"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("./lib");
var lib_2 = require("./lib");
function displayHistory(history) {
  console.clear();
  console.log(history.join("\n"));
}
function playGame() {
  var essais = 6;
  var guess = (0, lib_1.getRandomWord)().toUpperCase();
  var history = [];
  console.log("Guess the word !");
  while (essais > 0) {
    var word = (0, lib_2.getInput)("").toUpperCase();
    var output = "";
    if (word === guess) {
      for (var i = 0; i < guess.length; i++) {
        output += "\u001B[41m".concat(guess[i], "\u001B[37m\u001B[0m");
      }
      output += "\nBien joué !";
      history.push(output);
      displayHistory(history);
      break;
    }
    if (word.length === guess.length) {
      essais--;
      for (var i = 0; i < word.length; i++) {
        var foundAt = guess.indexOf(word[i]);
        if (word[i] === guess[i]) {
          output += "\u001B[41m".concat(word[i], "\u001B[37m\u001B[0m");
        } else if (foundAt !== -1 && foundAt !== i) {
          output += "\u001B[43m".concat(word[i], "\u001B[37m\u001B[0m");
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
      output = "\nLe mot \u00E9tait ".concat(guess);
      history.push(output);
      displayHistory(history);
      break;
    }
  }
}
playGame();
