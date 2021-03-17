import React , { useState } from 'react';
import Find from './components/Find.jsx';
import Display from './components/Display.jsx';

function App(props) {
  const { countries } = props;
  const [ searchEntries, setEntries ] = useState(countries);

  const findCountry = (event) => {
    let query = event.target.value;
    
    setEntries(countries.filter(country => country.name.toLowerCase().includes(query)));
  }

  return (
    <div>
      <Find findCountry={findCountry} />
      <Display searchEntries={searchEntries} />
    </div>
  );
}

export default App;
