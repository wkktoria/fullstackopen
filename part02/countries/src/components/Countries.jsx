import CountryInfo from "./CountryInfo";

const Countries = ({ toShow }) => {
  if (toShow.length === 1) {
    return <CountryInfo country={toShow[0]} />;
  } else if (toShow.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  return (
    <div>
      {toShow.map((country) => (
        <div key={country.name.official}>{country.name.common}</div>
      ))}
    </div>
  );
};

export default Countries;
