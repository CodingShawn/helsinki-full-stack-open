import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [filterResults, setFilterResults] = useState([]);

  function handleFilterChange(event) {
    let thisSearch = event.target.value.toLowerCase();
    let tempFilterResults = countries.filter((country) =>
      country.name.toLowerCase().startsWith(thisSearch)
    );
    setFilterResults(tempFilterResults);
  }

  useEffect(() => {
    retrieveData();
  }, []);

  async function retrieveData() {
    let response = await fetch("https://restcountries.eu/rest/v2/all");
    let data = await response.json();
    setCountries(data);
  }

  function showFilterResults() {
    if (filterResults.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (filterResults.length > 1) {
      return (
        <div>
          {filterResults.map((result) => {
            return <div key={result.alpha3Code}>{result.name}</div>;
          })}
        </div>
      );
    } else if (filterResults.length === 1) {
      let country = filterResults[0];

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
        </section>
      );
    }
  }

  return (
    <div className="App">
      <div>
        find countries
        <input onChange={handleFilterChange}></input>
      </div>
      {showFilterResults()}
    </div>
  );
}

export default App;
