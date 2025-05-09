import React, { useEffect, useState } from "react";
import loader from "/loading.gif";
import server from "/server_unavailable.gif";

const Loading = () => {
  let [count, setCount] = useState(0);
  
  useEffect(()=>{
    const interval = setInterval(()=>{
      count < 20 ? setCount(prev=> prev+1) : clearInterval(interval) && setCount(0);
    },1000)
    return () => clearInterval(interval);
  },[])
  return (
    <div className="w-full h-screen bg-[#000] flex justify-center flex-col items-center">
        {count < 20 ? <img src={loader} alt="loader" /> : <img src={server} alt="loader" />}
        {count >= 20 && <h1 className="text-zinc-50 text-3xl uppercase font-bold">Something went wrong!</h1>}
    </div>
  )
}

export default Loading