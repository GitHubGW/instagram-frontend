import styled from "styled-components";

const Container = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
`;

const Content = styled.div`
  margin: 0 auto;
  max-width: 650px;
  width: 650px;
  display: flex;
  flex-direction: column;
  margin-bottom: 35px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;

  a {
    color: ${(props) => props.theme.grayTextColor};
    font-size: 12px;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;

  span {
    color: ${(props) => props.theme.grayTextColor};
    font-size: 12px;
    &:first-child {
      margin-right: 10px;
    }
  }
`;

const Footer = () => {
  return (
    <Container>
      <Content>
        <Nav>
          <a href="https://about.facebook.com/meta" target="_blank" rel="noreferrer">
            Meta
          </a>
          <a href="https://about.instagram.com" target="_blank" rel="noreferrer">
            소개
          </a>
          <a href="https://about.instagram.com/blog" target="_blank" rel="noreferrer">
            블로그
          </a>
          <a href="https://about.instagram.com/about-us/careers" target="_blank" rel="noreferrer">
            채용 정보
          </a>
          <a href="https://help.instagram.com" target="_blank" rel="noreferrer">
            도움말
          </a>
          <a href="https://developers.facebook.com/docs/instagram" target="_blank" rel="noreferrer">
            API
          </a>
          <a href="https://help.instagram.com/519522125107875/?maybe_redirect_pol=0" target="_blank" rel="noreferrer">
            개인정보처리방침
          </a>
          <a href="https://help.instagram.com/581066165581870" target="_blank" rel="noreferrer">
            약관
          </a>
          <a href="https://www.instagram.com/directory/profiles" target="_blank" rel="noreferrer">
            인기 계정
          </a>
          <a href="https://www.instagram.com/directory/hashtags" target="_blank" rel="noreferrer">
            해시태그
          </a>
          <a href="https://www.instagram.com/explore/locations" target="_blank" rel="noreferrer">
            위치
          </a>
          <a href="https://www.instagram.com/web/lite" target="_blank" rel="noreferrer">
            Instagram Lite
          </a>
        </Nav>
        <Info>
          <span>한국어</span>
          <span>© {new Date().getFullYear()} Instagram from Meta</span>
        </Info>
      </Content>
    </Container>
  );
};

export default Footer;
