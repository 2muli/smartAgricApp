import React, { useState } from "react";
import "./weather.css";

const WeatherForecast = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const apiKey = import.meta.env.VITE_APP_WEATHER_KEY;

  // Fetch 5-day weather forecast
  const fetchWeather = async (location) => {
    if (!location) return;

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=no&alerts=no`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "City not found");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };
  console.log(weatherData)

  // Fetch city suggestions as user types
  const fetchLocationSuggestions = async () => {
    if (!location) return;

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${location}`
      );

      if (!response.ok) {
        throw new Error("Error fetching location suggestions");
      }

      const data = await response.json();

      const filteredSuggestions = data.filter((city) =>
        city.name.toLowerCase().startsWith(location.toLowerCase())
      );

      setSuggestions(filteredSuggestions);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    fetchLocationSuggestions();
  };

  // When user clicks on a suggestion
  const handleLocationSelect = (city) => {
    setLocation(city.name);
    fetchWeather(city.name);
    setSuggestions([]);
  };

  return (
    <div className="weather-container" style={{minHeight:"50vh"}}>
      <h2>Day Weather Forecast</h2>

      <div className="weather-search">
        <input
          type="text"
          placeholder="Enter location e.g. Nairobi"
          value={location}
          onChange={handleInputChange}
        />
        <button onClick={() => fetchWeather(location)}>Check Weather</button>

        {location && suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((city) => (
              <li key={`${city.name}-${city.country}`} onClick={() => handleLocationSelect(city)}>
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading && <p>Loading weather...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData && (
        <div className="weather-details">
          <h3>
            {weatherData.location.name}, {weatherData.location.country}
          </h3>
          <p><strong>Current Condition:</strong> {weatherData.current.condition.text}</p>
          <p><strong>Temperature:</strong> {weatherData.current.temp_c} °C</p>

          <h4>Forecast for 7 Days:</h4>
          <div className="forecast-container">
            {weatherData.forecast.forecastday.map((day) => (
              <div key={day.date} className="forecast-day">
                <p><strong>{day.date}</strong></p>
                <img src={day.day.condition.icon} alt={day.day.condition.text} />
                <p>{day.day.condition.text}</p>
                <p>Max: {day.day.maxtemp_c} °C</p>
                <p>Min: {day.day.mintemp_c} °C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
