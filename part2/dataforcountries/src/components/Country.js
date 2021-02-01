function Country({ country }) {
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

export default Country;
