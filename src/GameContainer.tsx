/** @jsxImportSource @emotion/react */
import { css, useTheme, Theme } from "@emotion/react";
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
  return (
    <div css={style}>
      <DisplayCard>你好</DisplayCard>
      <DisplayCard>我是中国人</DisplayCard>
      <InputCard lang="zh-Hans" />
      <DisplayCard>
        <button onClick={() => updateTheme(day)}>Change Theme</button>
      </DisplayCard>
    </div>
  );
}

export default GameContainer;
