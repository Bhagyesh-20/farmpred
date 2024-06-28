import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Weather.css";
import windSpeed from "../dots/windSpeed.png";
import aqi from "../dots/aqi.png";
import uv from "../dots/uv.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Box } from "rebass";

const api = {
  key: "0a650328d846b039c204fd46796d1522",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Weather() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
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
        setForecast(groupForecastData(forecastResult.data.list));

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
      setForecast(groupForecastData(forecastResult.data.list));
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const groupForecastData = (data) => {
    const groupedData = data.reduce((acc, cur) => {
      const date = new Date(cur.dt * 1000).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(cur);
      return acc;
    }, {});

    return Object.entries(groupedData).map(([date, values]) => {
      const avgTemp = values.reduce((acc, cur) => acc + cur.main.temp, 0) / values.length;
      const avgHumidity = values.reduce((acc, cur) => acc + cur.main.humidity, 0) / values.length;
      const weatherMain = values[0].weather[0].main;
      const weatherIcon = values[0].weather[0].icon;
      return {
        date,
        temp: avgTemp,
        humidity: avgHumidity,
        main: weatherMain,
        icon: weatherIcon,
      };
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDay = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  const calculateSunPosition = (sunrise, sunset) => {
    const startTimeInMinutes = new Date(sunrise * 1000).getHours() * 60 + new Date(sunrise * 1000).getMinutes();
    const endTimeInMinutes = new Date(sunset * 1000).getHours() * 60 + new Date(sunset * 1000).getMinutes();
    const currentTotalMinutes = new Date().getHours() * 60 + new Date().getMinutes();
    const percentageSun =
      ((currentTotalMinutes - startTimeInMinutes) /
        (endTimeInMinutes - startTimeInMinutes)) *
      100;
    return percentageSun;
  };

  const percentageSun = weather ? calculateSunPosition(weather.sys.sunrise, weather.sys.sunset) : 0;

  return (
    <div className="container">
      <h1 className="text-center">Weather App</h1>
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
        weather && (
          <div className="weather-container">
            <div className="row">
              <div className="col-md-4">
                <div className="weather-info">
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
                      : `${Math.ceil(weather.main.temp)}°C`}
                  </h1>
                  <p>
                    Feels Like{" "}
                    {weather.main.feels_like > 0
                      ? `+${Math.ceil(weather.main.feels_like)}°C`
                      : `${Math.ceil(weather.main.feels_like)}°C`}
                  </p>

                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td>Description</td>
                        <td>{weather.weather[0].description}</td>
                      </tr>
                      <tr>
                        <td>Wind Speed</td>
                        <td>
                          <img src={windSpeed} alt="Wind Speed Icon" />{" "}
                          {weather.wind.speed} mph
                        </td>
                      </tr>
                      <tr>
                        <td>Humidity</td>
                        <td>
                          <img src={aqi} alt="Humidity Icon" />{" "}
                          {weather.main.humidity}%
                        </td>
                      </tr>
                      <tr>
                        <td>Pressure</td>
                        <td>
                          <img src={aqi} alt="Pressure Icon" />{" "}
                          {weather.main.pressure} mb
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-md-8">
                <div className="forecast-container">
                  <div className="row">
                    {forecast.map((day, index) => (
                      <div className="col-md-2" key={index}>
                        <div className="forecast-card">
                          <p>{day.date}</p>
                          <p>{day.main}</p>
                          <img
                            src={`http://openweathermap.org/img/wn/${day.icon}.png`}
                            alt={day.main}
                          />
                          <p>{Math.ceil(day.temp)}°C</p>
                          <p>Humidity: {Math.ceil(day.humidity)}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <CircularProgressbar
                      value={percentageSun}
                      strokeWidth={0.5}
                      circleRatio={0.5}
                      styles={buildStyles({
                        rotation: 0.75,
                        pathColor: "orange", // Change stroke color
                        trailColor: "grey",
                        strokeLinecap: "round", // Change stroke linecap
                        pathTransitionDuration: 0.5, // Change animation duration
                        pathTransition: "none", // Disable animation
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Weather;
