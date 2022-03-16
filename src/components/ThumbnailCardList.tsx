import { useCallback, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { fetchPhotos } from "../api";
import { currentPageAtom } from "../atoms";
import { Photo } from "../types";
import ThumbnailCard from "./ThumbnailCard";

const ThumbnailCardList: React.FC = () => {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
  const currentFirstPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
  const { isLoading, data, refetch } = useQuery<Photo[]>("photos", () =>
    fetchPhotos(currentPage)
  );
  const thumbnail = useRef({
    width: window.innerWidth * 0.22,
    height: window.innerWidth * 0.14,
  });
  const setThumbnail = useCallback(() => {
    thumbnail.current = {
      width: window.innerWidth * 0.22,
      height: window.innerWidth * 0.14,
    };
    refetch();
  }, [refetch]);

  useEffect(() => {
    console.log(currentPage);
    refetch();
  }, [currentPage, refetch]);

  useEffect(() => {
    window.addEventListener("resize", setThumbnail);

    return () => {
      window.removeEventListener("resize", setThumbnail);
    };
  }, [setThumbnail]);

  return (
    <ThumbnailCardListContainer>
      <div className="header">Image Viewer</div>
      <div className="images">
        {isLoading
          ? "Loading..."
          : data?.map((photo, index) => (
              <ThumbnailCard
                key={index}
                thumbnail={thumbnail.current}
                {...photo}
              />
            ))}
      </div>
      <div className="pages">
        {currentPage > 10 && (
          <button
            className="pageBtn"
            onClick={() => setCurrentPage(currentFirstPage - 1)}
          >
            &lt;
          </button>
        )}
        {new Array(
          (() => {
            if (currentPage < 31) {
              return 10;
            } else {
              return 6;
            }
          })()
        )
          .fill(0)
          .map((_, index) => (
            <button
              className="pageBtn"
              key={index}
              onClick={() => {
                setCurrentPage(index + currentFirstPage);
              }}
              style={
                currentPage === index + currentFirstPage
                  ? { backgroundColor: "wheat", color: "crimson" }
                  : {}
              }
            >
              {index + currentFirstPage}
            </button>
          ))}
        {currentPage < 31 && (
          <button
            className="pageBtn"
            onClick={() => setCurrentPage(currentFirstPage + 10)}
          >
            &gt;
          </button>
        )}
      </div>
    </ThumbnailCardListContainer>
  );
};

const ThumbnailCardListContainer = styled.div`
  margin: auto;
  padding: 20px;

  .header {
    border: 2px solid;
    font-size: 60px;
    text-align: center;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .images {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .pages {
    width: min-content;
    display: flex;
    margin: auto;

    .pageBtn {
      width: 50px;
      height: 40px;
      border: none;
      background-color: transparent;

      &:hover {
        cursor: pointer;
        background-color: white;
        color: crimson;
      }
    }
  }
`;

export default ThumbnailCardList;
