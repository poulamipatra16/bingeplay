import React, { useRef, useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";

const Horizontalcards = ({ data, setcat, heading, title, dropdown=true }) => {
  const scrollRef = useRef();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Check arrow visibility based on scroll position
  const checkForArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 0);
    setShowRightArrow(el.scrollLeft + el.offsetWidth < el.scrollWidth);
  };

  useEffect(() => {
    checkForArrows();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkForArrows);
      window.addEventListener("resize", checkForArrows);
    }
    return () => {
      if (el) {
        el.removeEventListener("scroll", checkForArrows);
        window.removeEventListener("resize", checkForArrows);
      }
    };
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -1000, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 1000, behavior: "smooth" });
  };

  return data.length > 0 ? (
    <div className="group w-full h-fit pb-4 px-5">
      <div className="headings text-[#fffffff3] flex justify-between items-center my-2">
        <h1 className="text-2xl font-semibold text-[#fffffff3]">{heading}</h1>
        {dropdown===true&& <Dropdown
          title="Filter"
          options={["tv", "movie", "all"]}
          func={(e) => setcat(e.target.value)}
        />}
      </div>

      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <div className="absolute left-0 z-10 h-full w-20 flex items-center justify-start bg-gradient-to-l from-transparent to-[#1f1e24]">
            <i
              onClick={scrollLeft}
              className="text-[#d4d4d4] hover:text-[#fffffff3] text-2xl ri-arrow-left-s-line cursor-pointer"
            ></i>
          </div>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <div className="absolute right-0 z-10 h-full w-20 flex items-center justify-end bg-gradient-to-r from-transparent to-[#1f1e24]">
            <i
              onClick={scrollRight}
              className="text-[#d4d4d4] hover:text-[#fffffff3] text-2xl ri-arrow-right-s-line cursor-pointer"
            ></i>
          </div>
        )}

        {/* Card Container */}
        <div
          ref={scrollRef}
          className="w-full flex items-center overflow-x-auto gap-2  h-scroll-none"
        >
          {data.map((data) => (
            <Link to={`/${data.media_type || title}/details/${data.id}`}
              key={data.id}
              className="sm:w-[30%] sm:h-[250px] md:w-[25%] md:h-[250px] lg:w-[15%] lg:[250px] w-[40%] h-[250px] rounded overflow-hidden shrink-0"
            >
              <img
                className="w-full h-full object-cover"
                src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                alt={data.title || "title"}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  ) : (<h1>Nothing to Show</h1>)
};

export default Horizontalcards;
