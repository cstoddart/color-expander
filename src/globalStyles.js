import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    outline: none;

    &:before,
    &:after {
      box-sizing: border-box;
    }
  }

  body {
    margin: 0;
    font-family: sans-serif;
    background: black;
    background: var(--background-color);
    color: white;
    color: var(--text-color);
  }
`;
