import { createGlobalStyle } from 'styled-components';

// ===== THEME

export const Theme = {
  bg: 'hsl(0, 75%, 25%)',
  fg: 'hsl(0, 25%, 90%)'
};

// ===== STYLES

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    background: ${Theme.bg};
    font-size: 62.5%;
  }

  body {
    font-family: 'Saira', sans-serif;
    box-sizing: border-box;
  }

  #root {
    width: 90%;
    min-width: 300px;
    max-width: 400px;
    margin: 0 auto;
  }

  @media screen and (min-width: 640px) {
    html {
      font-size: 78.125%;
    }
  }
`;
