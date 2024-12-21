import React from "react";
import styled from "styled-components";
import { StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment";

const SeriesCard = ({ series }) => {
    return (
        <Link to={`/series/${series.id}`} style={{ textDecoration: 'none' }}>
            <MovieCardWrapper
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2)
                    20%, rgba(0, 0, 0, 0.7) 80%), url(${
                        "https://image.tmdb.org/t/p/w342/" + series.poster_path
                    })`,
                }}
            >
                <h3>{series.name}</h3>
                <p>
                    <StarFilled style={{ color: "gold", marginRight: "10px" }} />
                    {series.vote_average}
                </p>
                <p>{moment(series.first_air_date).format("MMMM D, YYYY")}</p>
            </MovieCardWrapper>
        </Link>
    );
};

const MovieCardWrapper = styled.div`
    width: 250px;
    height: 250px;
    background-color: #222;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 15px;
    padding: 15px;
    cursor: pointer;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;

    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    h3 {
        color: #fff;
        margin: 0 0 5px 0; 
        font-size: 1rem; 
        word-wrap: break-word; 
        overflow: hidden; 
        text-overflow: ellipsis; 
        white-space: normal; 
        max-height: 2.4em; 
        line-height: 1.2em; 
    }

    p {
        color: #fff;
        margin: 0 0 5px 0; 
        font-size: 0.9rem; 
        line-height: 1.5em; 
    }
`;

export default SeriesCard;
