import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Weather.css";
import windSpeed from "../dots/windSpeed.png";
import aqi from "../dots/aqi.png";
import uv from "../dots/uv.png";

const api = {
  key: "0a650328d846b039c204fd46796d1522",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Weather() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const weatherResult = await axios.get(
          `${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`
        );
        setWeather(weatherResult.data);

        const forecastResult = await axios.get(
          `${api.base}forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`
        );
        setForecast(forecastResult.data.list);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(latitude, longitude);
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        setLoading(false);
      }
    );

    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const searchPressed = async () => {
    if (search.trim() === "") return;

    try {
      const weatherResult = await axios.get(
        `${api.base}weather?q=${search}&units=metric&APPID=${api.key}`
      );
      setWeather(weatherResult.data);

      const forecastResult = await axios.get(
        `${api.base}forecast?q=${search}&units=metric&APPID=${api.key}`
      );
      setForecast(forecastResult.data.list);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const formatDate = (date) => {
    return new Date(date * 1000).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };

  const formatTime = (date) => {
    return new Date(date * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDay = (date) => {
    return new Date(date * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Weather App</h1>
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          placeholder="Enter city/town..."
          onChange={(e) => setSearch(e.target.value)}
          className="form-control w-50"
        />
        <button onClick={searchPressed} className="btn btn-info mx-2">
          Search
        </button>
      </div>

      <hr className="my-4" />

      {!loading ? (
        <div className="weather-container">
          <div className="row">
            <div className="col-md-4">
              <div className="weather-info">
                {weather.weather && (
                  <>
                    <table className="table table-borderless my-0">
                      <tbody>
                        <tr>
                          <td>
                            <p>
                              {weather.name}, {weather.sys.country}
                            </p>
                          </td>
                          <td>
                            <p>Today, {formatDate(dateTime)}</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <p>
                      {formatDay(dateTime)}, {formatTime(dateTime)}
                    </p>

                    <img
                      src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                      alt={weather.weather[0].description}
                      className="weather-icon"
                    />
                    <p>{weather.weather[0].main}</p>

                    <h1 id="main-temp">
                      {weather.main.temp > 0
                        ? `+${Math.ceil(weather.main.temp)}°C`
                        : `-${Math.ceil(weather.main.temp)}°C`}
                    </h1>
                    <p>
                      Feels Like{" "}
                      {weather.main.feels_like > 0
                        ? `+${Math.ceil(weather.main.feels_like)}°C`
                        : `-${Math.ceil(weather.main.feels_like)}°C`}
                    </p>

                  
                  
                    <table className="table table-borderless">
                      <tbody>
                     
                      <tr>
                        
                        <td>Description </td>
                        <td>      </td>
                        <td>{weather.weather[0].description} </td>
                      </tr>
                        <tr>
                          <td>Wind Speed</td>
                          <td>
                            <img src={windSpeed} alt="Wind Speed Icon" />{" "}
                            
                          </td>
                          <td>{weather.wind.speed} mph</td>
                        </tr>



                        <tr>
                          <td>Humidity</td>
                          <td>
                            <img src={aqi} alt="Humidity Icon" />{" "}
                          </td>
                          <td>{weather.main.humidity}%</td>
                        </tr>


                        <tr>
                          <td>Pressure</td>
                          <td>
                            <img src={aqi} alt="Humidity Icon" />{" "}
                          </td>
                          <td>{weather.main.pressure}mb</td>
                        </tr>



                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </div>

           

            {/* <div className="col-md-4">
              <pre className="json-response">
                {JSON.stringify(weather, null, 2)}
              </pre>
            </div> */}
          </div>

          <div className="icon-divider my-4">
            <i className="bi bi-cloud-sun"></i>
          </div>

          <div className="forecast-container">
            <div className="row">
              {forecast.slice(0, 7).map((day, index) => (
                <div className="col-md-2" key={index}>
                  <div className="forecast-day">
                    <p>{formatDay(day.dt)}</p>
                    <img
                      src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                      alt={day.weather[0].description}
                      className="weather-icon"
                    />
                    <p>{day.weather[0].main}</p>
                    <p>
                      {day.main.temp > 0
                        ? `+${Math.ceil(day.main.temp)}°C`
                        : `-${Math.ceil(day.main.temp)}°C`}
                    </p>
                    <p>Humidity: {day.main.humidity}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
