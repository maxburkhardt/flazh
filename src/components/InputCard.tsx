/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const cardStyle = css`
  border-radius: 10px;
  border: 1px solid #000;
  width: fit-content;
  padding: 20px;
  transform: skew(0deg, 10deg);
`;

const inputStyle = css`
  font-size: 72pt;
`;

export type Props = {
  lang: "en" | "zh-Hans";
};

function InputCard({ lang }: Props) {
  return (
    <div css={cardStyle}>
      <input type="text" lang={lang} css={inputStyle}></input>
    </div>
  );
}

export default InputCard;
