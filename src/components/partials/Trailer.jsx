import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

const Trailer = () => {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  console.log(ytvideo)
  return ytvideo ? (
    <div className="bg-[rgba(0,0,0,0.63)] w-[100%] h-[100vh] flex justify-center items-center fixed z-[20] top-0 left-[50%] -translate-x-[50%]">
      <div className="flex gap-2">
       
      <ReactPlayer controls={true} muted={true} className="w-full h-full md:w-fit mx-auto rounded" url={`https://www.youtube.com/watch?v=${ytvideo && ytvideo.key}`}/>
      <Link
            onClick={() => navigate(-1)}
            className="text-[#d4d4d4] hover:text-[#fffffff3] cursor-pointer duration-300">
               <i class="text-2xl ri-close-large-fill"></i>
      </Link>

      </div>
    </div>
    
  ) : (
  <NotFound/>
  );
}

export default Trailer