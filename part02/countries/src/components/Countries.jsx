import Country from "./Country";

const Countries = ({ toShow, onClick }) => {
  if (toShow.length === 1) {
    return <Country country={toShow[0]} />;
  } else if (toShow.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  return (
    <div>
      {toShow.map((country) => (
        <div key={country.name.official}>
          {country.name.common}
          <button value={country.name.official} onClick={onClick}>
            show
          </button>
        </div>
      ))}
    </div>
  );
};

export default Countries;
