import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Alert from "./Alert";
import PersonService from "../PersonService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [alert, setAlert] = useState(null);
  const [ifError, setIfError] = useState(false);

  useEffect(() => {
    PersonService.getAll().then((returnedPersons) =>
      setPersons(returnedPersons)
    );
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  function showAlert(alert, ifError = false) {
    setIfError(ifError);
    setAlert(alert);
    setTimeout(() => setAlert(null), 5000);
  }

  function onNameInputChange(event) {
    let input = event.target.value;
    setNewName(input);
  }

  function addPerson(event) {
    event.preventDefault();
    let listOfNames = persons.map((person) => person.name);
    // Check for duplicate persons
    let newPerson = { name: newName, number: newNumber };
    if (listOfNames.includes(newName)) {
      let targetId = persons.find((person) => person.name === newName).id;
      updatePerson(newPerson, targetId);
    } else {
      PersonService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
      showAlert(`Added ${newName}`);
    }
    setNewName("");
    setNewNumber("");
  }

  function updatePerson(person, targetId) {
    if (
      window.confirm(
        `${person.name} is already added to phonebook. Replace the old number with a new one?`
      )
    ) {
      PersonService.update(person, targetId)
        .then(() => {
          PersonService.getAll().then((returnedPersons) =>
            setPersons(returnedPersons)
          );
          showAlert(`Updated ${newName}'s number`);
        })
        .catch((error) => {
          showAlert(
            `Information of ${newName} has already been removed from server`,
            true
          );
        });
    }
  }

  function deletePerson(person) {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      PersonService.deletePerson(person);
      PersonService.getAll().then((returnedPersons) =>
        setPersons(returnedPersons)
      );
    }
  }

  // function alertDuplicateName() {
  //   alert(`${newName} is already added to phonebook`);
  // }

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
      <Alert alert={alert} ifError={ifError} />
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
      <Persons personsToShow={implementFilter()} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
