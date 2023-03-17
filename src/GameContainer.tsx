/** @jsxImportSource @emotion/react */
import { css, useTheme, Theme } from "@emotion/react";
import { useState } from "react";
import DisplayCard from "./components/DisplayCard";
import InputCard from "./components/InputCard";
import { day } from "./theme";

export type Props = {
  updateTheme: (t: Theme) => void;
};

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
  return (
    <div css={style}>
      <DisplayCard color={displayColor}>你好</DisplayCard>
      <DisplayCard color={displayColor}>我是中国人</DisplayCard>
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
      </DisplayCard>
    </div>
  );
}

export default GameContainer;
