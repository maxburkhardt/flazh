/** @jsxImportSource @emotion/react */
import { css, useTheme, Theme } from "@emotion/react";
import { useState } from "react";
import DisplayCard from "./DisplayCard";
import { day, night } from "../theme";
import { getAnswerForMode, getDisplayForMode, getWord } from "../vocabulary";
import Button from "./Button";
import TextEntryCard from "./TextEntryCard";
import InputCard from "./InputCard";

export type Props = {
  updateTheme: (t: Theme) => void;
};

export type GameMode = "办法一" | "办法二" | "办法三";
const gameModeSeq: Array<GameMode> = ["办法一", "办法二", "办法三"];

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
  const [mode, setMode] = useState(0);
  const [currentWord, setCurrentWord] = useState(getWord());
  const [textEntry, setTextEntry] = useState("");
  const evaluateAnswer = () => {
    if (textEntry === getAnswerForMode(currentWord, gameModeSeq[mode])) {
      // Correct!
      setDisplayColor(theme.colors.success);
      setTimeout(() => setDisplayColor(theme.colors.displayBackground), 500);
      setTextEntry("");
      setCurrentWord(getWord());
    } else {
      // Incorrect!
      setDisplayColor(theme.colors.danger);
      setTimeout(() => setDisplayColor(theme.colors.displayBackground), 500);
      setTextEntry("");
    }
  };
  return (
    <div css={style}>
      <DisplayCard>{gameModeSeq[mode]}</DisplayCard>
      <DisplayCard color={displayColor}>
        {getDisplayForMode(currentWord, gameModeSeq[mode])}
      </DisplayCard>
      <TextEntryCard
        value={textEntry}
        onChange={(e) => setTextEntry(e.target.value)}
        submitCallback={evaluateAnswer}
        lang="zh-Hans"
      />
      <InputCard>
        <Button onClick={evaluateAnswer}>&nbsp;&rarr;&nbsp;</Button>
        <Button onClick={() => updateTheme(day)}>&#x2600;</Button>
        <Button onClick={() => updateTheme(night)}>&#x263e;</Button>
        <Button onClick={() => setMode((mode + 1) % 3)}>&#x2398;</Button>
      </InputCard>
    </div>
  );
}

export default GameContainer;
