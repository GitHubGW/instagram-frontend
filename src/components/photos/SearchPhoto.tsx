import styled from "styled-components";
import Avatar from "../../shared/Avatar";
import Username from "../../shared/Username";
import { Link } from "react-router-dom";

interface SearchPhotoProps {
  id?: number;
  photoUrl?: string | null;
  user?: any;
  totalLikes?: number | null;
  totalComments?: number | null;
}

const SearchPhotoInfo = styled.div`
  ul {
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    font-size: 14px;
    span {
      margin-right: 10px;
    }
  }
`;

const SearchPhoto = ({ id, photoUrl, user, totalLikes, totalComments }: SearchPhotoProps) => {
  return (
    <Link to={`/photos/${id}`}>
      <Avatar size="47px" avatarUrl={photoUrl} />
      <SearchPhotoInfo>
        <Username size="15px" username={user.username} textDecoration={"false"} />
        <ul>
          <span>좋아요 {totalLikes}</span>
          <span>댓글 {totalComments}</span>
        </ul>
      </SearchPhotoInfo>
    </Link>
  );
};

export default SearchPhoto;
