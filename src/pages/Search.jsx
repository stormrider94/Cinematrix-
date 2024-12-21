import { Button, Divider } from "antd";
import React, { useContext, useEffect,useState } from "react";
import styled from "styled-components";
import MovieCard from "../components/MovieCard";
import SeriesCard from "../components/SeriesCard";
import CastCard from "../components/CastCard";
import Searchbar from "../components/Searchbar";
import { GlobalContext } from "../context/context";
import Loading from "../utils/loadingAnimation";

const Search = () => {
  const { searchResults, searchTerm, searchMovies } = useContext(GlobalContext);
  const [searchType, setSearchType] = useState(null);

  const handleSearchType = (searchType) => {
    searchMovies(searchType, searchTerm);
    setSearchType(searchType);
  };

  return (
    <SearchWrapper>
      <div className="search-box">
        <Searchbar />
      </div>
      <NavWrapper>
        <StyledButton
          shape="round"
          style={{ margin: "0px 10px" }}
          onClick={() => handleSearchType("movie")}
          active = {searchType=="movie"}
        >
          Movies
        </StyledButton>
        <StyledButton
          shape="round"
          style={{ margin: "0px 10px" }}
          onClick={() => handleSearchType("tv")}
          active = {searchType=="tv"}
        >
          TV shows
        </StyledButton>
        <StyledButton
          shape="round"
          style={{ margin: "0px 10px" }}
          onClick={() => handleSearchType("person")}
          active = {searchType=="person"}
        >
          People
        </StyledButton>
      </NavWrapper>

      {searchTerm && (
        <h2 style={{ textAlign: "center", margin: "15px 0", color : "white" }}>
          Search results for {searchTerm}
        </h2>
      )}
      <Divider />
      {!searchResults ? (
        <Loading />
      ) : (
        <BodyWrapper>
          {searchResults?.results?.map((movie, i) =>
            searchType == "person" ? (
              <CastCard person={movie} key={i} />
            ) : searchType == "tv" ? (
              <SeriesCard series={movie} key={i} />
            ) : (
              <MovieCard movie={movie} key={i} />
            )
          )}
        </BodyWrapper>
      )}
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  padding: 1rem;

  .search-box {
    display: none;
  }

  @media screen and (max-width: 768px) {
    .search-box {
      display: block;
    }
  }
`;

const NavWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BodyWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
`;
const StyledButton = styled(Button)`
  background-color: transparent !important; /* Matches parent's background */
  color: ${(props) => (props.active ? "#ff6961" : "white")} !important; /* Softer red */
  border: 1px solid ${(props) => (props.active ? "#ff6961" : "rgb(67 67 67)")} !important; /* Softer red border */

  &:hover {
    color: #ff6961 !important; /* Softer red on hover */
    border-color: #ff6961 !important; /* Softer red border on hover */
  }
`;

export default Search;
