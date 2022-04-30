import styled from "styled-components";
import UploadPhoto from "./UploadPhoto";
import Footer from "../components/Footer";
import FormError from "../shared/FormError";
import MainLayout from "../shared/MainLayout";
import PageTitle from "../components/PageTitle";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { handleLogout } from "../apollo";
import { useForm } from "react-hook-form";
import { Input } from "../shared/shared";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SEE_ME } from "../documents/queries/seeMe.query";
import { ApolloClient, useApolloClient } from "@apollo/client";
import { NavigateFunction, PathMatch, useMatch, useNavigate, useParams } from "react-router";
import { EditProfileMutation, useDeleteAccountMutation, useEditProfileMutation } from "../generated/graphql";

type EditProfileParams = {
  username: string;
};

interface FormData {
  name: string;
  username?: string;
  email: string;
  password: string;
  bio?: string;
  avatar: FileList;
  editProfileResult?: string;
}

const Container = styled.section`
  margin-top: 130px;
  display: flex;
  justify-content: center;
  height: 100%;
`;

const Button = styled.button`
  border: none;
  outline: none;
  background-color: ${(props) => props.theme.activeColor};
  padding: 9px 20px;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

const ChangeAvatarButton = styled(Button).attrs({ as: "span" })`
  margin-left: 10px;
`;

const EditProfileButton = styled(Button)`
  background-color: ${(props) => (props.disabled ? props.theme.inactiveColor : props.theme.activeColor)};
`;

const DeleteAccountButton = styled(Button)`
  background-color: ${(props) => props.theme.errorColor};
  margin-left: 3px;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  cursor: pointer;
  border-radius: 50%;
`;

const EditProfileForm = styled.form`
  padding: 80px 75px;
  padding-top: 45px;
  max-width: 450px;
  width: 450px;
  background-color: ${(props) => props.theme.bgContainerColor};
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  label:first-child {
    display: flex;
    align-items: end;
    margin-bottom: 30px;
  }
  label {
    font-size: 14px;
    display: block;
    margin-bottom: 15px;
    color: ${(props) => props.theme.textColor};

    span {
      margin-bottom: 5px;
      display: block;
    }
  }
  input {
    background-color: ${(props) => props.theme.inputBgColor};
  }
`;

const EditProfile = () => {
  const client: ApolloClient<object> = useApolloClient();
  const { username } = useParams<EditProfileParams>();
  const navigate: NavigateFunction = useNavigate();
  const uploadPhotoPathMath: PathMatch<"username"> | null = useMatch(`/users/:username/edit/photos/upload`);
  const loggedInUser = useLoggedInUser();
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      email: loggedInUser?.email || "",
      name: loggedInUser?.name || "",
      username: loggedInUser?.username || username,
      password: "",
      bio: loggedInUser?.bio || "",
    },
  });
  const watchingAvatarFile: FileList = watch("avatar");
  const [deleteAccountMutation, { loading: deleteAccountLoading }] = useDeleteAccountMutation({
    onCompleted: () => {
      handleLogout(client);
      navigate("/signup");
    },
  });
  const [editProfileMutation, { loading: editProfileLoading }] = useEditProfileMutation({
    onCompleted: ({ editProfile: { ok } }: EditProfileMutation) => {
      if (ok === false) {
        return;
      }
      const { username } = getValues();
      navigate(`/users/${username}`);
    },
    refetchQueries: [{ query: SEE_ME }],
  });

  const handleDeleteAccount = (): void => {
    if (deleteAccountLoading === true) {
      return;
    }

    const isConfirm: boolean = window.confirm("계정을 탈퇴하시겠습니까?");
    if (isConfirm === true) {
      deleteAccountMutation({ variables: { userId: loggedInUser?.id as number } });
    }
    return;
  };

  const onValid = (): void => {
    if (editProfileLoading === true) {
      return;
    }
    const { email, name, username, password, bio, avatar } = getValues();
    editProfileMutation({
      variables: {
        email: email === "" ? undefined : email,
        name: name === "" ? undefined : name,
        username: username === "" ? undefined : username,
        password: password === "" ? undefined : password,
        bio: bio === "" ? undefined : bio,
        avatar: avatar ? avatar[0] : undefined,
      },
    });
  };

  useEffect(() => {
    if (watchingAvatarFile && watchingAvatarFile.length > 0) {
      const avatarFile: File = watchingAvatarFile[0];
      const objectUrl: string = URL.createObjectURL(avatarFile);
      setAvatarPreview(objectUrl);
    }
  }, [watchingAvatarFile]);

  useEffect(() => {
    if (username !== loggedInUser?.username) {
      navigate("/");
    }
  });

  return (
    <MainLayout>
      <AnimatePresence>{uploadPhotoPathMath && <UploadPhoto />}</AnimatePresence>
      <PageTitle title={"프로필 편집"} />
      <Container>
        <EditProfileForm onSubmit={handleSubmit(onValid)} method="POST" encType="multipart/form-data">
          <label htmlFor="avatar">
            {avatarPreview === "" ? <Avatar src={loggedInUser?.avatarUrl || "/images/basic_user.jpeg"} alt="" /> : <Avatar src={avatarPreview} alt="" />}
            <ChangeAvatarButton>프로필 사진 변경</ChangeAvatarButton>
            <input {...register("avatar")} id="avatar" type="file" accept="image/*" style={{ display: "none" }} />
          </label>
          <label htmlFor="email">
            <span>이메일</span>
            <Input
              {...register("email", {
                pattern: {
                  message: "한글, 특수문자를 제외한 영문 이메일 형식만 사용 가능합니다.",
                  value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/gi,
                },
                maxLength: 30,
              })}
              hasError={Boolean(errors?.email?.message)}
              id="email"
              type="email"
              maxLength={30}
              placeholder="이메일 주소"
            />
            <FormError message={errors?.email?.message} />
          </label>
          <label htmlFor="name">
            <span>이름</span>
            <Input {...register("name", { maxLength: 15 })} hasError={Boolean(errors.name?.message)} id="name" type="text" maxLength={15} placeholder="이름" />
            <FormError message={errors?.name?.message} />
          </label>
          <label htmlFor="username">
            <span>사용자 이름</span>
            <Input
              {...register("username", {
                maxLength: 15,
                pattern: { message: "한글, 특수문자를 제외한 1~15자 이내 영문만 사용 가능합니다.", value: /^[a-z0-9]{1,15}$/g },
              })}
              onFocus={() => clearErrors("editProfileResult")}
              hasError={Boolean(errors?.username?.message)}
              id="username"
              type="text"
              maxLength={15}
              placeholder="사용자 이름"
            />
            <FormError message={errors?.username?.message} />
          </label>
          <label htmlFor="password">
            <span>비밀번호</span>
            <Input {...register("password", { maxLength: 15 })} hasError={Boolean(errors?.password?.message)} id="password" type="password" maxLength={15} placeholder="비밀번호" />
            <FormError message={errors?.password?.message} />
          </label>
          <label htmlFor="bio">
            <span>소개</span>
            <Input {...register("bio", { maxLength: 100 })} id="bio" type="text" maxLength={100} placeholder="소개" />
          </label>
          <div>
            <EditProfileButton disabled={!isValid} onClick={handleSubmit(onValid)} type="submit">
              프로필 수정
            </EditProfileButton>
            <DeleteAccountButton onClick={handleDeleteAccount} type="button">
              계정 탈퇴
            </DeleteAccountButton>
          </div>
        </EditProfileForm>
      </Container>
      <Footer />
    </MainLayout>
  );
};

export default EditProfile;
