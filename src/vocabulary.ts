import { GameMode } from "./components/GameContainer";

export type Word = {
  en: string;
  zh: string;
  tones: string;
};

const WORDS: Array<Word> = [
  { en: "write", zh: "写", tones: "3" },
  { en: "read", zh: "读", tones: "2" },
];

export function getDisplayForMode(word: Word, mode: GameMode): string {
  switch (mode) {
    case "办法一":
      return word.zh;
    case "办法二":
      return word.en;
    case "办法三":
      return word.zh;
  }
}

export function getAnswerForMode(word: Word, mode: GameMode): string {
  switch (mode) {
    case "办法一":
      return word.en;
    case "办法二":
      return word.zh;
    case "办法三":
      return word.tones;
  }
}

export { WORDS };
