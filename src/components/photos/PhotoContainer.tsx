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
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ScrollBox } from "../../shared/shared";
import Avatar from "../../shared/Avatar";
import { useSeeCommentsLazyQuery } from "../../generated/graphql";
import Name from "../../shared/Name";

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

const modalVariants: Variants = {
  start: { opacity: 0, scale: 0.95, translateX: "-50%", translateY: "-50%" },
  end: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

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

const ModalLikeBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalBox = styled(motion.div)`
  max-width: 1700px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95%;
  height: 85%;
  box-sizing: border-box;
  outline: none;
  border-radius: 0 5px 5px 0;
  background-color: ${(props) => props.theme.bgContainerColor};
  overflow: hidden;
  z-index: 120;
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

const ModalMain = styled(ScrollBox)`
  height: 100%;
`;

const ModalMainContent = styled.div`
  display: flex;
  margin-bottom: 10px;
  height: 100%;
`;

const ModalMainPhoto = styled.div`
  flex: 4;
  max-width: 1300px;
  max-height: 1300px;
  min-height: 450px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const ModalMainInfo = styled.div`
  flex: 1;
  min-width: 400px;
  max-width: 400px;
`;

const ModalMainUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 13px;
`;

const ModalMainUserInfoCaption = styled.div`
  display: flex;
  margin-left: 13px;
  margin-bottom: 0px;
  margin-top: 5px;

  p {
    margin-left: 6px;
    font-weight: 400;
    font-size: 15px;
  }
`;

const ModalMainInfoTop = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  padding: 15px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  a {
    display: flex;
    align-items: center;
  }
`;

const ModalMainInfoCenter = styled.div`
  padding: 15px;
  padding-top: 18px;
  height: calc(100% - 245px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
`;

const ModalMainInfoBottom = styled.div`
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const MainUserInfo = styled.div``;

const MainUserAvatar = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const ModalPhotoCommentInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
`;

const ModalUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;

  p {
    word-break: break-all;
  }
`;

const ModalPhotoComment = styled.div`
  margin-top: 8px;
  display: flex;

  p {
    word-break: break-all;
  }
`;

const PhotoContainer = ({ id, user, photoUrl, isLiked, totalLikes, totalComments, caption, comments, createdAt }: PhotoContainerProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [seeCommentsLazyQuery, { data: seeCommentsData, loading: seeCommentsLoading }] = useSeeCommentsLazyQuery();

  const handleSeePhotoDetail = (): void => {
    document.body.style.overflow = "hidden";
    setModalIsOpen(true);
    if (seeCommentsLoading === true) {
      return;
    }
    seeCommentsLazyQuery({ variables: { photoId: id as number } });
  };

  const handleCloseModal = (): void => {
    document.body.style.overflow = "auto";
    setModalIsOpen(false);
  };

  return (
    <Container>
      {modalIsOpen === true && <ModalLikeBackground onClick={handleCloseModal} />}
      <AnimatePresence>
        {modalIsOpen === true && <ModalCloseButton onClick={handleCloseModal}>✕</ModalCloseButton>}
        {modalIsOpen === true ? (
          <ModalBox variants={modalVariants} initial="start" animate="end" exit="exit">
            <ModalMain>
              <ModalMainContent>
                <ModalMainPhoto>
                  <img src={photoUrl} alt="" />
                </ModalMainPhoto>
                <ModalMainInfo>
                  <ModalMainInfoTop>
                    <Link to={`/users/${user?.username}`}>
                      <Avatar size="32px" avatarUrl={user?.avatarUrl} />
                      <ModalMainUserInfo>
                        <Username size="15px" username={user?.username} textDecoration={"false"} />
                        <Name size="13px" name={user?.name} />
                      </ModalMainUserInfo>
                    </Link>
                  </ModalMainInfoTop>
                  <ModalMainInfoCenter>
                    <MainUserInfo>
                      <MainUserAvatar>
                        <Link to={`/users/${user?.username}`}>
                          <Avatar size="32px" avatarUrl={user?.avatarUrl} />
                        </Link>
                        <ModalUserInfo>
                          <ModalMainUserInfoCaption>
                            <Link to={`/users/${user?.username}`}>
                              <Username size="15px" username={user?.username} textDecoration={"false"} />
                            </Link>
                            <p>{caption}</p>
                          </ModalMainUserInfoCaption>
                          <CreatedAt createdAt={createdAt} />
                        </ModalUserInfo>
                      </MainUserAvatar>
                      {seeCommentsData?.seeComments.comments?.map((comment) => (
                        <ModalPhotoComment key={comment?.id}>
                          <Link to={`/users/${comment?.user.username}`}>
                            <Avatar size="32px" avatarUrl={comment?.user.avatarUrl} />
                          </Link>
                          <ModalPhotoCommentInfo>
                            <ModalMainUserInfoCaption>
                              <Link to={`/users/${comment?.user.username}`}>
                                <Username size="15px" username={comment?.user?.username} textDecoration={"false"} />
                              </Link>
                              <p>{comment?.text}</p>
                            </ModalMainUserInfoCaption>
                            <CreatedAt createdAt={comment?.createdAt} />
                          </ModalPhotoCommentInfo>
                        </ModalPhotoComment>
                      ))}
                    </MainUserInfo>
                  </ModalMainInfoCenter>
                  <ModalMainInfoBottom>
                    <PhotoIcons id={id} isLiked={isLiked} />
                    <TotalLikes photoId={id} totalLikes={totalLikes} />
                    <CreatedAt createdAt={createdAt} />
                    <CommentForm photoId={id} position="top" />
                  </ModalMainInfoBottom>
                </ModalMainInfo>
              </ModalMainContent>
            </ModalMain>
          </ModalBox>
        ) : null}
      </AnimatePresence>
      <PhotoAuthor name={user?.name} username={user?.username} avatarUrl={user?.avatarUrl} />
      <PhotoImage photoUrl={photoUrl} handleSeePhotoDetail={handleSeePhotoDetail} />
      <PhotoIcons id={id} isLiked={isLiked} handleSeePhotoDetail={handleSeePhotoDetail} />
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
      <TotalComments totalComments={totalComments} handleSeePhotoDetail={handleSeePhotoDetail} />
      <CommentsContainer photoId={id} comments={comments} />
      <CreatedAt createdAt={createdAt} />
      <CommentForm photoId={id} position="bottom" />
    </Container>
  );
};

export default PhotoContainer;
