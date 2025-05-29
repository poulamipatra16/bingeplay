import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.png";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState(null);

  const getSearches = async() => {
    try{
    const {data} = await axios.get(`search/multi?query=${query}`);
      setSearches(data.results);
    }catch(error){
      console.log(`error: ${error}`)
    }
  }

  useEffect(()=>{
    getSearches();
  },[query])
  return (
    <div className="w-full h-[10vh] relative flex justify-center items-center Topnav px-3 py-5">
     
        <i className="text-[#d4d4d4] text-2xl ri-search-line"></i>
        <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className=" border-1 border-zinc-700 rounded-full w-[50%] mx-3 p-3 outline-none bg-transparent text-[#fffffff3]" type="text" placeholder="Search anything"/>
         <div className="cross-holder w-[25px] h-[25px]">
         {query.length > 0 && <i
        onClick={()=> setQuery("")}
        className="text-[#d4d4d4] ri-close-fill text-xl hover:cursor-pointer hover:text-[#fffffff3] duration-300">
          </i>}
        </div>

        {searches && <div className={`z-10 search-suggestion w-[50%] max-h-[60vh] h-fit bg-[#2c2b36] absolute top-[100%] text-[#d4d4d4] rounded-sm overflow-auto overflow-x-hidden`}>

          {searches && searches.map((search, index) => <Link to={`/${search.media_type}/details/${search.id}`} key={search.id} className={`py-3 px-5 w-full flex items-center justify-start gap-5 border-b-1 border-zinc-700 hover:text-[#fffffff3] hover:bg-[#6556cd] duration-300`}>
          <img
          className="w-12"
          src={search.poster_path || search.profile_path ? `https://image.tmdb.org/t/p/original/${search.poster_path || search.profile_path}`: noimage} alt="" />
          <span>{search.title || search.name}</span>
          </Link>)}
        
        </div>}
    </div>
  )
}

export default Topnav