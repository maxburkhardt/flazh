/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { useSpring, animated } from "@react-spring/web";
import { useEffect, useRef } from "react";

export type Props = {
  color?: string;
  shouldShrinkText?: boolean;
  children?: React.ReactNode;
};

function DisplayCard({ color, shouldShrinkText, children }: Props) {
  const theme = useTheme();
  let [springs, api] = useSpring(() => ({
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
      priorColor.current = color ?? theme.colors.displayBackground;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);
  useEffect(() => {
    api.start({
      from: {
        backgroundColor: priorColor.current,
      },
      to: {
        backgroundColor: theme.colors.displayBackground,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);
  const cardStyle = css`
    text-align: center;
    font-size: 72pt;
    padding: 20px;
    transform: skew(0deg, 3deg);
    margin: 25px auto;
    background-color: ${theme.colors.displayBackground};
    color: ${theme.colors.displayForeground};
    white-space: nowrap;
    overflow: scroll;
  `;
  const resizeStyle = css`
    @media (max-width: 1000px) {
      font-size: 48pt;
    }
  `;
  const compositedCss = shouldShrinkText
    ? css`
        ${cardStyle};
        ${resizeStyle};
      `
    : cardStyle;
  return (
    <animated.div css={compositedCss} style={{ ...springs }}>
      {children}
    </animated.div>
  );
}

export default DisplayCard;
