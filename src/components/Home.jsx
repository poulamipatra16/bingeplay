import React, { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import Horizontalcards from "./partials/Horizontalcards";
import Loading from "./Loading";


const Home = () => {
    document.title = "BingePlay - Home";
    const [headerbg, setHeaderbg] = useState(null);
    const [trending, setTrending] = useState(null);
    const [category, setCategory] = useState("all");
   

    const getHeaderbg = async() => {
      try{
        const {data} = await axios.get("/trending/all/day");
          setHeaderbg(data.results);
      }catch(e){
        console.log(`Error: ${e}`)
      }
    }

    const getTrending = async() => {
      try{
        const {data} = await axios.get(`/trending/${category}/day`);
        setTrending(data.results);
      }catch(e){
        console.log(`Error: ${e}`)
      }
    }

    useEffect(()=>{
      !headerbg && getHeaderbg();
      category && getTrending();
    }, [category])

  return headerbg && trending ? (
    <>
    <Sidenav/>   
    <div className="w-[80%] h-[100vh] overflow-y-auto">
      <Topnav/>
      <Header data={headerbg}/>
      <Horizontalcards data={trending} heading="Trending" setcat={setCategory} title={category}/>
    </div>
    </>
  ) : (
    <Loading/>
  )
}

export default Home