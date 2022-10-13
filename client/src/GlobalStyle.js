import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        min-height: 100vh;
    }

    img{
        max-width: 100%;
        height: auto;
    }

    h1{
        font-size: 1.8rem;
    }
`;

export default GlobalStyle;
