import { useState, useEffect } from "react";
import Weather from "./Weather";

function Country({ country }) {
  const [weatherStatus, setWeatherStatus] = useState(false);
  const [temp, setTemp] = useState("");
  const [wind, setWind] = useState("");

  async function getWeather() {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    );
    let data = await response.json();
    setTemp(data.main.temp);
    setWind(data.wind);
    setWeatherStatus(true);
    }

  useEffect(() => getWeather(), [])

  return (
    <section>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => {
          return <li key={language.iso639_1}>{language.name}</li>;
        })}
      </ul>
      <img src={country.flag} alt="country-flag" />
      {weatherStatus && <Weather country={country} temp={temp} wind={wind} />}
    </section>
  );
}

export default Country;
