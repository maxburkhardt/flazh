import { readFileSync } from "fs";
import axios from "axios";

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
  console.log(words);
};

main();
