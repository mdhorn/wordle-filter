const fs = require("fs");

const url = "https://www.fiveforks.com/wordle/";

async function main() {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();

  const matches = [
    ...html.matchAll(/\b([A-Z]{5})\s+(\d+[a-z]?)\s+(\d{2}\/\d{2}\/\d{2})@?\b/g)
  ];

  if (matches.length === 0) {
    throw new Error("No Wordle answer rows found on FiveForks page.");
  }

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
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
