/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";

export type Props = {
  children?: React.ReactNode;
};

function DisplayCard({ children }: Props) {
  const theme = useTheme();
  const cardStyle = css`
    text-align: center;
    font-size: 72pt;
    padding: 20px;
    transform: skew(0deg, 3deg);
    margin: 25px auto;
    background-color: ${theme.colors.displayBackground};
    color: ${theme.colors.displayForeground};
  `;
  return <div css={cardStyle}>{children}</div>;
}

export default DisplayCard;
