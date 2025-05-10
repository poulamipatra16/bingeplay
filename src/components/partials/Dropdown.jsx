import React from "react";

const Dropdown = ({title, options, func}) => {
  return (
    <div className="select" onChange={func} >
      {/* In react we dont use selected attribute in option rather we connect the value of option element with defaultvalue attribute of select element */}
      <select defaultValue={0} name="format" id="format">
        <option value={0} disabled>
          {title}
        </option>
        {options.map((option, index) => { 
          return <option key={index} value={option}>
            {option.includes("_")? `${option.charAt(0).toUpperCase()}${option.split("_").join(" ").slice(1)}` :`${option.charAt(0).toUpperCase()}${option.slice(1)}`}
            </option>})}
      </select>
    </div>
  )
}

export default Dropdown