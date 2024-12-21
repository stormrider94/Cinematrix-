import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CastCard = ({ person }) => {
  return (
    <StyledLink to={`/people/${person.id}`} style={{textDecoration: 'none'}}>
      <CardWrapper>
        <div className="img-container">
          <img
            src={"https://image.tmdb.org/t/p/w185/" + person.profile_path}
            alt={`${person.name} profile`}
          />
        </div>
        <div className="content-wrapper">
          <p style={{ fontWeight: "bold" }}>{person.name}</p>
          <p>{person.character}</p>
        </div>
      </CardWrapper>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  color : white;
  &:visited,
  &:focus,
  &:active {
    color: inherit;
  }
`;

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
  }
`;

export default CastCard;