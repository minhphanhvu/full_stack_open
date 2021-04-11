import React from 'react';
import Country from './Country.jsx';

const Display = (props) => {
  const { searchEntries } = props;
  const size = searchEntries.length;
  let id = 0;

  if (size > 10) {

    return (
      <div>
        Too many matches, please specify another filter
      </div>
    )
  } else if (size > 1 && size <= 10) {

      return (
        <div>
          {searchEntries.map(country => {
            return (
              <div key={id++}>
                <p>{country.name}</p>
                <button>Show</button>
              </div>
            );
          })}
        </div>
      )
    }
    else if (size === 1) {
      const { name, capital, population, languages, flag } = searchEntries[0];

      return (
        <div>
          <Country name={name} capital={capital} population={population} 
                   languages={languages} flag={flag}
          />
        </div>
      )
    } else {
      
      return (
        <div>
          <p>No match, please try again.</p>
        </div>
      )
    }
}

export default Display;
