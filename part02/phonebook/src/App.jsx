import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const Notification = ({ message, isSuccess }) => {
  if (!message) {
    return null;
  }

  return (
    <div id="notification" className={isSuccess ? "success" : "error"}>
      {message}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    personService.getAll().then((initialValue) => {
      setPersons(initialValue);
    });
  }, []);

  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setShowAll(false);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleAddClick = (event) => {
    event.preventDefault();
    const personInDb = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (personInDb) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const id = personInDb.id;
        const updatedPerson = {
          id,
          name: personInDb.name,
          number: newNumber,
        };
        personService
          .update(id, updatedPerson)
          .then((returnedPerson) => {
            setIsSuccess(true);
            setMessage(`Updated ${returnedPerson.name}'s number`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);

            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch(() => {
            setIsSuccess(false);
            setMessage(
              `Information of ${newName} has already been removed from server`
            );
            setTimeout(() => {
              setMessage(null);
            }, 5000);

            setPersons(persons.filter((person) => person.id !== id));
          });
      }
    } else {
      const newPerson = {
        id: (persons.length + 1).toString(),
        name: newName,
        number: newNumber,
      };
      personService.create(newPerson).then((returnedPerson) => {
        setIsSuccess(true);
        setMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);

        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleDeleteClick = (event) => {
    event.preventDefault();
    const id = event.target.value;
    const personToDelete = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deletePerson(id)
        .then((deletedPerson) => {
          setIsSuccess(true);
          setMessage(`Deleted ${personToDelete.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);

          setPersons(
            persons.filter((person) => person.id !== deletedPerson.id)
          );
        })
        .catch(() => {
          setIsSuccess(false);
          setMessage(
            `Information of ${personToDelete.name} has already been removed from server`
          );
          setTimeout(() => {
            setMessage(null);
          }, 5000);

          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} isSuccess={isSuccess} />

      <Filter value={filter} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
        onClick={handleAddClick}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDeleteClick={handleDeleteClick} />
    </div>
  );
};

export default App;
