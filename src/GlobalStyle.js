import { createGlobalStyle } from 'styled-components';
import StyleTheme from './StyleTheme';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: monospace;
  }

  html {
    background: ${StyleTheme.bg};
    font-size: 10px;
  }
`;

export default GlobalStyle;
