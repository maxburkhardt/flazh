import { readFileSync, writeFileSync } from "fs";
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
  const words = userData.language_data.zs.skills
    .map((skill) => (skill.learned ? skill.words : []))
    .flat();
  // Write words out to the data directory
  writeFileSync("data/known_zh.json", JSON.stringify(words));

  // Now, look up those words in our dictionary
  // Run `npm run parseCedict` if this doesn't exist
  const cedict = JSON.parse(readFileSync("data/cedict.json").toString());
  const knownWords: Word[] = [];
  for (const word of words) {
    const lookup = cedict[word];
    if (!lookup) {
      console.log(`[WARN] Couldn't find definition for ${word}`);
    } else {
      knownWords.push({ zh: word, en: lookup.en, tones: lookup.tones });
      console.log(`${word}: ${lookup.tones} ${lookup.en}`);
    }
  }
  writeFileSync("src/resources/known_words.json", JSON.stringify(knownWords));
};

main();
