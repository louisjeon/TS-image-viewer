import { Link } from "react-router-dom";
import styled from "styled-components";
import { Photo } from "../types";
import CoolImage from "./CoolImage";

interface ThumbnailCardProps extends Photo {
  thumbnail: {
    width: number;
    height: number;
  };
}

const ThumbnailCard: React.FC<ThumbnailCardProps> = ({
  thumbnail,
  author,
  download_url,
  id,
}) => {
  const thumbnailSrc = download_url
    .split("/")
    .map((item, index) => {
      switch (index) {
        case 5:
          return Math.ceil(thumbnail.width);
        case 6:
          return Math.ceil(thumbnail.height);
        default:
          return item;
      }
    })
    .join("/");

  return (
    <Link to={`/${id}`} style={{ textDecoration: "none" }}>
      <ThumbnailCardContainer>
        <div className="inner">
          <p>{author}</p>
          <CoolImage src={thumbnailSrc} alt={author} />
        </div>
      </ThumbnailCardContainer>
    </Link>
  );
};

const ThumbnailCardContainer = styled.div`
  position: "relative";
  margin: 10px 0;
  width: 22vw;
  height: 14vw;

  .inner {
    border: 2px solid;
    box-sizing: border-box;
    width: 22vw;
    height: 14vw;
    overflow: hidden;

    &:hover {
      font-size: 20px;
      transform: translate(-2vw, -2vw);
      transition: all 0.2s linear;
      width: 26vw;
      height: 18vw;
    }
  }
`;

export default ThumbnailCard;
