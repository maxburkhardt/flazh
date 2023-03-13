import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      appBackground: string;
      displayBackground: string;
      displayForeground: string;
      inputBackground: string;
      inputForeground: string;
      danger: string;
      success: string;
    };
  }
}
