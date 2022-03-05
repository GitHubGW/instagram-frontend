import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    headerColor: string;
    activeColor: string;
    inactiveColor: string;
    textBoldColor: string;
    borderColor: string;
    inputBgColor: string;
    grayTextColor: string;
    errorColor: string;
    formMaxWidth: string;
    containerMaxWidth: string;
  }
}
