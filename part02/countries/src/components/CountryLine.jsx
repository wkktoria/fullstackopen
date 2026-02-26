const CountryLine = ({ name, onClick }) => {
  return (
    <div>
      {name} <button onClick={onClick}>Show</button>
    </div>
  );
};

export default CountryLine;
