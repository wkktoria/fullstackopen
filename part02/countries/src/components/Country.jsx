import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const Country = ({ name, code, capital, area, languages, flags }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService.getWeather(capital, code).then((weatherData) => {
      setWeather(weatherData);
    });
  }, [capital, code]);

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

      <h3>Weather in {capital}</h3>
      {weather && (
        <div>
          <p>Temperature {weather.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </>
  );
};

export default Country;
