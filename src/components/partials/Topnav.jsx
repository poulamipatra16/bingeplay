import React, { useState } from "react";
import { Link } from "react-router-dom";

const Topnav = () => {
  const [query, setQuery] = useState("");
  console.log(query)
  return (
    <div className="w-full h-[10vh] relative flex justify-center items-center Topnav px-3 py-10">
     
        <i class="text-zinc-400 text-2xl ri-search-line"></i>
        <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className=" border-1 border-zinc-700 rounded-full w-[50%] mx-3 p-3 outline-none bg-transparent text-zinc-50" type="text" placeholder="Search anything"/>
         <div className="cross-holder w-[25px] h-[25px]">
         {query.length > 0 && <i
        onClick={()=> setQuery("")}
        class="text-zinc-400 ri-close-fill text-xl hover:cursor-pointer hover:text-zinc-50 duration-300">
          </i>}
        </div>

        <div style={{WebkitScrollbar: "10px"}} className="search-suggestion w-[50%] max-h-[60vh] h-fit bg-[#2c2b36] absolute top-[100%] text-zinc-400 rounded-sm overflow-auto overflow-x-hidden">

          {/* <Link className="p-8 w-full flex items-center justify-start border-b-1 border-zinc-700 hover:text-zinc-50 hover:bg-[#6556cd] duration-300">
          <img src="" alt="" />
          <span>Hello Everyone</span>
          </Link> */}
        
        </div>
    </div>
  )
}

export default Topnav