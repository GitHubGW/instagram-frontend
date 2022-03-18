import styled from "styled-components";

export const BoldText = styled.span`
  font-weight: bold;
`;

export const Button = styled.button`
  width: 100%;
  border: none;
  margin-top: 3px;
  margin-bottom: 8px;
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${(props) => (props.disabled ? props.theme.inactiveColor : props.theme.activeColor)};
`;

export const Input = styled.input<{ hasError?: boolean }>`
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

export const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ScrollBox = styled.div`
  &::-webkit-scrollbar {
    width: 9px;
    height: 9px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${(props) => props.theme.lightGrayTextColor};
    &:hover {
      background-color: gray;
    }
    &:active {
      background-color: gray;
    }
  }
  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.bgContainerColor};
  }
`;
