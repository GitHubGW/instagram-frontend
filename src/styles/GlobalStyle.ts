import { createGlobalStyle, DefaultTheme, GlobalStyleComponent } from "styled-components";
import reset from "styled-reset";

const GlobalStyle: GlobalStyleComponent<{}, DefaultTheme> = createGlobalStyle`
  ${reset};


`;

export default GlobalStyle;
