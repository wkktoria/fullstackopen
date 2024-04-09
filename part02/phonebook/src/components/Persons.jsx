const Persons = ({ toShow, onClickDelete }) => {
  return (
    <>
      {toShow.map(({ id, name, number }) => (
        <div key={id}>
          {name} {number}{" "}
          <button onClick={() => onClickDelete(name, id)}>delete</button>
        </div>
      ))}
    </>
  );
};

export default Persons;
