import { Button, Divider, Pagination } from "antd";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SeriesCard from "../components/SeriesCard";
import { GlobalContext } from "../context/context";
import Loading from "../utils/loadingAnimation";
import { HorizontalOverflowContainer } from "./Home";

const AllSeries = () => {
  const { genres, fetchListOfGenres, movies, getMoviesBasedOnGenre } =
    useContext(GlobalContext);

  useEffect(() => {
    fetchListOfGenres("tv");
    getMoviesBasedOnGenre("tv");
  }, []);

  const [current, setCurrent] = useState(1);
  const [genreKey, setGenreKey] = useState(null);

  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
    getMoviesBasedOnGenre("tv",genreKey, page);
  };

  const selectGenre = (genreId) => {
    setGenreKey(genreId);
    getMoviesBasedOnGenre("tv",genreId, current);
  };

  return (
    <MoviesWrapper>
      {!genres ? (
        <Loading />
      ) : (
        <NavWrapper>
          <HorizontalOverflowContainer>
            {genres.genres.map((genre, i) => (
              <div style={{ display: "inline-block" }} key={i}>
                <StyledButton
                  shape="round"
                  style={{ margin: "0px 10px" }}
                  onClick={() => selectGenre(genre.id)}
                  active={genreKey == genre.id} // Pass active prop
                >
                  {genre.name}
                </StyledButton>
              </div>
            ))}
          </HorizontalOverflowContainer>
        </NavWrapper>
      )}
      <Divider />
      {!movies ? (
        <Loading />
      ) : (
        <BodyWrapper>
          {movies?.results?.map((movie, i) => (
            <SeriesCard series={movie} key={i} />
          ))}
        </BodyWrapper>
      )}
      <PaginationWrapper>
        <StyledPagination current={current} onChange={onChange} total={499} />
      </PaginationWrapper>
    </MoviesWrapper>
  );
};

const MoviesWrapper = styled.div`
  width: 100%;
  padding: 2rem 1rem;
`;

const NavWrapper = styled.div`
  width: 100%;
  height: 50px;
`;

const BodyWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;
const StyledButton = styled(Button)`
  background-color: transparent !important; 
  color: ${(props) => (props.active ? "#ff6961" : "white")} !important; 
  border: 1px solid ${(props) => (props.active ? "#ff6961" : "rgb(67 67 67)")} !important; 

  &:hover {
    color: #ff6961 !important; 
    border-color: #ff6961 !important; 
  }
`;

const StyledPagination = styled(Pagination)`
  .ant-pagination-item {
    background-color: transparent !important; 
    border: 1px solid rgb(67, 67, 67) !important; 
    color: white !important; 
    transition: all 0.3s ease;

    &:hover {
      border-color: #ff6961 !important; 
      color: #ff6961 !important; 
    }

    &.ant-pagination-item-active {
      background-color: transparent !important;
      border-color: #ff6961 !important; 
      color: #ff6961 !important; 
      font-weight: bold; 
      outline: none !important; 
      box-shadow: none !important; 
    }
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    .ant-pagination-item-link {
      background-color: transparent !important; 
      border: 1px solid rgb(67, 67, 67) !important;
      color: white !important; 
      transition: all 0.3s ease;

      &:hover {
        border-color: #ff6961 !important; 
        color: #ff6961 !important; 
      }

      &:focus {
        outline: none !important;
        box-shadow: none !important; 
      }
    }
  }

  .ant-pagination-item a {
    color: inherit !important; 
    text-decoration: none !important; 
  }

  .ant-pagination-item-active a {
    color: #ff6961 !important; 
  }

  &:focus {
    outline: none !important; 
    box-shadow: none !important; 
  }

  /* Styling the ellipses */
  .ant-pagination-item-ellipsis {
    color: #ff6961 !important; 
    font-size: 16px; 
    font-weight: bold; 
  }
`;

export default AllSeries;
