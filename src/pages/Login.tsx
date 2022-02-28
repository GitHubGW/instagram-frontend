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
  color: #385285;
  cursor: pointer;
  font-size: 18px;

  span {
    margin-left: 6px;
    font-weight: bold;
    font-size: 14px;
  }
`;

const Login = () => {
  return (
    <Container>
      <FormContent>
        <img src="/images/instagram_logo.png" alt="instagram_logo" />
        <Input placeholder="사용자 이름" />
        <Input placeholder="비밀번호" />
        <Button onClick={() => isLoggedInVar(true)} type="button">
          로그인
        </Button>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Facebook으로 로그인</span>
        </FacebookLogin>
      </FormContent>
      <AccountContent>
        <h1>
          계정이 없으신가요? <Link to={routes.signup}>가입하기</Link>
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

export default Login;
