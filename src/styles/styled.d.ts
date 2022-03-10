import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    bgContainerColor: string;
    headerColor: string;
    activeColor: string;
    inactiveColor: string;
    textBoldColor: string;
    borderColor: string;
    inputBgColor: string;
    searchBgColor: string;
    hashtagColor: string;
    grayTextColor: string;
    lightGrayTextColor: string;
    errorColor: string;
    formMaxWidth: string;
    contentMaxWidth: string;
  }
}
