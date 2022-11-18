import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        min-height: 100vh;
        overflow-x: hidden;
    }

    img{
        max-width: 100%;
        height: auto;
    }
`;

export default GlobalStyle;
