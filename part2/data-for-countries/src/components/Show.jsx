import React from 'react';

const Show = (props) => {
  const { country } = props;
  let { searchEntries } = props;

  const showCountry = () => {
    searchEntries.length = 1;
    searchEntries[0] = [country];
    console.log(searchEntries);
  }

  return (
    <div>
      <button onClick={showCountry}>Show</button>
    </div>
  )
}

export default Show;
