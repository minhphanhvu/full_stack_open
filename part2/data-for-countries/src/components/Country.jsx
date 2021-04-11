import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Country = (props) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const { name, capital, population, languages, flag } = props;
  const query = 'http://api.weatherstack.com/current?access_key=' + API_KEY + '&query=' + capital;
  const [ weather, setWeather ] = useState({});
  let id = 0;

  useEffect(() => {
    axios
      .get(query).then(response => {
        const currentWeather = response.data.current;
        setWeather({
          temperature: currentWeather.temperature,
          icon: currentWeather.weather_icons[0],
          windSpeed: currentWeather.wind_speed,
          windDir: currentWeather.wind_dir
        })
      })
  }, [])

  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h2>languages</h2>
      <ul>
        {languages.map(language => <li key={id++}>{language.name}</li>)}
      </ul>
      <img alt="flag" src={flag} width="100px" height="100px" />
      <h3>Weather in {capital}</h3>
      <p>temperature: {weather.temperature} Celcius</p>
      <img alt="weather-icon" src={weather.icon} width="80px" height="80px" />
      <p><strong>wind: </strong>{weather.windSpeed} mph direction {weather.windDir}</p>
    </div>
  )
}

export default Country;
