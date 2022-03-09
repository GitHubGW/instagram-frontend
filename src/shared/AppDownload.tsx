import styled from "styled-components";

const Container = styled.div`
  margin-top: 25px;
  text-align: center;

  h1 {
    font-size: 14px;
    margin-bottom: 20px;
  }
  div {
    display: flex;
    justify-content: center;
    a {
      margin: 0 3px;
    }
    img {
      width: 135px;
      height: 40px;
    }
  }
`;

const AppDownload = () => {
  return (
    <Container>
      <h1>앱을 다운로드하세요.</h1>
      <div>
        <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo" target="_blank" rel="noreferrer">
          <img src="/images/apple_store_download.png" alt="apple_store_download" />
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.instagram.android" target="_blank" rel="noreferrer">
          <img src="/images/google_play_download.png" alt="google_play_download" />
        </a>
      </div>
    </Container>
  );
};

export default AppDownload;
