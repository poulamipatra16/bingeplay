import React from "react";
import {Link} from "react-router-dom";


const Sidenav = () => {
  return (
    <nav className="w-[20%] h-full border-r-1 border-zinc-800 p-7">
      <h1 className="text-xl"><i class="text-[#6556cd] ri-play-large-fill"></i>&nbsp;
      <span className="text-zinc-50 font-light font-[Poppins]">BingePlay</span>
      </h1>

      <div className="sub-nav text-zinc-400 flex flex-col gap-2">
        <h1 className="mt-8 mb-3 font-semibold text-zinc-50">New Feeds</h1>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded p-3">
          <i class="mr-2 ri-fire-fill"></i>Trending
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded p-3">
          <i class="mr-2 ri-sparkling-2-fill"></i>Popular
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded p-3">
          <i class="mr-2 ri-movie-2-fill"></i>Movies
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded p-3">
          <i class="mr-2 ri-tv-2-fill"></i>Tv Shows
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded p-3">
          <i class="mr-2 ri-team-fill"></i>People
        </Link>
      </div>

      <hr className="border-none h-[0.5px] bg-zinc-700 mt-3"/>

      <div className="sub-nav text-zinc-400 flex flex-col gap-2">
        <h1 className="mt-8 mb-3 font-semibold text-zinc-50">Help & Support</h1>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded p-3">
          <i class="mr-2 ri-phone-fill"></i>About BingePlay
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded p-3">
          <i class="mr-2 ri-information-fill"></i>Contact Us
        </Link>
      </div>
    </nav>
  )
}

export default Sidenav