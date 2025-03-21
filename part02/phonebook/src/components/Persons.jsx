import Person from "./Person";

const Persons = ({ persons, onDeleteClick }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person
          key={person.id}
          id={person.id}
          name={person.name}
          number={person.number}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </div>
  );
};

export default Persons;
