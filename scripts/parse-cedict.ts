// Parse the dictionary at https://www.mdbg.net/chinese/dictionary?page=cedict into JSON
import { readFileSync, writeFileSync } from "fs";
const CEDICT_FILENAME = "data/cedict_ts.u8";
const OUTPUT_FILENAME = "data/cedict.json";
const rawData = readFileSync(CEDICT_FILENAME).toString();
const lines = rawData.split("\n").filter((line) => !line.startsWith("#"));
const parsed: { [key: string]: { en: string; tones: string } } = {};

for (const line of lines) {
  // Get zh version
  const zh = line.split(" ")[1];
  // Get en version
  const enExtract = /(\/.+\/)/.exec(line);
  if (!enExtract) {
    console.warn(`Couldn't extract tones for line ${line}`);
    process.exit(1);
  }
  const en = enExtract[1].substring(1, enExtract[1].length - 1);
  // Get tones
  const tonesExtract = /(\[.+?\])/.exec(line);
  if (!tonesExtract) {
    console.warn(`Couldn't extract tones for line ${line}`);
    process.exit(1);
  }
  const tones = tonesExtract[1].substring(1, tonesExtract[1].length - 1);
  parsed[zh] = { en, tones };
}

const rendered = JSON.stringify(parsed, undefined, 2);
writeFileSync(OUTPUT_FILENAME, rendered);
