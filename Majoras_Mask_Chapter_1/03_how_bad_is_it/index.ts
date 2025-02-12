const great: any = (process.argv[2]);
const stray: any = (348 - great) / 3;

if ((Math.ceil(stray)) < 10) {
  console.log("The Great Fairy is missing", (Math.ceil(stray)), "Stray Fairies.")
  console.log("It's not too bad yet, it shouldn't take too much time to heal her.");
}

if (((Math.ceil(stray)) >= 10) && ((Math.ceil(stray)) <= 39)) {
  console.log("The Great Fairy is missing", (Math.ceil(stray)), "Stray Fairies.")
  console.log("Whoever did this to her was clearly playing some mischievous prank!");
}

if (((Math.ceil(stray)) >= 40) && ((Math.ceil(stray)) <= 99)) {
  console.log("The Great Fairy is missing", (Math.ceil(stray)), "Stray Fairies.")
  console.log("She has been greatly damaged. We must save her as soon as possible!");
}

if ((Math.ceil(stray)) > 99) {
  console.log("The Great Fairy is missing", (Math.ceil(stray)), "Stray Fairies.")
  console.log("What happened to her!? It's just awful!");
}
