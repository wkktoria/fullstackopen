import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import countryService from "./services/countries";
import Country from "./components/Country";
import CountryLine from "./components/CountryLine";

function App() {
  const [countries, setCountries] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    countryService.getAll().then((initialValue) => {
      setCountries(initialValue);
    });
  }, []);

  const countriesToShow = showAll
    ? countries
    : countries.filter(
        (country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase()) ||
          country.name.official.toLowerCase().includes(filter.toLowerCase()),
      );

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setShowAll(false);
  };

  const handleOnClick = (event, name) => {
    setFilter(name);
    setShowAll(false);
  };

  return (
    <>
      <Filter value={filter} onChange={handleFilterChange} />

      {countriesToShow.length === 1 ? (
        <Country
          name={countriesToShow[0].name.common}
          capital={countriesToShow[0].capital}
          area={countriesToShow[0].area}
          languages={countriesToShow[0].languages}
          flags={countriesToShow[0].flags}
        />
      ) : countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        countriesToShow.map((country) => (
          <CountryLine
            key={country.name.common}
            name={country.name.common}
            onClick={(event) => handleOnClick(event, country.name.common)}
          />
        ))
      )}
    </>
  );
}

export default App;
