import React, { useState } from "react";
import "./weather.css";

const WeatherForecast = () => {
  const [location, setLocation] = useState(""); 
  const [weatherData, setWeatherData] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const [suggestions, setSuggestions] = useState([]);

  const apiKey = process.env.REACT_APP_WEATHER_KEY; 

  // Fetch weather data based on location
  const fetchWeather = async (location) => {
    if (!location) return;

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`
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

  // Fetch location suggestions based on the user's input (using WeatherAPI)
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

      // Filter results to only show locations that start with the typed letters
      const filteredSuggestions = data.filter((city) =>
        city.name.toLowerCase().startsWith(location.toLowerCase())
      );

      setSuggestions(filteredSuggestions); // Set the filtered suggestions list
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle user typing
  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    fetchLocationSuggestions(); // Fetch location suggestions as the user types
  };

  // Handle user selecting a location from the dropdown
  const handleLocationSelect = (city) => {
    setLocation(city.name); // Set the selected city in the input
    fetchWeather(city.name); // Fetch weather for the selected city
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="weather-container">
      <h2>Weather Forecast</h2>
      <div className="weather-search">
        <input
          type="text"
          placeholder="Enter location e.g. Nairobi"
          value={location}
          onChange={handleInputChange}
        />
        <button onClick={() => fetchWeather(location)}>Check Weather</button>

        {/* Display location suggestions as a dropdown */}
        {location && suggestions.length > 0 && (
          <ul style={{cursor:"pointer",display: "block",fontWeight: "bold"}} className="suggestions-dropdown" >
            {suggestions.map((city) => (
              <li key={city.id} onClick={() => handleLocationSelect(city)}>
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
          <p>
            <strong>Condition:</strong> {weatherData.current.condition.text}
          </p>
          <p>
            <strong>Temperature:</strong> {weatherData.current.temp_c} °C
          </p>
          <p>
            <strong>Humidity:</strong> {weatherData.current.humidity}%
          </p>
          <p>
            <strong>Wind:</strong> {weatherData.current.wind_kph} km/h
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
