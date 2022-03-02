import { createGlobalStyle, DefaultTheme, GlobalStyleComponent } from "styled-components";
import reset from "styled-reset";

const GlobalStyle: GlobalStyleComponent<{}, DefaultTheme> = createGlobalStyle`
  ${reset};

  *{
    box-sizing:border-box;
  }
  body{
    background-color: #FAFAFA;
  }
  input{
    outline:none;
    border:none;
  }
  a{
    text-decoration: none;
  }
`;

export default GlobalStyle;
