import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import "remixicon/fonts/remixicon.css";

const App = () => {
  return (
    <div className="w-screen h-screen bg-[#1f1e24] flex">

 
      <Routes>
        <Route path="/bingeplay" element={<Home/>} />
      </Routes>

    </div>
  )
}

export default App