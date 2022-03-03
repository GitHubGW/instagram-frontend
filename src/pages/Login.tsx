import { Link, useNavigate, NavigateFunction } from "react-router-dom";
import styled from "styled-components";
import { handleLogin, isLoggedInVar } from "../apollo";
import routes from "../routes";
import Button from "../shared/Button";
import Input from "../shared/Input";
import Separator from "../shared/Separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import AuthLayout from "../shared/AuthLayout";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../shared/FormError";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

interface FormData {
  username: string;
  password: string;
  loginResult?: string;
}

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      message
      token
    }
  }
`;

const Container = styled.section`
  max-width: 350px;
  width: 100%;
  text-align: center;
`;

const FormContent = styled.form`
  padding: 20px 40px 20px 40px;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: white;

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
  background-color: white;

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
  const navigate: NavigateFunction = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });
  const [loginMutation, { loading: loginLoading }] = useMutation(LOGIN, {
    onCompleted: (data: any) => {
      console.log("data", data);
      const {
        login: { ok, message, token },
      } = data;

      if (ok === false) {
        return setError("loginResult", { message });
      }
      if (ok === true && token) {
        handleLogin(token);
        navigate(routes.home);
      }
    },
  });

  const onValid = (): void => {
    const { username, password }: FormData = getValues();

    if (loginLoading === true) {
      return;
    }

    loginMutation({ variables: { username, password } });
  };

  return (
    <AuthLayout>
      <PageTitle title="로그인" />
      <Container>
        <FormContent onSubmit={handleSubmit(onValid)}>
          <img src="/images/instagram_logo.png" alt="instagram_logo" />
          <Input
            {...register("username", {
              required: "사용자 이름을 입력하세요.",
              pattern: { message: "한글, 특수문자를 제외한 1~15자 이내 영문만 사용 가능합니다.", value: /^[a-z0-9]{1,15}$/g },
              maxLength: 15,
              validate: (value) => {
                return true;
              },
            })}
            onFocus={() => clearErrors("loginResult")}
            hasError={Boolean(errors?.username?.message)}
            type="text"
            maxLength={15}
            placeholder="사용자 이름"
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", { required: "비밀번호를 입력하세요.", maxLength: 15 })}
            onKeyDown={() => clearErrors("loginResult")}
            hasError={Boolean(errors?.password?.message)}
            type="password"
            maxLength={15}
            placeholder="비밀번호"
          />
          <FormError message={errors?.password?.message} />
          <Button disabled={!isValid || loginLoading === true} type="submit">
            {loginLoading === true ? "로딩중" : "로그인"}
          </Button>
          <FormError message={errors?.loginResult?.message} />
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
    </AuthLayout>
  );
};

export default Login;
