import React from "react";
import errImg from "/404.gif";
import { useNavigate } from "react-router-dom";


const notFound = () => {
  const navigate =  useNavigate();
  return (
    <div className="w-screen h-screen bg-[#181717] flex flex-col justify-center items-center fixed z-[20] top-0 left-[50%] -translate-x-[50%]">
       <img src={errImg} alt="error_404" />
       <button
       className="w-[20vw] bg-[#fff] text-[#181717] font-bold text-base px-5 py-2 rounded-full"
       onClick={() => navigate(-1)}>Back</button>
    </div>
  )
}

export default notFound;