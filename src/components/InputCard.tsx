/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";

export type Props = {
  children?: React.ReactNode;
};

function InputCard({ children }: Props) {
  const theme = useTheme();
  const cardStyle = css`
    padding: 20px;
    transform: skew(0deg, 3deg);
    margin: 25px auto;
    background-color: ${theme.colors.inputBackground};
  `;
  return <div css={cardStyle}>{children}</div>;
}

export default InputCard;
