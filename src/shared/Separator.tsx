import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  width: 100%;
  margin: 17px auto;

  div {
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.borderColor};
  }
  span {
    color: ${(props) => props.theme.grayTextColor};
    font-size: 12px;
    font-weight: bold;
    width: 50%;
  }
`;

const Separator = () => {
  return (
    <Container>
      <div></div>
      <span>또는</span>
      <div></div>
    </Container>
  );
};

export default Separator;
