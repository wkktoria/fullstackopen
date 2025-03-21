import Person from "./Person";

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person id={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default Persons;
