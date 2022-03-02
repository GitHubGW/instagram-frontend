import styled from "styled-components";

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.theme.inputBgColor};
  color: ${(props) => props.theme.grayTextColor};
  border: 1px solid ${(props) => (props.hasError ? props.theme.errorColor : props.theme.borderColor)};
  border-radius: 3px;
  box-sizing: border-box;
  margin-bottom: 3px;

  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: ${(props) => (props.hasError ? props.theme.errorColor : "#222222")};
  }
`;

export default Input;
