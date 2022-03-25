import { useParams } from "react-router";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import { useSeeHashtagQuery } from "../generated/graphql";
import Avatar from "../shared/Avatar";
import { BsHeartFill } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import MainLayout from "../shared/MainLayout";

type HashtagParams = {
  name: string;
};

const Container = styled.section`
  margin-top: 58px;
`;

const HashtagHeader = styled.div`
  padding: 30px 0px;
  padding-bottom: 40px;
  display: flex;
`;

const HashtagImage = styled.div`
  flex: 1;
  display: flex;

  img {
    cursor: pointer;
  }
`;

const HashtagInfo = styled.div`
  flex: 3.7;
  padding-top: 15px;
`;

const HashtagName = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-weight: 300;

  span {
    font-size: 30px;
  }
`;

const HashtagPost = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 400;

  span {
    cursor: pointer;

    strong {
      font-weight: 700;
    }
  }
  span:first-child {
    cursor: auto;
  }
`;

const HashtagMain = styled.div`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  justify-content: flex-start;
  max-width: 940px;
  width: 940px;
  flex-wrap: wrap;
  gap: 20px;
  padding: 30px 0px;
`;

const HashtagPhoto = styled.div`
  position: relative;
  cursor: pointer;

  img {
    width: 300px;
    height: 300px;
    vertical-align: top;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  &:hover {
    opacity: 1;
  }
`;

const HashtagPhotoIcons = styled.div`
  display: flex;

  span {
    font-weight: bold;
    font-size: 18px;
    display: flex;
    align-items: center;
    margin-right: 30px;
    font-size: 18px;

    &:last-child {
      margin-right: 0px;
    }

    svg {
      margin-right: 10px;
    }
  }
`;

const Hashtag = () => {
  const { name } = useParams<HashtagParams>();
  const { data: seeHashtagData, loading: seeHashtagLoading } = useSeeHashtagQuery({ variables: { name: `#${name}` } });

  return (
    <MainLayout>
      <PageTitle title={`#${name} 해시태그`} />
      {seeHashtagLoading === false ? (
        <Container>
          <HashtagHeader>
            <HashtagImage>
              <Avatar
                avatarUrl={(seeHashtagData?.seeHashtag.hashtag?.photos && seeHashtagData?.seeHashtag.hashtag?.photos[0]?.photoUrl) || "/images/basic_hashtag.png"}
                size="155px"
              />
            </HashtagImage>
            <HashtagInfo>
              <HashtagName>
                <span>#{name}</span>
              </HashtagName>
              <HashtagPost>
                <span>
                  게시물 <strong>{seeHashtagData?.seeHashtag.hashtag?.totalPhotos}</strong>
                </span>
              </HashtagPost>
            </HashtagInfo>
          </HashtagHeader>
          <HashtagMain>
            {seeHashtagData?.seeHashtag.hashtag?.photos &&
              seeHashtagData?.seeHashtag?.hashtag?.photos.map((photo) => (
                <HashtagPhoto key={photo?.id}>
                  <Overlay>
                    <HashtagPhotoIcons>
                      <span>
                        <BsHeartFill />
                        {photo?.totalLikes}
                      </span>
                      <span>
                        <FaComment style={{ transform: "rotateY(180deg)" }} />
                        {photo?.totalComments}
                      </span>
                    </HashtagPhotoIcons>
                  </Overlay>
                  <img src={photo?.photoUrl} alt="" />
                </HashtagPhoto>
              ))}
          </HashtagMain>
        </Container>
      ) : null}
    </MainLayout>
  );
};

export default Hashtag;