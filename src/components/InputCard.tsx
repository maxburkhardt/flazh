/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";

export type Props = {
  lang: "en" | "zh-Hans";
};

function InputCard({ lang }: Props) {
  const theme = useTheme();
  const cardStyle = css`
    padding: 20px;
    transform: skew(0deg, 3deg);
    margin: 25px auto;
    background-color: ${theme.colors.inputBackground};
  `;
  const inputStyle = css`
    font-size: 72pt;
    width: 100%;
    background: transparent;
    color: ${theme.colors.inputForeground};
    border: none;
    text-align: center;
    :focus {
      outline: none;
    }
  `;
  return (
    <div css={cardStyle}>
      <input type="text" lang={lang} css={inputStyle} placeholder="..."></input>
    </div>
  );
}

export default InputCard;
