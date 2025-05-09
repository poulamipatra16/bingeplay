import React, { useRef, useState, useEffect } from "react";
import Dropdown from "./Dropdown";

const Horizontalcards = ({ data, setcat, heading }) => {
  const scrollRef = useRef();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Check arrow visibility based on scroll position
  const checkForArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 0);
    setShowRightArrow(el.scrollLeft + el.offsetWidth < el.scrollWidth);
    console.log("1: ",el);
    console.log("2: ",el.scrollLeft);
    console.log("3: ",el.offsetWidth);
    console.log("4: ",el.scrollWidth);
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

  return (
    <div className="group w-full h-fit pb-4 px-5">
      <div className="headings text-zinc-50 flex justify-between items-center my-2">
        <h1 className="text-2xl font-semibold text-zinc-50">{heading}</h1>
        <Dropdown
          title="Filter"
          options={["tv", "movie", "all"]}
          func={(e) => setcat(e.target.value)}
        />
      </div>

      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <div className="absolute left-0 z-10 h-full w-20 flex items-center justify-start bg-gradient-to-l from-transparent to-[#1f1e24]">
            <i
              onClick={scrollLeft}
              className="text-zinc-400 hover:text-zinc-50 text-2xl ri-arrow-left-s-line cursor-pointer"
            ></i>
          </div>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <div className="absolute right-0 z-10 h-full w-20 flex items-center justify-end bg-gradient-to-r from-transparent to-[#1f1e24]">
            <i
              onClick={scrollRight}
              className="text-zinc-400 hover:text-zinc-50 text-2xl ri-arrow-right-s-line cursor-pointer"
            ></i>
          </div>
        )}

        {/* Card Container */}
        <div
          ref={scrollRef}
          className="w-full flex items-center overflow-x-auto gap-2  h-scroll-none"
        >
          {data.map((data) => (
            <div
              key={data.id}
              className="w-[15%] h-[225px] bg-red-400 rounded overflow-hidden shrink-0"
            >
              <img
                className="w-full h-full object-cover"
                src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                alt={data.title || "title"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Horizontalcards;
