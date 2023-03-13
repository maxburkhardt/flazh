/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const cardStyle = css`
  padding: 20px;
  transform: skew(0deg, 3deg);
  margin: 25px auto;
  background-color: #fff;
`;

const inputStyle = css`
  font-size: 72pt;
  width: 100%;
  background: transparent;
  border: none;
  text-align: center;
  :focus {
    outline: none;
  }
`;

export type Props = {
  lang: "en" | "zh-Hans";
};

function InputCard({ lang }: Props) {
  return (
    <div css={cardStyle}>
      <input type="text" lang={lang} css={inputStyle} placeholder="..."></input>
    </div>
  );
}

export default InputCard;
