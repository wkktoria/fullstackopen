import { useEffect, useState } from "react";
import Countries from "./components/Countries";
import countryService from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [filter, setFilter] = useState("");

  const countriesToShow = filter
    ? countries.filter((country) =>
        country.name.common.toUpperCase().includes(filter.toUpperCase()),
      )
    : countries;

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCountryShow = (event) => {
    const countryToShow = countries.find(
      (country) => country.name.official === event.target.value,
    );
    setCountries([countryToShow]);
  };

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, [filter]);

  if (!countries) {
    return null;
  }

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
      <Countries toShow={countriesToShow} onClick={handleCountryShow} />
    </div>
  );
};

export default App;
