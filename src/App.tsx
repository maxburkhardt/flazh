/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { night } from "./theme";
import GameContainer from "./GameContainer";

function App() {
  const [theme, updateTheme] = useState(night);
  return (
    <ThemeProvider theme={theme}>
      <GameContainer updateTheme={updateTheme} />
    </ThemeProvider>
  );
}

export default App;
