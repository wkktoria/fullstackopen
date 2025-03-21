const Person = ({ id, name, number, onDeleteClick }) => {
  return (
    <div>
      {name} {number}
      <button value={id} onClick={onDeleteClick}>
        delete
      </button>
    </div>
  );
};

export default Person;
