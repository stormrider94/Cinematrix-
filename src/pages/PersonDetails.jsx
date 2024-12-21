import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "../context/context";
import Loading from "../utils/loadingAnimation";
import moment from "moment";
import { HorizontalOverflowContainer } from "./Home";
import MovieCard from "../components/MovieCard";

const PersonDetails = () => {
  const { personId } = useParams();
  console.log(personId);

  const { getPersonDetails, personDetails, getPersonMovies, personMovies } =
    useContext(GlobalContext);

  useEffect(() => {
    getPersonDetails(personId);
    getPersonMovies(personId);
  }, [personId]);

  const getGender = (genderId) => {
    if (genderId == "1") return "Female";
    else if (genderId == "2") return "Male";
    else return "Other";
  };

  return (
    <PersonDetailsWrapper>
      {!personDetails ? (
        <Loading />
      ) : (
        <MainWrapper>
          <ImageWrapper>
            <img
              src={
                "https://image.tmdb.org/t/p/w500/" + personDetails.profile_path
              }
              alt="profile-img"
            />
          </ImageWrapper>
          <ContentWrapper>
            <h1 style={{color: '#fff'}}>{personDetails.name}</h1>
            <p>Gender : {getGender(personDetails.gender.toString())}</p>
            <p>Known for : {personDetails.known_for_department}</p>
            <p>
              Birthday : {personDetails.birthday} &nbsp;{" "}
              {moment(personDetails.birthday).fromNow()}
            </p>
            <p>Place of birth : {personDetails.place_of_birth}</p>

            <div>
              <h2>Biography</h2>
              <p>{personDetails.biography}</p>
            </div>
          </ContentWrapper>
        </MainWrapper>
      )}
      {!personMovies ? (
        <Loading />
      ) : (
        <MoviesKnownForWrapper>
          <h2>Movies Known For</h2>
          <HorizontalOverflowContainer>
            {!personMovies?.cast?.length ? (
              <p>No movies available!</p>
            ) : (
              personMovies?.cast?.map((movie) => (
                <div style={{ display: "inline-block" }}>
                  <MovieCard movie={movie} />
                </div>
              ))
            )}
          </HorizontalOverflowContainer>
        </MoviesKnownForWrapper>
      )}
    </PersonDetailsWrapper>
  );
};

const PersonDetailsWrapper = styled.div`
  width: 100%;
    h2{
  color : #fff;}

  p {
  color:#DCDACC;
  }
`;

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

const MoviesKnownForWrapper = styled.div`
  padding: 1rem;
`;

export default PersonDetails;