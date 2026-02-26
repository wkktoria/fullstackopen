const Country = ({ name, capital, area, languages, flags }) => {
  return (
    <>
      <h2>{name}</h2>
      <p>Capital {capital}</p>
      <p>Area {area}</p>

      <h3>Languages</h3>
      <ul>
        {Object.entries(languages).map(([code, name]) => (
          <li key={code}>{name}</li>
        ))}
      </ul>

      <img src={flags.png} alt={flags.alt} />
    </>
  );
};

export default Country;
