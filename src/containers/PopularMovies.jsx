import {Button} from "antd"
import {useEffect, useContext, useState} from "react"
import styled from "styled-components"
import MovieCard from "../components/MovieCard"
import SeriesCard from "../components/SeriesCard"
import { GlobalContext } from "../context/context"
import Loading from "../utils/loadingAnimation"
import { HorizontalOverflowContainer } from "../pages/Home"

const PopularMovies = () => {
    const { popularMovies, getPopularMoviesOnTMDB} = useContext(GlobalContext)
    const [typ, setTyp] = useState("movie")

    useEffect(()=> {
        getPopularMoviesOnTMDB("movie")
    },[])

    const handleTypeChange = (type) => {
        getPopularMoviesOnTMDB(type)
    }
    
    return (
        <PopularMoviesWrapper>
            <h2>Most popular</h2>
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
            {!popularMovies ? (
                <Loading/>
            ): (
                <HorizontalOverflowContainer>
                    {popularMovies?.results?.map((movie)=> (
                        <div style={{display : "inline-block"}} key={movie.id}>
                            {typ == "movie" ? (
                                <MovieCard movie={movie}/>
                            ): (
                                <SeriesCard series={movie}/>
                            )}
                        </div>
                    ))}
                </HorizontalOverflowContainer>
            )}
        </PopularMoviesWrapper>
    )
}

const PopularMoviesWrapper = styled.div`
width : 100%;
min-height : 60vh;
padding : 0 1rem;
margin : 30px 0;

h2 {
color : #fff;
}
`

export const TitleWrapper = styled.div`
width : 100%;
display : flex;
align-items : center;
justify-content : flex-start;
flex-direction : row;
margin-bottom : 20px;
button {
margin-right : 10px;
}

`
const StyledButton = styled(Button)`
  background-color: transparent !important; 
  color: ${(props) => (props.active ? "#ff6961" : "white")} !important; 
  border: 1px solid ${(props) => (props.active ? "#ff6961" : "rgb(67,67,67)")} !important; 

  &:hover {
    color: #ff6961 !important; 
    border-color: #ff6961 !important; 
  }
`;

export default PopularMovies