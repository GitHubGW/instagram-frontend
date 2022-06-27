import styled, { keyframes } from "styled-components";
import { useRef } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { BiMessageRounded } from "react-icons/bi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { SEE_PHOTO_LIKES } from "../../documents/queries/seePhotoLikes.query";
import { useSeePhotoLikesLazyQuery, useToggleLikePhotoMutation } from "../../generated/graphql";

interface PhotoIconsProps {
  id?: number;
  isLiked?: boolean;
  handleSeePhotoDetail?: () => void;
}

const likeAnimation = keyframes`
  0% {
    opacity:1;
    transform:scale(1);
  }
  15% {
    opacity:0.9;
    transform:scale(1.3);
  }
  30% {
    transform:scale(.95);
  }
  45%, 80% {
    opacity:0.9;
    transform:scale(1);
  }
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 15px;
  padding-bottom: 0;
  font-size: 28px;

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

const PhotoIcons = ({ id, isLiked, handleSeePhotoDetail }: PhotoIconsProps) => {
  const likeButton = useRef<HTMLSpanElement>(null);
  const [seePhotoLikesLazyQuery, { loading: seePhotoLikesLoading }] = useSeePhotoLikesLazyQuery();
  const [toggleLikePhotoMutation, { loading: toggleLikePhotoLoading }] = useToggleLikePhotoMutation({
    update(cache, { data }) {
      if (data?.toggleLikePhoto.ok === false) {
        return;
      }

      cache.modify({
        id: `Photo:${id}`,
        fields: {
          isLiked: (isLiked: boolean): boolean => !isLiked,
          totalLikes: (totalLikes: number): number => (isLiked === true ? totalLikes - 1 : totalLikes + 1),
        },
      });
    },
    refetchQueries: [{ query: SEE_PHOTO_LIKES, variables: { photoId: id } }],
  });

  const handleToggleLikePhoto = (isLiked: boolean | undefined) => {
    if (toggleLikePhotoLoading === true || seePhotoLikesLoading === true) {
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
    <Icons>
      <div>
        <LikeButton ref={likeButton} onClick={() => handleToggleLikePhoto(isLiked)}>
          {isLiked === true ? <AiFillHeart style={{ color: "rgb(237, 73, 86)" }} /> : <AiOutlineHeart />}
        </LikeButton>
        <BiMessageRounded onClick={handleSeePhotoDetail} />
        <IoPaperPlaneOutline />
      </div>
      <div>
        <FaRegBookmark />
      </div>
    </Icons>
  );
};

export default PhotoIcons;
