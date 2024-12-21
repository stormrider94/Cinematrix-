import { CalendarOutlined, StarFilled } from "@ant-design/icons";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Banner = ({ trendingMovie }) => {
  // Fallback for missing backdrop to prevent errors
  const backdropUrl = trendingMovie.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280/${trendingMovie.backdrop_path}`
    : 'https://via.placeholder.com/1280x720.png?text=Movie+Poster+Not+Available';

  return (
    <Link to={`/movies/${trendingMovie.id}`}>
      <BannerItemWrapper style={{ backgroundImage: `url(${backdropUrl})` }}>
        <h1>{trendingMovie.title}</h1>
        <InfoWrapper>
          <p>
            <CalendarOutlined /> {moment(trendingMovie.release_date).format("MMMM D, YYYY")}
          </p>
          <p>
            <StarFilled style={{ color: "gold" }} /> {trendingMovie.vote_average.toFixed(1)}
          </p>
        </InfoWrapper>
      </BannerItemWrapper>
    </Link>
  );
};

const BannerItemWrapper = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  background-size: cover;
  background-position: center;
  color: white;
  border-radius: 12px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0));
    border-radius: 12px;
  }

  h1 {
    font-size: 32px;
    margin-bottom: 10px;
    position: relative;
    z-index: 1;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  gap: 20px;
  font-size: 16px;
  position: relative;
  z-index: 1;
`;

export default Banner;