import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService
      .getByCapital(country.capital[0])
      .then((initialWeather) => {
        setWeather(initialWeather);
      })
      .catch(() => {
        weatherService
          .getByCountry(country.name.common)
          .then((initialWeather) => {
            setWeather(initialWeather);
          });
      });
  }, []);

  if (!weather) {
    return null;
  }

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

      <h3>Weather in {country.capital[0]}</h3>
      <p>temperature {weather.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Country;
