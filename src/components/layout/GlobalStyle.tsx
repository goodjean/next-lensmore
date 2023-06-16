import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    width: 100%;
    height: 100%;
  }

  body {
    width: 100%;
    min-height: 100vh;
  }

  #__next {
    width: 100%;
    height: 100%;
  }

  a {
    text-decoration: none;
    color: black;
  }
`;

export default GlobalStyle;
