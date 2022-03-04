import styled from "styled-components";

const Button = styled.button`
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

export default Button;
