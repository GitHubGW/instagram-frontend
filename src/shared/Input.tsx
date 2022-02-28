import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.theme.inputBgColor};
  color: ${(props) => props.theme.grayTextColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 3px;
  box-sizing: border-box;
  margin-bottom: 6px;

  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: #222;
  }
`;

export default Input;
