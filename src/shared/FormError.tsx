import styled from "styled-components";

interface FormErrorProps {
  message?: string;
}

const Message = styled.h5`
  color: tomato;
  font-weight: bold;
  font-size: 11px;
  margin: 5px 0;
`;

const FormError = ({ message }: FormErrorProps) => {
  return <Message>{message}</Message>;
};

export default FormError;
