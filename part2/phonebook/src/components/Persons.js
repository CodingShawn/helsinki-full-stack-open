import React from "react";

function Persons({personsToShow, deletePerson}) {
  return (
    <>
      {personsToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button>
        </div>
      ))}
    </>
  );
}

export default Persons;
