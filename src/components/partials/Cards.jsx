import React from "react";
import { Link } from "react-router-dom";

const Cards = ({data}) => {

  return (
    <div className="flex justify-center flex-wrap py-10 gap-5">

        {data && data.map((c,i) => (
        <Link className="w-[23%] h-[470px] block rounded-lg overflow-hidden" key={i}>
        <img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/original/${c.poster_path}`}
        alt={c.title || "title"}/>
        </Link>))}

    </div>
  )
}

export default Cards