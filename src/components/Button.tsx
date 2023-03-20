/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";

export type Props = {
  onClick: () => void;
  children?: React.ReactNode;
};

function Button({ onClick, children }: Props) {
  const theme = useTheme();
  const style = css`
    background-color: ${theme.colors.displayBackground};
    color: ${theme.colors.displayForeground};
    border: none;
    padding: 10px;
    margin: 20px;
    font-size: 72pt;
    height: 2em;
    :hover {
      background-color: ${theme.colors.success};
    }
  `;
  return (
    <button css={style} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
