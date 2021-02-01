import { useEffect, useState } from "react";
import Country from "./components/Country";
import CountryList from "./components/CountryList"

function App() {
  const [countries, setCountries] = useState([]);
  const [filterResults, setFilterResults] = useState([]);

  function handleFilterChange(event) {
    let thisSearch = event.target.value.toLowerCase();
    let tempFilterResults = countries.filter((country) =>
      country.name.toLowerCase().includes(thisSearch)
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
          {filterResults.map((country) => {
            return <CountryList country={country} key={country.alpha3Code}/>;
          })}
        </div>
      );
    } else if (filterResults.length === 1) {
      let country = filterResults[0];
      return <Country country={country} />;
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
