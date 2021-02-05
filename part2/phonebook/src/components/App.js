import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import PersonService from "../PersonService";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    PersonService.getAll().then((returnedPersons) =>
      setPersons(returnedPersons)
    );
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  function onNameInputChange(event) {
    let input = event.target.value;
    setNewName(input);
  }

  function addPerson(event) {
    event.preventDefault();
    let listOfNames = persons.map((person) => person.name);
    // Check for duplicate persons
    if (listOfNames.includes(newName)) {
      alertDuplicateName();
      setNewName("");
      setNewNumber("");
    } else {
      let newPerson = { name: newName, number: newNumber };
      PersonService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
      setNewName("");
      setNewNumber("");
    }
  }

  function alertDuplicateName() {
    alert(`${newName} is already added to phonebook`);
  }

  function onNumberInputChange(event) {
    let input = event.target.value;
    setNewNumber(input);
  }

  function implementFilter() {
    let filteredPersons = persons.filter((person) => {
      let lowerCaseName = person.name.toLowerCase();
      let lowerCaseFilter = filter.toLowerCase();
      return lowerCaseName.startsWith(lowerCaseFilter);
    });
    return filteredPersons;
  }

  function onFilterInputChange(event) {
    let input = event.target.value;
    setFilter(input);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilterInputChange={onFilterInputChange} filter={filter} />
      <h2>add a new person</h2>
      <PersonForm
        addPerson={addPerson}
        onNameInputChange={onNameInputChange}
        onNumberInputChange={onNumberInputChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={implementFilter()} />
    </div>
  );
};

export default App;
