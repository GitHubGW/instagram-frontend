import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  border: none;
  margin-top: 8px;
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${(props) => props.theme.inactiveColor};
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};
`;

export default Button;
