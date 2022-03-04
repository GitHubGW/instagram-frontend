import { Link, useNavigate, NavigateFunction } from "react-router-dom";
import styled from "styled-components";
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
import { useCreateAccountMutation } from "../generated/graphql";

interface FormData {
  email: string;
  name: string;
  username: string;
  password: string;
  createAccountResult?: string;
}

const Container = styled.section`
  max-width: 350px;
  width: 350px;
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
  const navigate: NavigateFunction = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });
  const [createAccountMutation, { loading: createAccountLoading }] = useCreateAccountMutation({
    onCompleted: ({ createAccount: { ok, message } }) => {
      if (ok === false) {
        return setError("createAccountResult", { message });
      }
      const { username, password } = getValues();
      navigate(routes.login, { state: { username, password, message: "회원가입에 성공하였습니다. 로그인하세요." } });
    },
  });

  const onValid = (): void => {
    const { email, name, username, password }: FormData = getValues();
    if (createAccountLoading === true) {
      return;
    }
    createAccountMutation({ variables: { email, name, username, password } });
  };

  return (
    <AuthLayout>
      <PageTitle title="회원가입" />
      <Container>
        <FormContent onSubmit={handleSubmit(onValid)}>
          <img src="/images/instagram_logo.png" alt="instagram_logo" />
          <h1>친구들의 사진과 동영상을 보려면 가입하세요.</h1>
          <FacebookLogin>
            <FontAwesomeIcon icon={faFacebookSquare} />
            <span>Facebook으로 로그인</span>
          </FacebookLogin>
          <Separator />
          <Input
            {...register("email", {
              required: "이메일을 입력하세요.",
              pattern: {
                message: "한글, 특수문자를 제외한 영문 이메일 형식만 사용 가능합니다.",
                value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/gi,
              },
              maxLength: 30,
            })}
            hasError={Boolean(errors?.email?.message)}
            type="email"
            maxLength={30}
            placeholder="이메일 주소"
          />
          <FormError message={errors?.email?.message} />
          <Input
            {...register("name", {
              required: "성명을 입력하세요.",
              maxLength: 15,
            })}
            hasError={Boolean(errors?.name?.message)}
            type="text"
            maxLength={15}
            placeholder="성명"
          />
          <FormError message={errors?.name?.message} />
          <Input
            {...register("username", {
              required: "사용자 이름을 입력하세요.",
              pattern: { message: "한글, 특수문자를 제외한 1~15자 이내 영문만 사용 가능합니다.", value: /^[a-z0-9]{1,15}$/g },
              maxLength: 15,
            })}
            hasError={Boolean(errors?.username?.message)}
            type="text"
            maxLength={15}
            placeholder="사용자 이름"
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", { required: "비밀번호를 입력하세요.", maxLength: 15 })}
            hasError={Boolean(errors?.password?.message)}
            type="password"
            maxLength={15}
            placeholder="비밀번호"
          />
          <FormError message={errors?.password?.message} />
          <Button disabled={!isValid || createAccountLoading === true} type="submit">
            {createAccountLoading === true ? "로딩중" : "가입"}
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
    </AuthLayout>
  );
};

export default SignUp;
