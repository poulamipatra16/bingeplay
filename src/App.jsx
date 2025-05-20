import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import "remixicon/fonts/remixicon.css";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import LocomotiveScroll from "locomotive-scroll";
import Tvshows from "./components/Tvshows";
import People from "./components/People";
import MovieDetails from "./components/MovieDetails";
import TvDetails from "./components/TvDetails";
import PeopleDetails from "./components/PeopleDetails";
import Trailer from "./components/partials/Trailer";
import NotFound from "./components/partials/NotFound";



const App = () => {
  return (
    <div className="w-full h-full bg-[#1f1e24] flex">

 
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/trending" element={<Trending/>}/>
        <Route path="/popular" element={<Popular/>}/>
        <Route path="/movie" element={<Movie/>}/>
        <Route path="/movie/details/:id" element={<MovieDetails/>}>
          <Route path="/movie/details/:id/trailer" element={<Trailer/>}/>
        </Route>
        <Route path="/tv" element={<Tvshows/>}/>
        <Route path="/tv/details/:id" element={<TvDetails/>}>
            <Route path="/tv/details/:id/trailer" element={<Trailer/>}/>
        </Route>
        <Route path="/people" element={<People/>}/>
        <Route path="/person/details/:id" element={<PeopleDetails/>}/>
        {/* Asterics referred as wildcard round which means if wrong url is requested */}
        <Route path="*" element={<NotFound/>}/>
      </Routes>

    </div>
  )
}

export default App