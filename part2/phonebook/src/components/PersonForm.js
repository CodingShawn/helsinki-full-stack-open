import React from "react";

function PersonForm({
  addPerson,
  onNumberInputChange,
  onNameInputChange,
  newName,
  newNumber,
}) {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={onNameInputChange} value={newName} />
      </div>
      <div>
        number: <input onChange={onNumberInputChange} value={newNumber}></input>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;
