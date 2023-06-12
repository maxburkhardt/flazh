import { GameMode } from "./containers/GameContainer";
import KNOWN_WORDS from "./resources/known_words.json";

export type Word = {
  en: string;
  zh: string;
  tones: string;
};

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
      return showAnswer ? word.tones : word.zh;
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
  return KNOWN_WORDS[Math.floor(Math.random() * KNOWN_WORDS.length)];
}
