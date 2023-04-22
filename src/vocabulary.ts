import { GameMode } from "./containers/GameContainer";

export type Word = {
  en: string;
  zh: string;
  tones: string;
};

const WORDS: Array<Word> = [
  { en: "write", zh: "写", tones: "3" },
  { en: "read", zh: "读", tones: "2" },
];

export function getDisplayForMode(
  word: Word,
  mode: GameMode,
  showAnswer: boolean
): string {
  switch (mode) {
    case "办法一":
      return showAnswer ? word.en : word.zh;
    case "办法二":
      return showAnswer ? word.zh : word.en;
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

export function getWord(): Word {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}
