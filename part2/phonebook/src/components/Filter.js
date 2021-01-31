import React from "react"

function Filter({onFilterInputChange, filter}){

  return (
    <div>
    filter shown with <input onChange={onFilterInputChange} value={filter}/>
    </div>
  )
}

export default Filter;