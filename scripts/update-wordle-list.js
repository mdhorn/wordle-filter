const fs = require("fs");

const url = "https://www.fiveforks.com/wordle/";
const html = await fetch(url).then(r => r.text());

const chronological = html.split(/Chronological/i)[1];
const matches = [...chronological.matchAll(/\b([A-Z]{5})\s+(\d+[a-z]?)\s+(\d{2}\/\d{2}\/\d{2})@?\b/g)];

const answers = matches.map(match => ({
  word: match[1],
  number: match[2],
  date: match[3]
}));

fs.writeFileSync(
  "used-wordle-answers.json",
  JSON.stringify(answers, null, 2) + "\n"
);

console.log(`Wrote ${answers.length} used Wordle answers.`);
