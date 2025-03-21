const Person = ({ id, name, number }) => {
  return (
    <div key={id}>
      {name} {number}
    </div>
  );
};

export default Person;
