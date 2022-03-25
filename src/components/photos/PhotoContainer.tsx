import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CreatedAt from "../../shared/CreatedAt";
import Username from "../../shared/Username";
import TotalLikes from "../../shared/TotalLikes";
import TotalComments from "../../shared/TotalComments";
import CommentForm from "../comments/CommentForm";
import CommentsContainer from "../comments/CommentsContainer";
import PhotoIcons from "./PhotoIcons";
import PhotoAuthor from "./PhotoAuthor";
import PhotoImage from "./PhotoImage";
import PhotoDetail from "./PhotoDetail";

interface PhotoContainerProps {
  id?: number;
  user?: { name?: string | null; username: string; avatarUrl?: string | null };
  photoUrl?: string;
  isLiked?: boolean;
  totalLikes?: number;
  totalComments?: number;
  caption?: string | null;
  comments?: any;
  createdAt?: string;
}

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgContainerColor};
  margin-bottom: 20px;
`;

const CaptionContainer = styled.div`
  padding: 12px 15px;
  padding-top: 0;
  padding-bottom: 10px;
`;

const Caption = styled.span`
  margin-left: 5px;

  a {
    color: ${(props) => props.theme.hashtagColor};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const PhotoContainer = ({ id, user, photoUrl, isLiked, totalLikes, totalComments, caption, comments, createdAt }: PhotoContainerProps) => {
  const [photoDetailModalIsOpen, setPhotoDetailModalIsOpen] = useState<boolean>(false);

  const handleOpenPhotoDetailModal = (): void => {
    document.body.style.overflow = "hidden";
    setPhotoDetailModalIsOpen(true);
  };

  return (
    <Container>
      {photoDetailModalIsOpen === true && (
        <PhotoDetail
          photoDetailModalIsOpen={photoDetailModalIsOpen}
          setPhotoDetailModalIsOpen={setPhotoDetailModalIsOpen}
          id={id}
          user={user}
          photoUrl={photoUrl}
          isLiked={isLiked}
          totalLikes={totalLikes}
          caption={caption}
          createdAt={createdAt}
        />
      )}
      <PhotoAuthor name={user?.name} username={user?.username} avatarUrl={user?.avatarUrl} />
      <PhotoImage photoUrl={photoUrl} handleSeePhotoDetail={handleOpenPhotoDetailModal} />
      <PhotoIcons id={id} isLiked={isLiked} handleSeePhotoDetail={handleOpenPhotoDetailModal} />
      <TotalLikes photoId={id} totalLikes={totalLikes} />
      <CaptionContainer>
        <Link to={`/users/${user?.username}`}>
          <Username username={user?.username} size="15px" textDecoration={"true"} />
        </Link>
        <Caption>
          {caption?.split(" ").map((word: string, index: number) =>
            /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) === true ? (
              <Link key={index} to={`/hashtags/${word.replace("#", "")}`}>
                {word}{" "}
              </Link>
            ) : /@[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) === true ? (
              <Link key={index} to={`/users/${word.replace("@", "")}`}>
                {word}{" "}
              </Link>
            ) : (
              <React.Fragment key={index}>{word} </React.Fragment>
            )
          )}
        </Caption>
      </CaptionContainer>
      <TotalComments totalComments={totalComments} handleSeePhotoDetail={handleOpenPhotoDetailModal} />
      <CommentsContainer photoId={id} comments={comments} />
      <CreatedAt createdAt={createdAt} />
      <CommentForm photoId={id} position="bottom" />
    </Container>
  );
};

export default PhotoContainer;
