import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import Header from "./partials/Header";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";

const Movie = () => {

      document.title = "BingePlay - Movies";
        const navigate = useNavigate();
        const [category, setCategory] = useState("now_playing");
        const [movies, setMovies] = useState([]);
        const [page, setPage] = useState(1);
        const [hasMore, sethasMore] = useState(true)
    
         const getMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      if(data.results.length > 0){
      setMovies((prev) => [...prev, ...data.results]);  
      setPage(prev => prev + 1);
      }else{
        sethasMore(false)
      }
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const refreshHandler = () => {
    if(movies.length === 0){
      getMovies();
    }else{
      setPage(1);
      setMovies([]);
      getMovies();
    }
  }

  useEffect(()=>{
    refreshHandler()
}, [category]);

  return movies.length > 0 ? (
    <div className="w-full h-full bg-[#1f1e24]  h-scroll-none">

      <div className="w-full h-fit p-5 flex items-center">
        <i
          onClick={() => navigate(-1)}
          className="text-zinc-400 hover:text-zinc-50 cursor-pointer duration-300 text-2xl ri-arrow-left-line"
        ></i>
         <Topnav />
      </div>

     
      <Header data={movies}/>


      <div className="heading-and-filters flex gap-2 justify-between items-center px-5 mt-10">
        <h1 className="text-zinc-50 text-4xl font-bold self-start">movies</h1>
        <div className="filters flex items-center gap-2">
        <Dropdown title="Movies" options={["popular", "top_rated", "upcoming", "now_playing"]} func={(e) => setCategory(e.target.value)}/>
        </div>
      </div> 

     <div className="w-full h-full">
      <InfiniteScroll 
      dataLength={movies.length} 
      next={getMovies} 
      hasMore={hasMore} 
      loader={<h1>Loading...</h1>}>
        <Cards data={movies}/>
      </InfiniteScroll>
      </div>


    </div>
  ) : (
   <Loading/>
)
};


export default Movie