import styled from "styled-components";
import Header from "../components/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const Wrapper = styled.div``;

const Container = styled.div``;

const Content = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.contentMaxWidth};
  width: ${(props) => props.theme.contentMaxWidth};
  display: flex;
  flex-direction: column;
`;

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Wrapper>
      <Header />
      <Container>
        <Content>{children}</Content>
      </Container>
    </Wrapper>
  );
};

export default MainLayout;
