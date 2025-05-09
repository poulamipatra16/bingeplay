import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  const [changingIndex, setChangingIndex] = useState(0);

  //useEffect is saying When this component is ready (or when data changes), do something!
  useEffect(() => {
    if (!data || data.length === 0) return;
    //Is the data missing or empty?" If yes, we stop here — no need to do anything.

    const interval = setInterval(() => {
      setChangingIndex((prevIndex) =>
        prevIndex < data.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);
    //If the current index is not the last item, go to the next item. If it is the last item, go back to the first item (start over).

    return () => clearInterval(interval); // Cleanup interval on unmount|"When the component goes away, stop the timer!" This is like cleaning up after yourself to avoid memory problems.
  }, [data]);
  //"Only run this effect when the data changes." If data doesn't change, we don’t redo the timer.
  if (!data || data.length === 0) return null;
  //Again checking: If data is empty or missing, don’t show anything — just return nothing.

  const currentData = data[changingIndex];

  return (
    <div
     className="w-full h-[80vh]"
      style={{
        background: `linear-gradient(to top, #1f1e24, rgba(0,0,0,0.0), #1f1e24), linear-gradient(to right, #1f1e24, rgba(0,0,0,0.0), rgba(0,0,0,0.0)), url(https://image.tmdb.org/t/p/original/${
          data && data[changingIndex].backdrop_path
        }) center/cover`,
      }}
    >
      <div className="details text-zinc-50 w-fit h-full flex flex-col justify-end items-start gap-3 px-5 py-5">
        <h1 className="font-black text-5xl">
          {currentData.name ||
            currentData.title ||
            currentData.original_name ||
            currentData.original_title}
        </h1>
        {currentData.overview && (
          <p className="w-[55%] text-xl">
            {currentData.overview.length > 100
              ? currentData.overview.slice(0, 100)
              : currentData.overview}
            ...
            <Link className="text-blue-400">more</Link>
          </p>
        )}
        <div className="media-info flex gap-x-5">
          <span><i className="ri-megaphone-fill text-yellow-500 mr-1"></i>{currentData.release_date || currentData.first_air_date || "No Information"
        }</span>
        <span><i className="ri-album-fill text-yellow-500 mr-1"></i>{currentData.media_type.toUpperCase()}</span>
        </div>

        <div className="btns flex gap-x-3">
        <Link className="bg-[#6556cd] py-4 px-6 rounded text-xl hover:bg-[#8274dd] duration-300">
        <i class="ri-play-circle-line mr-1"></i>
        <span className="font-semibold">Watch Trailer</span>
        </Link>
        <Link className="text-[#6556cd] bg-zinc-50 py-3 px-5 rounded text-3xl hover:bg-zinc-300 duration-300"><i class="ri-add-line"></i></Link>
        </div>

      </div>
    
    </div>
  );
};

export default Header;
