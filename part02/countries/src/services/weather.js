import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getWeather = (name, code) => {
  const request = axios.get(
    baseUrl + `?q=${name},${code}&units=metric&appid=${apiKey}`,
  );
  return request.then((response) => response.data);
};

export default { getWeather };
