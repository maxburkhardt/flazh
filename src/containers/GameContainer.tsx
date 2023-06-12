/** @jsxImportSource @emotion/react */
import { css, useTheme, Theme } from "@emotion/react";
import { useState } from "react";
import DisplayCard from "../components/DisplayCard";
import { day, night } from "../theme";
import { getAnswerForMode, getDisplayForMode, getWord } from "../vocabulary";
import Button from "../components/Button";
import TextEntryCard from "../components/TextEntryCard";
import InputCard from "../components/InputCard";

export type Props = {
  updateTheme: (t: Theme) => void;
};

export type GameMode = "办法一" | "办法二" | "办法三";
const gameModeSeq: Array<GameMode> = ["办法一", "办法二", "办法三"];

function GameContainer({ updateTheme }: Props) {
  const theme = useTheme();
  const style = css`
    text-align: center;
    background-color: ${theme.colors.appBackground};
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
  `;
  const [displayColor, setDisplayColor] = useState(
    theme.colors.displayBackground
  );
  const [mode, setMode] = useState(0);
  const [currentWord, setCurrentWord] = useState(getWord());
  const [answerShown, setAnswerShown] = useState(false);
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
      showAnswer();
    }
  };
  const showAnswer = () => {
    setDisplayColor(theme.colors.danger);
    setAnswerShown(true);
    setTextEntry("");
    setTimeout(() => {
      setDisplayColor(theme.colors.displayBackground);
      setAnswerShown(false);
    }, 1000);
  };
  return (
    <div css={style}>
      <DisplayCard>{gameModeSeq[mode]}</DisplayCard>
      <DisplayCard color={displayColor} shouldShrinkText>
        {getDisplayForMode(currentWord, gameModeSeq[mode], answerShown)}
      </DisplayCard>
      <TextEntryCard
        value={textEntry}
        onChange={(e) => setTextEntry(e.target.value)}
        submitCallback={evaluateAnswer}
        lang="zh-Hans"
      />
      <InputCard>
        <Button onClick={evaluateAnswer}>答</Button>
        <Button onClick={showAnswer}>看</Button>
        <Button onClick={() => setMode((mode + 1) % 3)}>变</Button>
        <Button onClick={() => updateTheme(day)}>早</Button>
        <Button onClick={() => updateTheme(night)}>晚</Button>
      </InputCard>
    </div>
  );
}

export default GameContainer;
