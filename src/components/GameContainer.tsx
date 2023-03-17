/** @jsxImportSource @emotion/react */
import { css, useTheme, Theme } from "@emotion/react";
import { useState } from "react";
import DisplayCard from "./DisplayCard";
import InputCard from "./InputCard";
import { day } from "../theme";
import { getDisplayForMode, Word, WORDS } from "../vocabulary";

export type Props = {
  updateTheme: (t: Theme) => void;
};

export type GameMode = "办法一" | "办法二" | "办法三";

function GameContainer({ updateTheme }: Props) {
  const theme = useTheme();
  const style = css`
    text-align: center;
    min-width: 1000px;
    background-color: ${theme.colors.appBackground};
    height: 100vh;
    overflow: auto;
  `;
  const [displayColor, setDisplayColor] = useState(
    theme.colors.displayBackground
  );
  const [mode, setMode] = useState<GameMode>("办法一");
  const [currentWord, setCurrentWord] = useState<Word>(WORDS[0]);
  return (
    <div css={style}>
      <DisplayCard>{mode}</DisplayCard>
      <DisplayCard color={displayColor}>
        {getDisplayForMode(currentWord, mode)}
      </DisplayCard>
      <InputCard lang="zh-Hans" />
      <DisplayCard color={displayColor}>
        <button onClick={() => updateTheme(day)}>Change Theme</button>
        <button
          onClick={() => {
            setDisplayColor(theme.colors.danger);
            setTimeout(
              () => setDisplayColor(theme.colors.displayBackground),
              1000
            );
          }}
        >
          Danger
        </button>
        <button onClick={() => setMode("办法二")}>Mode switch</button>
        <button onClick={() => setCurrentWord(WORDS[1])}>New word</button>
      </DisplayCard>
    </div>
  );
}

export default GameContainer;
