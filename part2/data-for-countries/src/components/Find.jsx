import React from 'react';

const Find = (props) => {
  let { findCountry } = props;

  return (
    <div>
      <label htmlFor="find">find countries</label>
      <input name="find" id="find" type="text" onChange={findCountry} />
    </div>
  )
}

export default Find;
