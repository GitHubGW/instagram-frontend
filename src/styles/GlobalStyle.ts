import { createGlobalStyle, DefaultTheme, GlobalStyleComponent } from "styled-components";
import reset from "styled-reset";

const GlobalStyle: GlobalStyleComponent<{}, DefaultTheme> = createGlobalStyle`
  ${reset};

  *{
    box-sizing:border-box;
  }
  body{
    background-color: ${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor};
  }
  input{
    outline:none;
    border:none;
  }
  a{
    color:inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
