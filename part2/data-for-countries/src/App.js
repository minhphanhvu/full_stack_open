import React from 'react';
import Find from './components/Find.jsx';

function App(props) {
  const { countries } = props; 

  const findCountry = (event) => {
    console.log(event.target.value);
  }

  return (
    <div><Find findCountry={findCountry} /></div>
  );
}

export default App;
