import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleAddClick = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
    };

    if (
      persons.some(
        (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
      )
    ) {
      alert(`${newPerson.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:
          <input
            value={newName}
            onChange={(event) => handleNameChange(event)}
          />
        </div>
        <div>
          <button type="submit" onClick={() => handleAddClick(event)}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  );
};

export default App;
