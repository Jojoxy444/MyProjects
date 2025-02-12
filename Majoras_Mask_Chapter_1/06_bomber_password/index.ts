const times: any = (process.argv[2]);
const animal: string = (process.argv[3]);

if (animal == `dogs`)
{
  let phrase = `bark `.repeat(times);
  let new_phrase = phrase.substring(0, phrase.length - 1);
  console.log(`${new_phrase}!`)
}

if (animal == `cats`)
{
  let phrase = `meow `.repeat(times);
  let new_phrase = phrase.substring(0, phrase.length - 1);
  console.log(`${new_phrase}!`)
}

if (animal == `cows`)
{
  let phrase = `moo `.repeat(times);
  let new_phrase = phrase.substring(0, phrase.length - 1);
  console.log(`${new_phrase}!`)
}