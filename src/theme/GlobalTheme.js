import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

    * {
        color : ${({ theme }) => theme.text}
    }

    body {
        height: 100vh;
    }

`;
