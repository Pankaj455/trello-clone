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

    h1{
        font-size: 1.8rem;
    }

    section{
        width: 100vw;
        min-height: calc(100vh - 70px);
        background: #F8F9FD;
        padding: 2em 1.5em;
    }
`;

export default GlobalStyle;
