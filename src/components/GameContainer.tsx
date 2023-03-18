/** @jsxImportSource @emotion/react */
import { css, useTheme, Theme } from "@emotion/react";
import { useState } from "react";
import DisplayCard from "./DisplayCard";
import { day } from "../theme";
import { getDisplayForMode, Word, WORDS } from "../vocabulary";
import Button from "./Button";
import TextEntryCard from "./TextEntryCard";
import InputCard from "./InputCard";

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
  const [textEntry, setTextEntry] = useState("");
  return (
    <div css={style}>
      <DisplayCard>{mode}</DisplayCard>
      <DisplayCard color={displayColor}>
        {getDisplayForMode(currentWord, mode)}
      </DisplayCard>
      <TextEntryCard
        value={textEntry}
        onChange={(e) => setTextEntry(e.target.value)}
        lang="zh-Hans"
      />
      <InputCard>
        <Button onClick={() => updateTheme(day)}>Change Theme</Button>
        <Button
          onClick={() => {
            setDisplayColor(theme.colors.danger);
            setTimeout(
              () => setDisplayColor(theme.colors.displayBackground),
              1000
            );
          }}
        >
          Danger
        </Button>
        <Button onClick={() => setMode("办法二")}>Mode switch</Button>
        <Button onClick={() => setCurrentWord(WORDS[1])}>New word</Button>
      </InputCard>
    </div>
  );
}

export default GameContainer;
