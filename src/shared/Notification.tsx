import styled from "styled-components";

interface NotificationProps {
  message?: string;
}

const Message = styled.h5`
  color: ${(props) => props.theme.activeColor};
  font-weight: bold;
  font-size: 13px;
  margin-bottom: 12px;
`;

const Notification = ({ message }: NotificationProps) => {
  return <Message>{message}</Message>;
};

export default Notification;
