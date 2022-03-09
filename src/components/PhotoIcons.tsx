import gql from "graphql-tag";
import styled, { keyframes } from "styled-components";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { BiMessageRounded } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useToggleLikePhotoMutation } from "../generated/graphql";
import { useRef } from "react";
import { ApolloCache } from "@apollo/client";

interface PhotoIconsProps {
  id?: number;
  isLiked?: boolean;
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

const PhotoIcons = ({ id, isLiked }: PhotoIconsProps) => {
  const likeButton = useRef<HTMLSpanElement>(null);
  const [toggleLikePhotoMutation, { loading: toggleLikePhotoLoading }] = useToggleLikePhotoMutation({
    update(cache: ApolloCache<any>, { data }) {
      if (data?.toggleLikePhoto.ok === false) {
        return;
      }

      const cachedFragment: any = cache.readFragment({
        id: `Photo:${id}`,
        fragment: gql`
          fragment photo on Photo {
            isLiked
            totalLikes
          }
        `,
      });
      cache.writeFragment({
        id: `Photo:${id}`,
        fragment: gql`
          fragment photo on Photo {
            isLiked
            totalLikes
          }
        `,
        data: {
          isLiked: !cachedFragment.isLiked,
          totalLikes: cachedFragment.isLiked === true ? cachedFragment.totalLikes - 1 : cachedFragment.totalLikes + 1,
        },
      });
    },
  });

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
  );
};

export default PhotoIcons;
