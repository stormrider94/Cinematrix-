import { Button } from "antd";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "../components/MovieCard";
import SeriesCard from "../components/SeriesCard";
import { GlobalContext } from "../context/context";
import { HorizontalOverflowContainer } from "../pages/Home";
import Loading from "../utils/loadingAnimation";
import { TitleWrapper } from "./PopularMovies";

const UpComingMovies = () => {
  const { upcomingMovies, getUpComingMovies } = useContext(GlobalContext);
  const [typ, setTyp] = useState("movie");

  useEffect(() => {
    getUpComingMovies("movie");
  }, []);

  const handleTypeChange = (type) => {
    getUpComingMovies(type);
  };

  return (
    <UpComingMoviesWrapper>
      <h2>Upcoming</h2>
      <TitleWrapper>
          <StyledButton
        shape="round"
        onClick={() => {
          handleTypeChange("movie");
          setTyp("movie");
        }}
        active={typ === "movie"} 
      >
        Movies
      </StyledButton>
      <StyledButton
        shape="round"
        onClick={() => {
          handleTypeChange("tv");
          setTyp("tv");
        }}
        active={typ === "tv"}
      >
        Series
      </StyledButton>
      </TitleWrapper>
      {!upcomingMovies ? (
        <Loading />
      ) : (
        <HorizontalOverflowContainer>
          {upcomingMovies?.results?.map((movie) => (
            <div style={{ display: "inline-block" }} key={movie.id}>
              {typ == "movie" ? (
                <MovieCard movie={movie} />
              ) : (
                <SeriesCard series={movie} />
              )}
            </div>
          ))}
        </HorizontalOverflowContainer>
      )}
    </UpComingMoviesWrapper>
  );
};

const UpComingMoviesWrapper = styled.div`
  width: 100%;
  min-height: 60vh;
  padding: 0 1rem;
  margin: 30px 0;

  h2 {
  color : #fff; }
`;

const StyledButton = styled(Button)`
  background-color: transparent !important;
  color: ${(props) => (props.active ? "#ff6961" : "white")} !important; 
  border: 1px solid ${(props) => (props.active ? "#ff6961" : "rgb(67,67,67)")} !important;

  &:hover {
    color: #ff6961 !important; 
    border-color: #ff6961 !important;
  }
`;

export default UpComingMovies;