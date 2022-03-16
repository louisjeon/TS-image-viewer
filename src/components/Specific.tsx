import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchPhoto } from "../api";
import { Photo } from "../types";
import CoolImage from "./CoolImage";

const Specific: React.FC = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery<Photo>("photo", () =>
    fetchPhoto(Number(id))
  );

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (!data) {
    return <p>Data matching with ID{id} not found.</p>;
  } else {
    const { id, author, width, height, url, download_url } = data;

    return (
      <SpecificContainer>
        <h1>{author}</h1>
        <a href={url} target="_blank" rel="noreferrer">
          {url}
        </a>
        <p>ID: {id}</p>
        <p>Width: {width}px</p>
        <p>Height: {height}px</p>
        <a href={download_url} target="_blank" rel="noreferrer">
          Download
        </a>
        <CoolImage src={download_url} alt={author} />
      </SpecificContainer>
    );
  }
};

const SpecificContainer = styled.div`
  margin: auto;
  margin: 20px auto;
`;

export default Specific;
