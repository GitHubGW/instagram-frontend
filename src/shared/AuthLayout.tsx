import styled from "styled-components";
import Footer from "../components/Footer";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const Container = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

export default AuthLayout;
