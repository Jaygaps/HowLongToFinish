import React from "react";
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
  
} from "styled-components";

import styledTheme from "./base/theme";

const GlobalStyle = createGlobalStyle`  
  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
  *, *:before, *:after {
    box-sizing: inherit;
    outline: none;
  }
  body {
    background-color: #252627;
    font-family: 'Poppins', sans-serif;
  }
  body, p, h1, h2, h3, h4, h5 {
    padding: 0;
    margin: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    text-decoration: none;
  }
`;

type StyledTheme = typeof styledTheme;

declare module "styled-components" {
  export interface DefaultTheme extends StyledTheme {}
}

const ThemeProvider = ({ children }: React.PropsWithChildren<{}>) => (
  <StyledThemeProvider theme={styledTheme}>
    <GlobalStyle />
    <div>{children}</div>
  </StyledThemeProvider>
);

export default ThemeProvider;
