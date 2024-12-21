import { Avatar, Button, Divider, List, Tooltip } from "antd";
import moment from "moment";
import { FaHeart, FaRegBookmark, FaStar } from "react-icons/fa";
import {
  PlayCircleFilled,
  CalendarFilled,
  ClockCircleFilled,
  RiseOutlined,
} from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "../context/context";
import Loading from "../utils/loadingAnimation";
import CastCard from "../components/CastCard";
import { HorizontalOverflowContainer } from "./Home";
import SeriesCard from "../components/SeriesCard";
import ReactPlayer from "react-player";
import SeasonCard from "../components/SeasonCard";

const SeriesDetails = () => {
  const { seriesId } = useParams();
  const {
    getMovieDetails,
    movieDetails,
    getMovieCredits,
    movieCredits,
    movieReviews,
    movieVideos,
    similarMovies,
    recommendedMovies,
    getSimilarMovies,
    getRecommendedMovies,
    getVideosAboutAMovie,
    getMovieOrShowReviews,
  } = useContext(GlobalContext);

  useEffect(() => {
    getMovieDetails("tv", seriesId);
    getMovieCredits("tv", seriesId);
    getVideosAboutAMovie("tv", seriesId);
    getMovieOrShowReviews("tv", seriesId);
    getRecommendedMovies("tv", seriesId);
    getSimilarMovies("tv", seriesId);
    window.scrollTo(0, 0);
  }, [seriesId]);

  const trailerURL = movieVideos?.results?.filter(
    (v) => v.type == "Trailer" && v.site == "YouTube"
  );

  return (
    <MovieDetailWrapper>
      {!movieDetails ? (
        <Loading />
      ) : (
        <div>
          <MainWrapper
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 20%, rgba(0, 0, 0, 0.8) 80%),url(${
                "https://image.tmdb.org/t/p/w1280/" + movieDetails.backdrop_path
              })`,
            }}
          >
            <ImageWrapper>
              <img
                src={
                  "https://image.tmdb.org/t/p/w500/" + movieDetails.poster_path
                }
                alt="poster-img"
              />
            </ImageWrapper>
            <ContentWrapper>
              <h1 style={{color : "#fff"}}>{movieDetails.name}</h1>
              <p style={{ color: "#cccccc", fontFamily: "Segoe script" }}>
                "{movieDetails.tagline}"
              </p>
              <GenresWrapper>
                {movieDetails.genres?.map((genre) => (
                  <Button
                    type="primary"
                    shape="round"
                    style={{
                      marginRight: "10px",
                      background: "#181820",
                      borderColor: "red",
                    }}
                  >
                    {genre.name}
                  </Button>
                ))}
              </GenresWrapper>
              <p>Number of seasons: {movieDetails.number_of_seasons}</p>
              <p>Number of episodes: {movieDetails.number_of_episodes}</p>

              <p>
                First Air Date:{" "}
                {moment(movieDetails.first_air_date).format("MMMM D, YYYY")}
              </p>
              <p>
                Last Air Date:{" "}
                {moment(movieDetails.last_air_date).format("MMMM D, YYYY")}
              </p>
              <p>
                <ClockCircleFilled style={{ marginRight: "10px" }} />{" "}
                {movieDetails.episode_run_time[0]} mins
              </p>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <p>
                  <FaStar style={{ marginRight: "10px" }} color="gold" />{" "}
                  {movieDetails.vote_average}
                </p>
                <p>
                  <RiseOutlined style={{ marginRight: "10px", color: "red" }} />{" "}
                  {movieDetails.popularity}
                </p>
              </div>
              <div>
                <h2>Overview</h2>
                <p>{movieDetails.overview}</p>
              </div>
            </ContentWrapper>
          </MainWrapper>
          <TrailerWrapper>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${
                trailerURL && trailerURL[0]?.key
              }`}
            />
          </TrailerWrapper>
          <SeasonsWrapper>
            <h2>Seasons</h2>
            <HorizontalOverflowContainer>
              {!movieDetails?.seasons ? (
                <Loading />
              ) : (
                movieDetails?.seasons?.map((season) => (
                  <div style={{ display: "inline-block" }}>
                    <SeasonCard season={season} />
                  </div>
                ))
              )}
            </HorizontalOverflowContainer>
          </SeasonsWrapper>
          <SecondaryWrapper>
            <CastWrapper>
              <h2>Cast</h2>
              <HorizontalOverflowContainer>
                {!movieCredits ? (
                  <Loading />
                ) : (
                  movieCredits.cast?.map((person) => (
                    <div style={{ display: "inline-block" }}>
                      <CastCard person={person} />
                    </div>
                  ))
                )}
              </HorizontalOverflowContainer>
            </CastWrapper>
            <MoreDetailsWrapper>
              <div>
                <p className="key-name">Status</p>
                <p>{movieDetails.status}</p>
              </div>
              <div>
                <p className="key-name">Original language</p>
                <p>{movieDetails.original_language}</p>
              </div>
              <div>
                <p className="key-name">Budget</p>
                <p>${movieDetails.budget}</p>
              </div>
              <div>
                <p className="key-name">Revenue</p>
                <p>${movieDetails.revenue}</p>
              </div>
            </MoreDetailsWrapper>
          </SecondaryWrapper>
          <Divider />
          <ReviewsWrapper>
            <h2>Reviews</h2>
            <List>
              {!movieReviews ? (
                <Loading />
              ) : movieReviews?.results.length == 0 ? (
                <p>No reviews to show!</p>
              ) : (
                movieReviews?.results?.map((review, i) => (
                  <List.Item key={i} style={{ border: "none" }}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={review.author_details.avatar_path?.slice(1)}
                        />
                      }
                      title={
                        <p type="text">
                          <span>{review.author_details.username}</span> &nbsp;
                          <span>({review.author_details.name})</span>
                        </p>
                      }
                      description={
                        <>
                          <p>
                            <FaStar
                              style={{ marginRight: "10px" }}
                              color="gold"
                            />{" "}
                            {review.author_details.rating}
                          </p>
                          <p>{review.content}</p>
                        </>
                      }
                    />
                  </List.Item>
                ))
              )}
            </List>
          </ReviewsWrapper>
          <Divider />
          <SimilarMoviesWrapper>
            <h2>Recommended movies</h2>
            {!recommendedMovies ? (
              <Loading />
            ) : (
              <HorizontalOverflowContainer>
                {!recommendedMovies.length ? (
                  <p>No recommended movies available!</p>
                ) : (
                  recommendedMovies?.results?.map((series) => (
                    <div style={{ display: "inline-block" }}>
                      <SeriesCard series={series} />
                    </div>
                  ))
                )}
              </HorizontalOverflowContainer>
            )}
          </SimilarMoviesWrapper>
          <Divider />
          <SimilarMoviesWrapper>
            <h2>Similar movies</h2>
            {!similarMovies ? (
              <Loading />
            ) : (
              <HorizontalOverflowContainer>
                {similarMovies?.results?.map((series) => (
                  <div style={{ display: "inline-block" }}>
                    <SeriesCard series={series} />
                  </div>
                ))}
              </HorizontalOverflowContainer>
            )}
          </SimilarMoviesWrapper>
        </div>
      )}
    </MovieDetailWrapper>
  );
};

const MovieDetailWrapper = styled.div`
  width: 100%;
  min-height: 200vh;
  h2{
  color : #fff;}

  p {
  color:#DCDACC;
  }`;

const MainWrapper = styled.div`
  width: 100%;
  min-height: 90vh;
  padding: 20px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  @media screen and (max-width: 768px) {
    & {
      flex-direction: column;
    }
  }
`;

const ImageWrapper = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 66%;
    height: 100%;
    border-radius: 20px;
  }

  @media screen and (max-width: 768px) {
    & {
      width: 90%;
    }
    img {
      width: 100%;
    }
  }
`;
const ContentWrapper = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  h1 {
    font-weight: bolder;
    font-size: 36px;
  }

  @media screen and (max-width: 768px) {
    & {
      width: 90%;
    }
  }
`;

const GenresWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0;
  margin-bottom: 20px;
`;

const SeasonsWrapper = styled.div`
  width: 100%;
  padding: 2rem 1rem;
`;

const TrailerWrapper = styled.div`
  width: 100%;
  height: 80vh;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SecondaryWrapper = styled.div`
  width: 100%;
  min-height: 80vh;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    & {
      flex-direction: column;
      /* padding: 2rem 0.5rem; */
    }
  }
`;
const CastWrapper = styled.div`
  width: 78%;
  height: 100%;

  p {
    color: #fff;
  }

  @media screen and (max-width: 768px) {
    & {
      width: 100%;
    }
  }
`;
const MoreDetailsWrapper = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  div {
    margin: 30 0;
  }

  .key-name {
    font-weight: bolder;
    margin-bottom: 0px;
  }

  @media screen and (max-width: 768px) {
    & {
      width: 100%;
    }
  }
`;

const ReviewsWrapper = styled.div`
  width: 100%;
  min-height: 30vh;
  padding: 2rem 1rem;
`;

const SimilarMoviesWrapper = styled.div`
  width: 100%;
  min-height: 30vh;
  padding: 2rem 1rem;
`;

export default SeriesDetails;
