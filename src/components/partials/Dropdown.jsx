import React from "react";

const Dropdown = ({title, options, func}) => {
  return (
    <div className="select" onChange={func} >
      <select name="format" id="format">
        <option disabled>
          {title}
        </option>
        {options.map((option, index) => { 
          return <option key={index} value={option}>
            {option.charAt(0).toUpperCase()}{option.slice(1)}
            </option>})}
      </select>
    </div>
  )
}

export default Dropdown