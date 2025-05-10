import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import "remixicon/fonts/remixicon.css";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import LocomotiveScroll from "locomotive-scroll";
import Tvshows from "./components/Tvshows";



const App = () => {
  return (
    <div className="w-full h-full bg-[#1f1e24] flex">

 
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/trending" element={<Trending/>}/>
        <Route path="/popular" element={<Popular/>}/>
        <Route path="/movies" element={<Movie/>}/>
        <Route path="/tvshows" element={<Tvshows/>}/>
      </Routes>

    </div>
  )
}

export default App