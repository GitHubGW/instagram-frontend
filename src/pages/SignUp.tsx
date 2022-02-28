import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import routes from "../routes";
import Button from "../shared/Button";
import Input from "../shared/Input";
import Separator from "../shared/Separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

const Container = styled.section`
  max-width: 350px;
  width: 100%;
  text-align: center;
`;

const FormContent = styled.div`
  padding: 20px 40px 20px 40px;
  border: 1px solid ${(props) => props.theme.borderColor};

  img {
    width: 175px;
    margin-bottom: 30px;
  }
  h1 {
    font-size: 15px;
    margin-bottom: 20px;
    color: ${(props) => props.theme.grayTextColor};
  }
`;

const AccountContent = styled.div`
  margin-top: 10px;
  padding: 25px 0;
  text-align: center;
  border: 1px solid ${(props) => props.theme.borderColor};

  h1 {
    font-size: 14px;
    a {
      font-weight: bold;
      color: ${(props) => props.theme.activeColor};
    }
  }
`;

const AppContent = styled.div`
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

const FacebookLogin = styled.div`
  background-color: ${(props) => props.theme.activeColor};
  color: white;
  padding: 7px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 18px;

  span {
    margin-left: 6px;
    font-weight: bold;
    font-size: 14px;
  }
`;

const SignUp = () => {
  return (
    <Container>
      <FormContent>
        <img src="/images/instagram_logo.png" alt="instagram_logo" />
        <h1>친구들의 사진과 동영상을 보려면 가입하세요.</h1>
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Facebook으로 로그인</span>
        </FacebookLogin>
        <Separator />
        <Input placeholder="이메일 주소" />
        <Input placeholder="성명" />
        <Input placeholder="사용자 이름" />
        <Input placeholder="비밀번호" />
        <Button onClick={() => isLoggedInVar(true)} type="button">
          가입
        </Button>
      </FormContent>
      <AccountContent>
        <h1>
          계정이 있으신가요? <Link to={routes.login}>로그인</Link>
        </h1>
      </AccountContent>
      <AppContent>
        <h1>앱을 다운로드하세요.</h1>
        <div>
          <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo" target="_blank" rel="noreferrer">
            <img src="/images/apple_store_download.png" alt="apple_store_download" />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.instagram.android" target="_blank" rel="noreferrer">
            <img src="/images/google_play_download.png" alt="google_play_download" />
          </a>
        </div>
      </AppContent>
    </Container>
  );
};

export default SignUp;
