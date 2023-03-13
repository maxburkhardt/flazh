/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const cardStyle = css`
  text-align: center;
  font-size: 72pt;
  padding: 20px;
  transform: skew(0deg, 3deg);
  margin: 25px auto;
  background-color: #000;
  color: #fff;
`;

export type Props = {
  children?: React.ReactNode;
};

function DisplayCard({ children }: Props) {
  return <div css={cardStyle}>{children}</div>;
}

export default DisplayCard;
