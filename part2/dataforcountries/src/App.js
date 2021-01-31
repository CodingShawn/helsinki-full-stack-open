import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");

  function handleFilterChange(event){
    setSearch(event.target.value);
  }


  
  return (
    <div className="App">
      <div>
        find countries<input value={search} onChange={handleFilterChange}></input>
      </div>
    </div>
  );
}

export default App;
