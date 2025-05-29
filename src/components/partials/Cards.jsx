import React from "react";
import { NavLink, Link } from "react-router-dom";

const Cards = ({data, title}) => {
  return (
    <div className="flex justify-center flex-wrap py-10 gap-5">

        {data && data.map((c,i) => (
        <Link to={`/${c.media_type || title}/details/${c.id}`} className="group w-[23%] h-[470px] relative block rounded-lg overflow-hidden" key={i}>
        <div className="pointer-events-none image-overlay absolute bg-linear-to-t from-[#26204d] via-[#26204d9c] to-[#26204d00] top-100 group-hover:top-0 group-hover:left-0 group-hover:right-0 group-hover:bottom-0 duration-250">
        </div>
        <div className="overlay-detail text-[#fff] absolute bottom-0 p-5 opacity-0 group-hover:opacity-100 duration-300">
           <h1 className="font-bold text-2xl">{c.title || c.original_title || c.name || c.original_name}</h1>
           <div className="iconised-info flex gap-2 py-2">
          {c.poster_path && <h1 className="text-yellow-400 font-semibold text-sm tracking-tighter border-1 px-2 py-0.5 rounded"><i className="ri-star-s-fill"></i>&nbsp;{c.vote_average}&nbsp;({c.vote_count})</h1>}
           {c.poster_path && <h1 className="text-yellow-400 font-semibold text-sm tracking-tighter border-1 px-2 py-0.5 rounded"><i className="ri-megaphone-fill"></i>&nbsp;{c.release_date || "N/A"}</h1>}
           </div>
           
           {c.overview && <p className="leading-5 text-md">{c.overview.length > 60 ? c.overview.slice(0,60) : c.overview}<span className="text-yellow-400">...more</span></p>}
        </div>
        <img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/original/${c.poster_path || c.profile_path}`}
        alt={c.title || "title"}/>
        </Link>))}

    </div>
  )
}

export default Cards