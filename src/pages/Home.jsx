import { Button, Carousel } from "antd";
import React, { useEffect, useContext } from "react";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Banner from "../components/Banner";
import PopularActors from "../containers/PopularActors";
import PopularMovies from "../containers/PopularMovies";
import TopRatedMovies from "../containers/TopRatedMovies";
import UpComingMovies from "../containers/UpComingMovies";
import { GlobalContext } from "../context/context";
import Loading from "../utils/loadingAnimation";

const Home = () => {
  const { trendingMovies, fetchTrendingMovies } = useContext(GlobalContext);
  
  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <HomeWrapper>
      <BannerWrapper>
        <Carousel
          arrows
          nextArrow={<Button icon={<ArrowRightOutlined/>} ghost/>}
          prevArrow={<Button icon={<ArrowLeftOutlined />} ghost/>}
          autoplay
          adaptiveHeight
          autoplaySpeed={5000}
          draggable
          easing="linear"
          effect="fade"
          style={{ width: "100%", marginRight: "0px" }}
        >
          {!trendingMovies ? (
            <Loading />
          ) : (
            trendingMovies?.results?.map((trendingMovie, i) => (
              <Banner key={i} trendingMovie={trendingMovie} />
            ))
          )}
        </Carousel>
      </BannerWrapper>
      <PopularMovies />
      <UpComingMovies />
      <TopRatedMovies />      
      <PopularActors />
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  width: 100%;
`;

const BannerWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
  padding: 1rem;
`;

export const HorizontalOverflowContainer = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
  p {
    word-wrap: break-all;
    word-break: normal;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Home;