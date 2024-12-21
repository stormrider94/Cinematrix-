import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import GlobalProvider from "./context/context"
import styled from "styled-components"
import "./App.less"

import {
  AllMovies,
  AllSeries,
  Home,
  MovieDetails,
  PersonDetails,
  Search,
  SeriesDetails,
} from "./pages"

function App() {

  return (
    <BrowserRouter>
      <GlobalProvider>
        <Navbar/>
        <RoutesContainer>
            <Routes>
              <Route path = "/*" exact element={<Home/>}/>
              <Route path="/movies/:movieId" exact element = {<MovieDetails/>}/>
              <Route path="/series/:seriesId" exact element = {<SeriesDetails/>}/>
              <Route path="/people/:personId" exact element = {<PersonDetails/>}/>
              <Route path="/movies" exact element = {<AllMovies/>}/>
              <Route path="/series" exact element = {<AllSeries/>}/>
              <Route path="/search" exact element = {<Search/>}/>
            </Routes >
        </RoutesContainer>
        <Footer/>
      </GlobalProvider>
    </BrowserRouter>
  )
}



export default App

const RoutesContainer = styled.div`
width : 100%;
min-height : calc(100vh - 60px)`