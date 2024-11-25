import { useState } from "react";
import axios from "axios";
import {
  WiSnow,
  WiRain,
  WiFog,
  WiWindy,
  WiCloudy,
  WiDayCloudy,
  WiNightCloudy,
  WiDaySunny,
  WiNightClear,
} from "react-icons/wi";

const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;

const weatherIconMap = {
  snow: <WiSnow size={48} color="#A9C6E9" />,
  rain: <WiRain size={48} color="#3498db" />,
  fog: <WiFog size={48} color="#BDC3C7" />,
  wind: <WiWindy size={48} color="#FF5733" />,
  cloudy: <WiCloudy size={48} color="#95A5A6" />,
  "partly-cloudy-day": <WiDayCloudy size={48} color="#F39C12" />,
  "partly-cloudy-night": <WiNightCloudy size={48} color="#34495E" />,
  "clear-day": <WiDaySunny size={48} color="#FFDC00" />,
  "clear-night": <WiNightClear size={48} color="#2C3E50" />,
};

const WeatherWidget = () => {
  const [city, setCity] = useState("Iasi, Romania");
  const [temperature, setTemperature] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [condition, setCondition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCityChange = (e) => setCity(e.target.value);

  const fetchWeather = () => {
    setLoading(true);
    setError(null);

    axios
      .get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=YRDYQJYA4PCCSAQPB7F4M87TT&contentType=json`
      )
      .then((response) => {
        const data = response.data;

        if (data && data.currentConditions) {
          const tempInFahrenheit = data.currentConditions.temp;
          const feelsLikeInFahrenheit = data.currentConditions.feelslike;
          const weatherCondition = data.currentConditions.icon;

          setTemperature(fahrenheitToCelsius(tempInFahrenheit));
          setFeelsLike(fahrenheitToCelsius(feelsLikeInFahrenheit));
          setCondition(weatherCondition);
        } else {
          setError("Invalid city or data not found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch weather data");
        setLoading(false);
        console.error(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-teal-400 text-white p-6 shadow-xl rounded-t-lg flex justify-between items-center max-w-full md:max-w-md mx-auto">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          Weather Information
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col mb-4">
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city name"
            className="p-2 rounded-lg border border-transparent text-black w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300 mb-3"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 self-center mt-4 transition duration-300"
          >
            Get Weather
          </button>
        </form>
        {loading && (
          <p className="text-sm text-gray-100">Loading weather data...</p>
        )}
        {error && <p className="text-sm text-red-300">{error}</p>}

        {temperature !== null && feelsLike !== null && !loading && !error ? (
          <div className="flex items-center">
            <div className="mr-4">
              <p className="text-sm font-semibold text-white">
                Temperature:{" "}
                <span className="text-lg">{temperature.toFixed(1)}°C</span>
              </p>
              <p className="text-sm font-semibold text-white">
                Feels Like:{" "}
                <span className="text-lg">{feelsLike.toFixed(1)}°C</span>
              </p>
            </div>
            <div>{condition && weatherIconMap[condition]}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WeatherWidget;
