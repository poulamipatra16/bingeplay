import { useEffect } from "react";
import { asyncloadpeople, removepeople } from "../store/actions/peopleActions";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import Horizontalcards from "./partials/Horizontalcards";
import { Outlet } from "react-router-dom";

const PeopleDetails = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.people);
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(info);
  useEffect(() => {
    dispatch(asyncloadpeople(id));
    return () => {
      dispatch(removepeople());
    };
  }, [id]);
  return info ? (
    <div className="w-full h-fit">
      <div className="bg-[#1f1e24] px-4 lg:px-[10%] pb-10">
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
            (info.externalid.wikidata_id !== "undefined" && (
              <a
                href={`https://www.wikidata.org/wiki/${
                  info.detail.wikidata_id || info.externalid.wikidata_id
                }`}
                target="_blank"
              >
                <i className="ri-earth-line hover:text-zinc-50"></i>
              </a>
            ))}
          <a
            href={`https://www.imdb.com/name/${
              info.externalid.imdb_id || info.detail.imdb_id
            }`}
            target="_blank"
            className="underline hover:text-zinc-50"
          >
            <span className="text-sm">imdb</span>
          </a>
        </nav>

        {/* Poster & Details */}
        <div className="text-zinc-50 relative">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
              {info.detail.title ||
                info.detail.original_title ||
                info.detail.name ||
                info.detail.original_name}
            </h1>

            <h2 className="flex flex-wrap gap-2 my-2 text-sm md:text-base text-zinc-400">
              <span className="font-semibold">
                {info.detail.known_for_department === "Acting" && "Actor"}
              </span>
              {info.movieCredits.crew.length > 0 &&
                info.movieCredits.crew.filter((c) => c.job === "Producer")
                  .length > 0 && <span>&#128900;</span>}
              {info.movieCredits.crew.length > 0 && (
                <span className="font-semibold">
                  {info.movieCredits.crew.filter((c) => c.job === "Producer")
                    .length > 0 && "Producer"}
                </span>
              )}
              {info.movieCredits.crew.length > 0 &&
                info.movieCredits.crew.filter((c) => c.job === "Director")
                  .length > 0 && <span>&#128900;</span>}
              {info.movieCredits.crew.length > 0 && (
                <span className="font-semibold">
                  {info.movieCredits.crew.filter((c) => c.job === "Director")
                    .length > 0 && "Director"}
                </span>
              )}
            </h2>

            <div className="flex flex-col lg:flex-row gap-5 mt-4">
              {/* Poster */}
              <div className=" img-links md:w-full lg:w-[40%] flex-col">
                <img
                  className="shadow-md sm:w-[60%] md:w-[60%] lg:w-full object-cover h-fit rounded mx-auto lg:mx-0"
                  src={`https://image.tmdb.org/t/p/original/${
                    info.detail.poster_path || info.detail.profile_path
                  }`}
                  alt={info.detail.title || "title"}
                />

                {/* Links */}
                <div className="links mt-2 text-3xl flex gap-2 text-zinc-400">
                  <a
                    href={`https://www.facebook.com/${info.externalid.facebook_id}`}
                  >
                    <i className="ri-facebook-box-fill"></i>
                  </a>
                  <a
                    href={`https://www.instagram.com/${info.externalid.instagram_id}/?hl=en`}
                  >
                   <i className="ri-instagram-fill"></i>
                  </a>
                  <a
                    href={`https://x.com/${info.externalid.twitter_id}?`}
                  >
                   <i class="ri-twitter-x-line"></i>
                  </a>
                </div>
              </div>

              <div className="flex flex-col justify-start w-full">
                <h1 className="text-xs md:text-sm font-bold text-yellow-400 pl-2 border-l-2 uppercase tracking-[4px]">
                  Biography
                </h1>

                <div className="birth-death mt-2 flex gap-3">
                  <div className="font-semibold text-lg">
                    <span className="font-bold">Born&nbsp;</span>
                    <span className="font-semibold">
                      {info.detail.birthday}
                    </span>
                  </div>
                  {info.detail.deathday && (
                    <div className="text-yellow-400 font-semibold text-base">
                      <span className="font-bold">Death&nbsp;</span>
                      <span className="font-semibold">
                        {info.detail.deathday}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-zinc-400">
                  <span className="font-bold">Place of Birth&nbsp;</span>
                  <span> {info.detail.place_of_birth}</span>
                </div>

                <p className="text-sm md:text-lg py-3">
                  {info.detail.biography}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Outlet />

      {/* Recommendations */}
      <div className="w-full h-fit px-4 lg:px-[5%] mt-10">
        <Horizontalcards
          data={info.combinedCredits && info.combinedCredits.cast}
          dropdown="false"
          heading="Known For"
        />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PeopleDetails;
