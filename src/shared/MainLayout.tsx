import { useParams } from "react-router";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useSeeProfileQuery } from "../generated/graphql";

interface MainLayoutProps {
  children: React.ReactNode;
}

type ProfileParams = {
  username: string;
};

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
  const { username } = useParams<ProfileParams>();
  const { data: seeProfileData, loading: seeProfileLoading } = useSeeProfileQuery({ variables: { username: username || "" } });

  return (
    <Wrapper>
      <Header />
      <Container>
        <Content>{children}</Content>
      </Container>
      {seeProfileLoading === false && (seeProfileData?.seeProfile.user?.totalPhotos as number) < 7 && <Footer />}
    </Wrapper>
  );
};

export default MainLayout;
