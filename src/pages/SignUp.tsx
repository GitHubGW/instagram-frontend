import styled from "styled-components";
import FormError from "../shared/FormError";
import Separator from "../shared/Separator";
import AuthLayout from "../shared/AuthLayout";
import PageTitle from "../components/PageTitle";
import AppDownload from "../shared/AppDownload";
import { useForm } from "react-hook-form";
import { Button, Input } from "../shared/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate, NavigateFunction } from "react-router-dom";
import { CreateAccountMutation, useCreateAccountMutation } from "../generated/graphql";

interface FormData {
  email: string;
  name: string;
  username: string;
  password: string;
  createAccountResult?: string;
}

const Container = styled.section`
  max-width: ${(props) => props.theme.formMaxWidth};
  width: ${(props) => props.theme.formMaxWidth};
  text-align: center;
`;

const FormContent = styled.form`
  padding: 20px 40px 20px 40px;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.inputBgColor};

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
  background-color: ${(props) => props.theme.inputBgColor};

  h1 {
    font-size: 14px;
    a {
      font-weight: bold;
      color: ${(props) => props.theme.activeColor};
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
    onCompleted: ({ createAccount: { ok, message } }: CreateAccountMutation) => {
      if (ok === false) {
        return setError("createAccountResult", { message });
      }
      const { username, password } = getValues();
      navigate("/login", { state: { username, password, message: "??????????????? ?????????????????????. ??????????????????." } });
    },
  });

  const onValid = (): void => {
    if (createAccountLoading === true) {
      return;
    }
    const { email, name, username, password }: FormData = getValues();
    createAccountMutation({ variables: { email, name, username, password } });
  };

  return (
    <AuthLayout>
      <PageTitle title="????????????" />
      <Container>
        <FormContent onSubmit={handleSubmit(onValid)}>
          <img src="/images/instagram_logo.png" alt="instagram_logo" />
          <h1>???????????? ????????? ???????????? ????????? ???????????????.</h1>
          <FacebookLogin>
            <FontAwesomeIcon icon={faFacebookSquare} />
            <span>Facebook?????? ?????????</span>
          </FacebookLogin>
          <Separator />
          <Input
            {...register("email", {
              required: "???????????? ???????????????.",
              pattern: {
                message: "??????, ??????????????? ????????? ?????? ????????? ????????? ?????? ???????????????.",
                value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/gi,
              },
              maxLength: 30,
            })}
            hasError={Boolean(errors?.email?.message)}
            type="email"
            maxLength={30}
            placeholder="????????? ??????"
          />
          <FormError message={errors?.email?.message} />
          <Input
            {...register("name", {
              required: "????????? ???????????????.",
              maxLength: 15,
            })}
            hasError={Boolean(errors?.name?.message)}
            type="text"
            maxLength={15}
            placeholder="??????"
          />
          <FormError message={errors?.name?.message} />
          <Input
            {...register("username", {
              required: "????????? ????????? ???????????????.",
              pattern: { message: "??????, ??????????????? ????????? 1~15??? ?????? ????????? ?????? ???????????????.", value: /^[a-z0-9]{1,15}$/g },
              maxLength: 15,
            })}
            hasError={Boolean(errors?.username?.message)}
            type="text"
            maxLength={15}
            placeholder="????????? ??????"
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", { required: "??????????????? ???????????????.", maxLength: 15 })}
            hasError={Boolean(errors?.password?.message)}
            type="password"
            maxLength={15}
            placeholder="????????????"
          />
          <FormError message={errors?.password?.message} />
          <Button disabled={!isValid || createAccountLoading === true} type="submit">
            {createAccountLoading === true ? "?????????" : "??????"}
          </Button>
        </FormContent>
        <AccountContent>
          <h1>
            ????????? ???????????????? <Link to={"/login"}>?????????</Link>
          </h1>
        </AccountContent>
        <AppDownload />
      </Container>
    </AuthLayout>
  );
};

export default SignUp;
