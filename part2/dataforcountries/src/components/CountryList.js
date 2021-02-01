import { useState } from "react";
import Country from "./Country";

function CountryList({ country }) {
  const [showView, setShowView] = useState(false);

  if (showView) {
    return (
      <>
        <div>
          {country.name}
          <button onClick={() => setShowView(!showView)}>hide</button>
        </div>
        <Country country={country} />
      </>
    );
  } else {
    return (
      <div>
        {country.name}
        <button onClick={() => setShowView(!showView)}>show</button>
      </div>
    );
  }
}

export default CountryList;
