import React from 'react';

const Country = (props) => {
  const { name, capital, population, languages, flag } = props;
  let id = 0;

  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h2>languages</h2>
      <ul>
        {languages.map(language => <li key={id++} >{language.name}</li>)}
      </ul>
      <img alt="flag" src={flag} width="100px" height="100px" />
    </div>
  )
}

export default Country;
