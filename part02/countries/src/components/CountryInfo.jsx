const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        capital {country.capital[0]} <br /> area {country.area}
      </p>
      <h4>languages</h4>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img width={150} height={150} src={country.flags.svg} />
    </div>
  );
};

export default CountryInfo;
