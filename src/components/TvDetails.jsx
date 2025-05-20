import { useEffect } from "react";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import Horizontalcards from "./partials/Horizontalcards";
import { Outlet } from "react-router-dom";


const TvDetails = () => {
   const navigate = useNavigate();
    const { pathname } = useLocation();
    const  {info}  = useSelector((state) => state.tv);
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log(info);
    useEffect(() => {
      dispatch(asyncloadtv(id));
      return () => {
        dispatch(removetv());
      };
    }, [id]);
 return info ? (
    <div className="w-full h-fit">
      <div
        style={{
          background: `linear-gradient(to top, #1f1e24, rgba(0,0,0,0.5), #1f1e24), linear-gradient(to right, #1f1e24, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}) center/cover`,
        }}
        className="bg-[#1f1e24] px-4 lg:px-[10%] pb-10"
      >
        {/* Nav */}
        <nav className="w-full text-zinc-400 py-5 flex flex-wrap items-center gap-6 text-lg lg:text-xl">
          <Link
            onClick={() => navigate(-1)}
            className="text-zinc-400 hover:text-zinc-50 cursor-pointer duration-300"
          >
            <i className="ri-arrow-left-line" />
          </Link>
          <a href={info.detail.homepage} target="_blank">
            <i className="ri-external-link-fill hover:text-zinc-50"></i>
          </a>
           {info.detail.wikidata_id !== "undefined" ||
            info.externalid.wikidata_id !== "undefined" && (
              <a
                href={`https://www.wikidata.org/wiki/${info.detail.wikidata_id || info.externalid.wikidata_id}`}
                target="_blank"
              >
                <i className="ri-earth-line hover:text-zinc-50"></i>
              </a>
            )}
          {info.detail.wikidata_id !== "undefined" ||
            info.externalid.wikidata_id !== "undefined" && (<a
            href={`https://www.imdb.com/title/${info.detail.imdb_id || info.externalid.imdb_id}`}
            target="_blank"
            className="underline hover:text-zinc-50"
          >
            <span className="text-sm">imdb</span>
           
          </a>)}
        </nav>

        {/* Poster & Details */}
        <div className="text-zinc-50 relative">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
              {info.detail.title || info.detail.original_title || info.detail.name || info.detail.original_name}
            </h1>

            <h2 className="flex flex-wrap gap-2 my-2 text-sm md:text-base text-zinc-400">
              <span className="font-semibold">{info.detail.first_air_date.split("-")[0]}</span>
              <span>&#128900;</span>
              <span className="font-semibold">{info.detail.adult ? "R" : "U/A"}</span>
              <span>&#128900;</span>
              <span className="font-semibold">{info.detail.number_of_seasons} Seasons</span>
            </h2>

            <div className="flex flex-col lg:flex-row gap-5 mt-4">
              {/* Poster */}
              <img
                className="shadow-md w-full sm:w-[60%] lg:w-[30%] xl:w-[25%] object-cover h-fit rounded mx-auto lg:mx-0"
                src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.profile_path}`}
                alt={info.detail.title || "title"}
              />

              {/* Detail */}
              <div className="flex flex-col justify-between w-full">
                <div className="flex flex-wrap gap-2">
                  {info.detail.genres.map((g, i) => (
                    <span
                      key={i}
                      className="text-xs md:text-base px-3 py-1 rounded-full border border-zinc-400 font-semibold hover:bg-zinc-700 duration-200 cursor-pointer"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>

                <h1 className="text-xs md:text-sm font-bold text-yellow-400 pl-2 border-l-2 uppercase tracking-[4px] mt-4">
                  Overview
                </h1>
                <p className="text-sm md:text-lg py-3">{info.detail.overview}</p>

                <div className="flex flex-wrap gap-5 mt-2">
                  <div>
                    <h1 className="text-yellow-400 font-bold uppercase text-[0.7rem] tracking-[3px] mb-1">
                      Rating
                    </h1>
                    <div className="text-lg font-bold">
                      <i className="text-yellow-400 ri-star-fill"></i>&nbsp;
                      {info.detail.vote_average}&nbsp;({info.detail.vote_count})
                    </div>
                  </div>

                  <div>
                    <h1 className="text-yellow-400 font-bold uppercase text-[0.7rem] tracking-[3px] mb-1">
                      Popularity
                    </h1>
                    <div className="text-lg font-bold">
                      <i className="text-yellow-400 ri-arrow-up-circle-line"></i>&nbsp;
                      {`${info.detail.popularity.toFixed()}`}
                    </div>
                  </div>
                </div>

                <Link
                  to={`${pathname}/trailer`}
                  className="mt-4 bg-[#6556cd] w-fit py-3 px-4 rounded hover:bg-[#8274dd] duration-300 font-semibold text-sm md:text-lg"
                >
                  <i className="ri-play-mini-fill"></i>&nbsp;Play Trailer
                </Link>
              </div>
            </div>
          </div>

          {/* Watch Providers */}
          {info.watchproviders && info.watchproviders.flatrate && (
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              {info.watchproviders.flatrate && (
                <div>
                  <h1 className="text-yellow-400 font-bold uppercase text-[0.7rem] tracking-[3px] mb-2">Streaming</h1>
                  <div className="flex gap-2 flex-wrap">
                    {info.watchproviders.flatrate.map((w, i) => (
                      <img
                        key={i}
                        className="w-[30px] sm:w-[40px] rounded-md"
                        src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                        alt={w.provider_name}
                        title={w.provider_name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {info.watchproviders.rent && (
                <div>
                  <h1 className="text-yellow-400 font-bold uppercase text-[0.7rem] tracking-[3px] mb-2">Rent/Buy</h1>
                  <div className="flex gap-2 flex-wrap">
                    {info.watchproviders.rent.map((w, i) => (
                      <img
                        key={i}
                        className="w-[30px] sm:w-[40px] rounded-md"
                        src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                        alt={w.provider_name}
                        title={w.provider_name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Outlet />

       {/* Seasons */}
      <div className="w-full h-fit px-4 lg:px-[5%] mt-10">
        <Horizontalcards
          data={info.detail.seasons && info.detail.seasons}
          dropdown="false"
          heading={`All Seasons of ${info.detail.title || info.detail.original_title || info.detail.name || info.detail.original_name}`}
        />
      </div>

      {/* Recommendations */}
      <div className="w-full h-fit px-4 lg:px-[5%] mt-10">
        <Horizontalcards
          data={info.recommendations ? info.recommendations : info.similar}
          dropdown="false"
          heading="Recommended for you"
        />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails