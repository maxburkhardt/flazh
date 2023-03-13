/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import DisplayCard from "./components/DisplayCard";
import InputCard from "./components/InputCard";

const appStyle = css`
  text-align: center;
  min-width: 1000px;
`;

function App() {
  return (
    <div css={appStyle}>
      <DisplayCard>你好</DisplayCard>
      <DisplayCard>我是中国人</DisplayCard>
      <InputCard lang="zh-Hans" />
    </div>
  );
}

export default App;
