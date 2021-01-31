import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [id, setID] = useState(4);
  const [filter, setFilter] = useState("");

  function onNameInputChange(event) {
    let input = event.target.value;
    setNewName(input);
  }

  function addPerson(event) {
    event.preventDefault();
    let listOfNames = persons.map((person) => person.name);
    if (listOfNames.includes(newName)) {
      alertDuplicateName();
      setNewName("");
      setNewNumber("");
    } else {
      let newPersonsList = [
        ...persons,
        { name: newName, number: newNumber, id: id },
      ];
      setPersons(newPersonsList);
      setNewName("");
      setNewNumber("");
      setID(id + 1);
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
