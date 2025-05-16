import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import Header from "./partials/Header";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";

const Tvshows = () => {

     document.title = "BingePlay - Tv Shows";
        const navigate = useNavigate();
        const [category, setCategory] = useState("airing_today");
        const [tvs, setTvs] = useState([]);
        const [page, setPage] = useState(1);
        const [hasMore, sethasMore] = useState(true)
    
         const getTvs = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if(data.results.length > 0){
      setTvs((prev) => [...prev, ...data.results]);  
      setPage(prev => prev + 1);
      }else{
        sethasMore(false)
      }
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const refreshHandler = () => {
    if(tvs.length === 0){
      getTvs();
    }else{
      setPage(1);
      setTvs([]);
      getTvs();
    }
  }

  useEffect(()=>{
    refreshHandler()
}, [category]);

  return (
   tvs.length > 0 ? (
    <div className="w-full h-full bg-[#1f1e24]  h-scroll-none">

      <div className="w-full h-fit p-5 flex items-center">
        <i
          onClick={() => navigate(-1)}
          className="text-zinc-400 hover:text-zinc-50 cursor-pointer duration-300 text-2xl ri-arrow-left-line"
        ></i>
         <Topnav />
      </div>

     
      <Header data={tvs}/>


      <div className="heading-and-filters flex gap-2 justify-between items-center px-5 mt-10">
        <h1 className="text-zinc-50 text-4xl font-bold self-start">tvs</h1>
        <div className="filters flex items-center gap-2">
        <Dropdown title="Tv Shows" options={["on_the_Air", "popular", "top_rated" ,"airing_today"]} func={(e) => setCategory(e.target.value)}/>
        </div>
      </div> 

     <div className="w-full h-full">
      <InfiniteScroll 
      dataLength={tvs.length} 
      next={getTvs} 
      hasMore={hasMore} 
      loader={<h1>Loading...</h1>}>
        <Cards data={tvs} title="tv"/>
      </InfiniteScroll>
      </div>


    </div>
  ) : (
   <Loading/>
)
  )
}

export default Tvshows