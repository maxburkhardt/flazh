/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import InputCard from "./InputCard";

export type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitCallback: () => void;
  lang: "en" | "zh-Hans";
};

function TextEntryCard({ value, onChange, submitCallback, lang }: Props) {
  const theme = useTheme();
  const inputStyle = css`
    font-size: 72pt;
    width: 100%;
    background: transparent;
    color: ${theme.colors.inputForeground};
    border: none;
    text-align: center;
    padding: 0;
    margin: 0;
    :focus {
      outline: none;
    }
  `;
  return (
    <InputCard>
      <input
        type="text"
        lang={lang}
        css={inputStyle}
        placeholder="..."
        value={value}
        onChange={onChange}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            submitCallback();
          }
        }}
        autoFocus
      ></input>
    </InputCard>
  );
}

export default TextEntryCard;
