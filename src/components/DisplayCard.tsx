/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { useSpring, animated } from "@react-spring/web";
import { useEffect, useRef } from "react";

export type Props = {
  color: string;
  children?: React.ReactNode;
};

function DisplayCard({ color, children }: Props) {
  const theme = useTheme();
  const [springs, api] = useSpring(() => ({
    from: { backgroundColor: theme.colors.displayBackground },
  }));
  const priorColor = useRef(theme.colors.displayBackground);
  useEffect(() => {
    if (priorColor.current !== color) {
      api.start({
        from: {
          backgroundColor: priorColor.current,
        },
        to: {
          backgroundColor: color,
        },
      });
      priorColor.current = color;
    }
  }, [color, api]);
  const cardStyle = css`
    text-align: center;
    font-size: 72pt;
    padding: 20px;
    transform: skew(0deg, 3deg);
    margin: 25px auto;
    background-color: ${theme.colors.displayBackground};
    color: ${theme.colors.displayForeground};
  `;
  return (
    <animated.div css={cardStyle} style={{ ...springs }}>
      {children}
    </animated.div>
  );
}

export default DisplayCard;
