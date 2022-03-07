import styled, { keyframes } from "styled-components";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { BiMessageRounded } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import CreatedAt from "../shared/CreatedAt";
import { VscSmiley } from "react-icons/vsc";
import { Link } from "react-router-dom";
import Username from "../shared/Username";
import Avatar from "../shared/Avatar";
import { useForm } from "react-hook-form";
import { useToggleLikePhotoMutation } from "../generated/graphql";
import { useRef } from "react";
import Name from "../shared/Name";

interface PhotoContainerProps {
  id?: number;
  user?: { name?: string | null; username: string; avatarUrl?: string | null };
  photoUrl?: string;
  isLiked?: boolean;
  totalLikes?: number;
  caption?: string | null;
  createdAt?: string;
}

interface FormData {
  text: string;
}

const likeAnimation = keyframes`
  0% {
    opacity:1;
    transform:scale(1);
  }
  15% {
    opacity:0.9;
    transform:scale(1.2);
  }
  30% {
    transform:scale(.95);
  }
  45%, 80% {
    opacity:0.9;
    transform:scale(1);
  }
`;

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgContainerColor};
  margin-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;

  a:last-child {
    display: flex;
    flex-direction: column;
  }
  span {
    margin-left: 12px;
  }
`;

const ImageContainer = styled.div`
  font-size: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 750px;
  cursor: pointer;
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  font-size: 25px;

  div {
    display: flex;
    svg {
      margin-right: 15px;
      cursor: pointer;
      &:last-child {
        margin-right: 0px;
      }
    }
    &:last-child {
      font-size: 22px;
    }
  }
`;

const LikeButton = styled.span`
  margin-right: 15px;

  &.animation {
    animation-name: ${likeAnimation};
    animation-duration: 1000ms;
    animation-timing-function: ease-in-out;
  }
`;

const LikeNumber = styled.h1`
  padding: 12px;
  font-weight: bold;
  font-size: 14px;
`;

const CaptionContainer = styled.div`
  padding: 12px;
  padding-top: 0;
`;

const Caption = styled.span`
  margin-left: 10px;
`;

const CreatedAtContainer = styled.div`
  padding: 12px;
  padding-top: 0;
`;

const CommentForm = styled.form`
  border-top: 1px solid #f5f5f5;
  padding: 12px;
  display: flex;
`;

const CommentFormEmoji = styled.div`
  margin-right: 10px;

  svg {
    font-size: 25px;
    cursor: pointer;
  }
`;

const CommentFormInput = styled.input`
  padding-left: 10px;
  margin-right: auto;
  font-size: 14px;
  width: 86%;

  &::placeholder {
    font-size: 14px;
    color: ${(props) => props.theme.grayTextColor};
  }
`;

const CommentButton = styled.button`
  color: ${(props) => (props.disabled === true ? props.theme.inactiveColor : props.theme.activeColor)};
  font-size: 14px;
  font-weight: bold;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
`;

const PhotoContainer = ({ id, user, photoUrl, isLiked, totalLikes, caption, createdAt }: PhotoContainerProps) => {
  const likeButton = useRef<HTMLSpanElement>(null);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm<FormData>({ mode: "onChange", defaultValues: { text: "" } });
  const [toggleLikePhotoMutation, { loading: toggleLikePhotoLoading }] = useToggleLikePhotoMutation();

  const onValid = () => {
    const { text } = getValues();
    console.log("text", text);
  };

  const handleToggleLike = (isLiked: boolean | undefined) => {
    if (toggleLikePhotoLoading === true) {
      return;
    }

    if (likeButton.current) {
      if (isLiked === false) {
        likeButton.current.classList.add("animation");
      } else if (isLiked === true) {
        likeButton.current.classList.remove("animation");
      }
    }

    toggleLikePhotoMutation({ variables: { photoId: id as number } });
  };

  return (
    <Container>
      <Header>
        <Link to={`/users/${user?.username}`}>
          <Avatar size="37px" avatarUrl={user?.avatarUrl} />
        </Link>
        <Link to={`/users/${user?.username}`}>
          <Username username={user?.username} size="14px" />
          {user?.name && <Name name={user?.name} size="12px" />}
        </Link>
      </Header>
      <ImageContainer>
        <Image src={photoUrl} alt="" />
      </ImageContainer>
      <Icons>
        <div>
          <LikeButton ref={likeButton} onClick={() => handleToggleLike(isLiked)}>
            {isLiked === true ? <AiFillHeart style={{ color: "rgb(237, 73, 86)" }} /> : <AiOutlineHeart />}
          </LikeButton>
          <BiMessageRounded />
          <IoPaperPlaneOutline />
        </div>
        <div>
          <FaRegBookmark />
        </div>
      </Icons>
      <LikeNumber>좋아요 {totalLikes?.toLocaleString("ko-KR")}개</LikeNumber>
      <CaptionContainer>
        <Link to={`/users/${user?.username}`}>
          <Username username={user?.username} size="15px" />
        </Link>
        <Caption>{caption}</Caption>
      </CaptionContainer>
      <CreatedAtContainer>
        <CreatedAt createdAt={createdAt} />
      </CreatedAtContainer>
      <CommentForm onSubmit={handleSubmit(onValid)}>
        <CommentFormEmoji>
          <VscSmiley />
        </CommentFormEmoji>
        <CommentFormInput
          {...register("text", { required: "댓글을 입력해주세요.", minLength: 1, maxLength: 70 })}
          type="text"
          minLength={1}
          maxLength={70}
          placeholder="댓글 달기..."
        />
        <CommentButton type="submit" disabled={!isValid}>
          게시
        </CommentButton>
      </CommentForm>
    </Container>
  );
};

export default PhotoContainer;
