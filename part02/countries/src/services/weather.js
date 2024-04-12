import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const api_key = import.meta.env.VITE_OPENWEATHER_API_KEY;

const getByCapital = (capital) => {
  const request = axios.get(
    `${baseUrl}?q=${capital}&units=metric&appid=${api_key}`,
  );
  return request.then((response) => response.data);
};

const getByCountry = (country) => {
  const request = axios.get(
    `${baseUrl}?q=${country}&units=metric&appid=${api_key}`,
  );
  return request.then((response) => response.data);
};

export default { getByCapital, getByCountry };
