/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const cardStyle = css`
  border-radius: 10px;
  border: 1px solid #000;
  text-align: center;
  font-size: 72pt;
  width: fit-content;
  padding: 20px;
  transform: skew(0deg, -10deg);
`;

export type Props = {
  children?: React.ReactNode;
};

function DisplayCard({ children }: Props) {
  return <div css={cardStyle}>{children}</div>;
}

export default DisplayCard;
