import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toUpperCase().startsWith(filter.toUpperCase()),
      )
    : persons;

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };
    const person = persons.find((person) => person.name === personObject.name);

    if (person) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const changedPerson = { ...person, number: newNumber };

        personService
          .update(changedPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== changedPerson.id ? person : returnedPerson,
              ),
            );
            setNewName("");
            setNewNumber("");

            setNotificationMessage(`Updated ${changedPerson.name}'s number`);

            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch(() => {
            setPersons(
              persons.filter((person) => person.id !== changedPerson.id),
            );

            setIsError(true);
            setNotificationMessage(
              `Information of ${changedPerson.name} has already been deleted from the server`,
            );

            setTimeout(() => {
              setIsError(false);
              setNotificationMessage(null);
            }, 5000);
          });
      }
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");

        setNotificationMessage(`Added ${personObject.name}`);

        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
    }
  };

  const removePerson = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() => {
          setPersons(persons.filter((person) => person.id !== id));

          setIsError(true);
          setNotificationMessage(
            `Information of ${name} has already been deleted from the server`,
          );

          setTimeout(() => {
            setIsError(false);
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isError={isError} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        valueName={newName}
        onChangeName={handleNameChange}
        valueNumber={newNumber}
        onChangeNumber={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons toShow={personsToShow} onClickDelete={removePerson} />
    </div>
  );
};

export default App;
