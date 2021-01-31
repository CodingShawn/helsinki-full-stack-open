import React from "react";

function Persons({personsToShow}) {
  return (
    <>
      {personsToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </>
  );
}

export default Persons;
