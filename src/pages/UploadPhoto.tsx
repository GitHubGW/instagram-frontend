import styled from "styled-components";
import Avatar from "../shared/Avatar";
import Loading from "../shared/Loading";
import Username from "../shared/Username";
import PageTitle from "../components/PageTitle";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { useNavigate, NavigateFunction } from "react-router";
import { useUploadPhotoMutation } from "../generated/graphql";
import { AnimatePresence, motion, Variants } from "framer-motion";

interface FormData {
  photo: FileList;
  text: string;
}

const modalVariants: Variants = {
  start: { opacity: 0, scale: 0.95, translateX: "-50%", translateY: "-50%" },
  end: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const ModalLikeBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalCloseButton = styled.button`
  position: fixed;
  top: 14px;
  right: 14px;
  font-size: 29px;
  font-weight: 100;
  border: none;
  outline: none;
  cursor: pointer;
  z-index: 200;
  color: white;
  background-color: transparent;
`;

const ModalBox = styled(motion.form)`
  max-width: 1100px;
  max-height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1100px;
  height: 800px;
  box-sizing: border-box;
  outline: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgContainerColor};
  overflow: hidden;
  z-index: 120;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 13px 0;
  border-bottom: 1px solid lightgray;

  h2 {
    font-weight: 500;
  }
  button {
    position: absolute;
    right: 10px;
    font-weight: bold;
    border: none;
    background-color: transparent;
    color: ${(props) => props.theme.activeColor};
    text-align: center;
    padding: 8px 0px;
    cursor: pointer;
  }
`;

const ModalMain = styled.div`
  display: flex;
  height: calc(100% - 40px);
`;

const ModalPhoto = styled.div`
  border-right: 1px solid lightgray;
  flex: 3;
  max-width: 780px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  overflow: hidden;

  label {
    color: lightgray;
    text-align: center;
    cursor: pointer;
  }
`;

const PhotoPreview = styled.img`
  width: 100%;
`;

const FileInput = styled.input`
  display: none;
`;

const ModalPhotoInfo = styled.div`
  flex: 1.1;
  max-width: 320px;
  padding: 15px;
  box-sizing: border-box;
  border-bottom: 1px solid lightgray;
  height: 240px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const Textarea = styled.textarea`
  margin-top: 10px;
  resize: none;
  outline: none;
  border: none;
  width: 100%;
  height: 160px;
  font-size: 15px;
  line-height: 1.5;
`;

const UploadPhoto = () => {
  const loggedInUser = useLoggedInUser();
  const navigate: NavigateFunction = useNavigate();
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const { register, handleSubmit, getValues, watch } = useForm<FormData>({ defaultValues: { text: "" } });
  const watchingPhotoFile: FileList = watch("photo");
  const [uploadPhotoMutation, { loading: uploadPhotoLoading }] = useUploadPhotoMutation({
    update: (cache, { data }) => {
      if (data?.uploadPhoto.ok === false) {
        return;
      }

      cache.modify({
        id: `User:${loggedInUser?.id}`,
        fields: {
          totalPhotos: (totalPhotos: number) => totalPhotos + 1,
          photos: (photos) => {
            const result = [{ __ref: `Photo:${data?.uploadPhoto.photo?.id}` }, ...photos];
            return result;
          },
        },
      });
      handleCloseModal();
    },
  });

  const handleCloseModal = (): void => {
    navigate(-1);
  };

  const onValid = (): void => {
    if (uploadPhotoLoading === true) {
      return;
    }
    const { photo, text } = getValues();
    uploadPhotoMutation({ variables: { photo: photo[0], caption: text } });
  };

  useEffect(() => {
    if (watchingPhotoFile && watchingPhotoFile.length > 0) {
      const photoFile: File = watchingPhotoFile[0];
      const objectUrl: string = URL.createObjectURL(photoFile);
      setPhotoPreview(objectUrl);
    }
  }, [watchingPhotoFile]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <PageTitle title="새 게시물 만들기" />
      <ModalLikeBackground onClick={handleCloseModal}></ModalLikeBackground>
      <AnimatePresence>
        <ModalCloseButton key={"ModalCloseButton"} onClick={handleCloseModal}>
          ✕
        </ModalCloseButton>
        <ModalBox onSubmit={handleSubmit(onValid)} variants={modalVariants} initial="start" animate="end" exit="exit">
          <ModalHeader>
            <h2>새 게시물 만들기</h2>
            <button type="submit" onClick={handleSubmit(onValid)}>
              {uploadPhotoLoading === true ? <Loading size="18px" /> : "공유하기"}
            </button>
          </ModalHeader>
          <ModalMain>
            <ModalPhoto>
              {photoPreview === "" ? (
                <label id="file">
                  <BiImageAdd size={80} />
                  <h3>사진 업로드</h3>
                  <FileInput {...register("photo")} type="file" accept="image/*" id="file" required />
                </label>
              ) : (
                <PhotoPreview src={photoPreview} alt="" />
              )}
            </ModalPhoto>
            <ModalPhotoInfo>
              <UserInfoContainer>
                <Avatar size="27px" avatarUrl={loggedInUser?.avatarUrl || "/images/basic_user.jpeg"} />
                <Username size="16px" textDecoration="none" username={loggedInUser?.username} />
              </UserInfoContainer>
              <Textarea
                {...register("text", { required: "100자 이내의 사진 문구를 입력해주세요.", minLength: 1, maxLength: 100 })}
                placeholder="사진 문구..."
                minLength={1}
                maxLength={100}
                cols={100}
                required
              />
            </ModalPhotoInfo>
          </ModalMain>
        </ModalBox>
      </AnimatePresence>
    </>
  );
};

export default UploadPhoto;
