import React from 'react'

const Filter = ({ filterContact }) => {
 
  return (
    <div>
      <label htmlFor="filter">Filter shown with</label>
      <input name="filter" id="filter" type="text" onChange={filterContact} />
    </div>
  )
}

export default Filter