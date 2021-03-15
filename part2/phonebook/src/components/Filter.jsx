import React from 'react';

const Filter = (props) => {
  let { filterContact } = props;
 
  return (
    <div>
      <label htmlFor="filter">filter shown with</label>
      <input name="filter" id="filter" type="text" onChange={filterContact} />
    </div>
  )
}

export default Filter;