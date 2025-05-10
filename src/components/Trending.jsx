import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Header from "./partials/Header";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
    document.title = "BingePlay - Trending Movies & Tv Shows";
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true)

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      if(data.results.length > 0){
      setTrending((prev) => [...prev, ...data.results]);
      setPage(prev => prev + 1);
      }else{
        sethasMore(false)
      }
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const refreshHandler = () => {
    if(trending.length === 0){
      getTrending();
    }else{
      setPage(1);
      setTrending([]);
      getTrending();
    }
  }

  useEffect(()=>{
    refreshHandler();
}, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-full h-full bg-[#1f1e24]  h-scroll-none">

      <div className="w-full h-fit p-5 flex items-center">
        <i
          onClick={() => navigate(-1)}
          className="text-zinc-400 hover:text-zinc-50 cursor-pointer duration-300 text-2xl ri-arrow-left-line"
        ></i>
         <Topnav />
      </div>

     
      <Header data={trending}/>


      <div className="heading-and-filters flex gap-2 justify-between items-center px-5 mt-10">
        <h1 className="text-zinc-50 text-4xl font-bold self-start">Trending</h1>
        <div className="filters flex items-center gap-2">
        <Dropdown title="Trending" options={["all", "tv", "movie"]} func={(e) => setCategory(e.target.value)}/>
        <Dropdown title="Duration" options={["day", "week"]} func={(e) => setDuration(e.target.value)} />
        </div>
      </div> 

     <div className="w-full h-full">
      <InfiniteScroll 
      dataLength={trending.length} 
      next={getTrending} 
      hasMore={hasMore} 
      loader={<h1>Loading...</h1>}>
        <Cards data={trending}/>
      </InfiniteScroll>
      </div>


    </div>
  ) : (
   <Loading/>
)
};

export default Trending;
