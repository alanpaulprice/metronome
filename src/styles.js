import { createGlobalStyle } from 'styled-components';

// ===== THEME

export const Theme = {
  bg: 'hsl(201, 100%, 34%)',
  fg: 'hsl(43, 68%, 43%)'
};

// ===== STYLES

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Saira', sans-serif;
  }

  html {
    background: ${Theme.bg};
    font-size: 10px;
  }

  #root {
    width: 90%;
    min-width: 300px;
    max-width: 400px;
    margin: 0 auto;
  }

  @media screen and (min-width: 640px) {
    html {
      font-size: 12.5px;
    }
  }
`;
