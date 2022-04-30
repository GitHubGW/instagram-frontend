import styled from "styled-components";
import { Link } from "react-router-dom";
import { HiOutlineHashtag } from "react-icons/hi";

interface SearchHashtagProps {
  name?: string | null;
  totalPhotos?: number | null;
}

const SearchHashtagInfo = styled.div`
  h2 {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 5px;
  }
  h3 {
    font-size: 15px;
  }
`;

const HashtagIcon = styled.div`
  width: 47px;
  height: 47px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-right: 13px;
`;

const SearchHashtag = ({ name, totalPhotos }: SearchHashtagProps) => {
  return (
    <Link to={`/hashtags/${name?.replaceAll("#", "")}`}>
      <HashtagIcon>
        <HiOutlineHashtag />
      </HashtagIcon>
      <SearchHashtagInfo>
        <h2>{name}</h2>
        <h3>게시물 {totalPhotos}</h3>
      </SearchHashtagInfo>
    </Link>
  );
};

export default SearchHashtag;
