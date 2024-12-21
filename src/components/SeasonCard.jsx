import React from "react";
import styled from "styled-components";

const SeasonCard = ({ season }) => {
  return (
    <CardWrapper>
      <div className="img-container">
        <img
          src={"https://image.tmdb.org/t/p/w185/" + season.poster_path}
          alt="season-profile"
        />
      </div>
      <div className="content-wrapper">
        <p style={{ color: "#cccccc" }}>{season.name}</p>
        <p style={{ color: "#cccccc" }}>{season.episode_count} episodes</p>
      </div>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  width: 150px;
  height: 300px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-shadow: rgba(255, 255, 255, 0.2) 0px 3px 8px;
  margin: 10px 10px 10px 0;
  border-radius: 10px;

  .img-container {
    height: 70%;
    width: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .content-wrapper {
    padding: 7px;
    width: 100%;
  }
`;

export default SeasonCard;