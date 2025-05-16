import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
    // /person/popular --> API
    //c.profile_path --> add this in cards
      document.title = "BingePlay - people Movies & Tv Shows";
  const navigate = useNavigate();
  const [people, setPeople] = useState([]); 
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true)

  const getPeople = async () => {
    try {
      const { data } = await axios.get(`/person/popular?page=${page}`);
      if(data.results.length > 0){
      setPeople((prev) => [...prev, ...data.results]);
      setPage(prev => prev + 1);
      }else{
        sethasMore(false)
      }
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const refreshHandler = () => {
    if(people.length === 0){
      getPeople();
    }else{
      setPage(1);
      setPeople([]);
      getPeople();
    }
  }

  useEffect(()=>{
    refreshHandler();
}, []);

  return (
    people.length > 0 ? (
    <div className="w-full h-full bg-[#1f1e24]  h-scroll-none">

      <div className="w-full h-fit p-5 flex items-center">
        <i
          onClick={() => navigate(-1)}
          className="text-zinc-400 hover:text-zinc-50 cursor-pointer duration-300 text-2xl ri-arrow-left-line"
        ></i>
         <Topnav />
      </div>


      <div className="heading-and-filters flex gap-2 justify-between items-center px-5 mt-10">
        <h1 className="text-zinc-50 text-4xl font-bold self-start">Popular People</h1>
        {/* <div className="filters flex items-center gap-2">
        <Dropdown title="people" options={["all", "tv", "movie"]} func={(e) => setCategory(e.target.value)}/>
        <Dropdown title="Duration" options={["day", "week"]} func={(e) => setDuration(e.target.value)} />
        </div> */}
      </div> 

     <div className="w-full h-full">
      <InfiniteScroll 
      dataLength={people.length} 
      next={getPeople} 
      hasMore={hasMore} 
      loader={<h1>Loading...</h1>}>
        <Cards data={people} title="people"/>
      </InfiniteScroll>
      </div>


    </div>
  ) : (
   <Loading/>
)
  )
}

export default People