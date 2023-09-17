import { readFileSync, writeFileSync, readdirSync } from "fs";
import axios from "axios";

interface Word {
  en: string;
  zh: string;
  tones: string;
}

interface DuolingoResponse {
  language_data: {
    zs: {
      skills: {
        learned: boolean;
        words: Array<string>;
      }[];
    };
  };
}

interface DuolingoConfig {
  login: string;
  jwt: string;
}

function generateNewFilename(): string {
  const d = new Date();
  const formatted = d.toISOString().split("T")[0].replace(/-/g, "");
  return `./data/known_zh_${formatted}.tsv`;
}

function readAllPrevious(): Set<string> {
  const prevFiles = readdirSync("./data/").filter((fn) =>
    fn.match(/^known_zh_\d+\.tsv$/)
  );
  const knownWords: Set<string> = new Set();
  for (const file of prevFiles) {
    const fileData = readFileSync(`./data/${file}`).toString();
    for (const line of fileData.split("\n")) {
      knownWords.add(line.split("\t")[0]);
    }
  }
  return knownWords;
}

const main = async () => {
  // First, fetch known words from Duolingo

  const DUOLINGO_USER = JSON.parse(
    readFileSync("scripts/duolingo-account.json").toString()
  ) as DuolingoConfig;
  const userData = (
    await axios(`https://www.duolingo.com/users/${DUOLINGO_USER.login}`, {
      headers: {
        Authorization: DUOLINGO_USER.jwt,
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
      },
    })
  ).data as DuolingoResponse;
  const duolingoWords = userData.language_data.zs.skills
    .map((skill) => (skill.learned ? skill.words : []))
    .flat();
  const newWords: Array<string> = [];
  const importedSoFar = readAllPrevious();
  for (const word of duolingoWords) {
    if (!importedSoFar.has(word)) {
      newWords.push(word);
    }
  }

  const cedict = JSON.parse(readFileSync("data/cedict.json").toString());
  const knownWords: Word[] = [];
  for (const word of newWords) {
    const lookup = cedict[word];
    if (!lookup) {
      console.log(`[WARN] Couldn't find definition for ${word}`);
    } else {
      knownWords.push({ zh: word, en: lookup.en, tones: lookup.tones });
      console.log(`${word}: ${lookup.tones} ${lookup.en}`);
    }
  }

  let tsv = "";
  for (const word of knownWords) {
    tsv += `${word.zh}\t${word.en}\t${word.tones}\n`;
  }
  const newFn = generateNewFilename();
  console.log(`New filename is ${newFn}`);
  writeFileSync(newFn, tsv);
};

main();
