import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    activeColor: string;
    inactiveColor: string;
    textBoldColor: string;
    borderColor: string;
    inputBgColor: string;
    inputTextColor: string;
  }
}
