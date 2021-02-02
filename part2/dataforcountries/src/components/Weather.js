function Weather({country, temp, wind}) {
  return (
    <>
      <h2>Weather in {country.capital}</h2>
      <div>temperature: {temp} Celcius</div>
      <div>wind: {wind.speed}m/s direction {wind.deg} degrees</div>
    </>
  )
}

export default Weather;