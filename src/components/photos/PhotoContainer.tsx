import React from "react";
import styled from "styled-components";
import PhotoIcons from "./PhotoIcons";
import PhotoImage from "./PhotoImage";
import PhotoAuthor from "./PhotoAuthor";
import PhotoDetail from "./PhotoDetail";
import Username from "../../shared/Username";
import CreatedAt from "../../shared/CreatedAt";
import TotalLikes from "../../shared/TotalLikes";
import CommentForm from "../comments/CommentForm";
import TotalComments from "../../shared/TotalComments";
import CommentsContainer from "../comments/CommentsContainer";
import { AnimatePresence } from "framer-motion";
import { Link, useMatch, PathMatch, useNavigate, NavigateFunction } from "react-router-dom";

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
  padding-top: 5px;
  padding-bottom: 10px;
  overflow: hidden;
`;

const Caption = styled.span`
  margin-left: 5px;
  line-height: 1.2;

  a {
    color: ${(props) => props.theme.hashtagColor};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const PhotoContainer = ({ id, user, photoUrl, isLiked, totalLikes, totalComments, caption, comments, createdAt }: PhotoContainerProps) => {
  const navigate: NavigateFunction = useNavigate();
  const photoPathMath: PathMatch<"id"> | null = useMatch("/photos/:id");

  const handleOpenPhotoDetail = (id: number | undefined): void => {
    navigate(`/photos/${id}`);
  };

  return (
    <Container>
      <AnimatePresence>
        {photoPathMath && photoPathMath.params.id === String(id) && (
          <PhotoDetail id={id} user={user} photoUrl={photoUrl} isLiked={isLiked} totalLikes={totalLikes} caption={caption} createdAt={createdAt} />
        )}
      </AnimatePresence>
      <PhotoAuthor name={user?.name} username={user?.username} avatarUrl={user?.avatarUrl} />
      <PhotoImage photoUrl={photoUrl} handleSeePhotoDetail={() => handleOpenPhotoDetail(id)} />
      <PhotoIcons id={id} isLiked={isLiked} handleSeePhotoDetail={() => handleOpenPhotoDetail(id)} />
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
      <TotalComments totalComments={totalComments} handleOpenPhotoDetail={() => handleOpenPhotoDetail(id)} />
      <CommentsContainer photoId={id} comments={comments} />
      <CreatedAt createdAt={createdAt} />
      <CommentForm photoId={id} position="bottom" />
    </Container>
  );
};

export default PhotoContainer;
