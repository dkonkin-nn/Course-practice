import { useState, useEffect } from "react";
import "./index.css";

const KEY = "c794fd00917343bc961201710250806";

function App() {
  const [city, setCity] = useState("Нижний новгород");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${city}&days=5`);
        const data = await res.json();

        if (data.error) {
          setError(data.error.message);
          setWeatherData(null);
          return;
        }
        setWeatherData(data);
        setError(null);
      } catch {
        setError("Ошибка запроса данных о погоде");
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [city]);

  return (
    <div className="app">
      <div className="widget-container">
        <div className="weather-card-container">
          <h1 className="app-title">Погодный виджет</h1>
          <div className="search-container">
            <input type="text" placeholder="Введите название города"
              value={city} className="search-input" onChange={(e) => setCity(e.target.value)} />
          </div>
        </div>
        {loading ?
          <p>Загрузка...</p>
          : error ?
            <p>{error} </p>
            : weatherData && <div className="weather-card">
              <h2>{`${weatherData?.location.name}, ${weatherData?.location.country}`}</h2>
              <img src={`https:${weatherData?.current.condition.icon}`} alt="icon" className="weather-icon" />
              <p className="temperature">{Math.round(weatherData?.current.temp_c)}°C</p>
              <p className="condition">{weatherData?.current.condition.text}</p>
              <div className="weather-details">
                <p>Влажность: {weatherData?.current.humidity}%</p>
                <p>Ветер: {weatherData?.current.wind_kph} km/h</p>
              </div>
            </div>}
      </div>
      {loading ?
        <p>Загрузка...</p>
        : error ?
          <p>{error} </p>
          : weatherData && <Forecast forecast={weatherData.forecast} />}
    </div>
  );
}

function Forecast({ forecast }) {

  console.log(forecast);

  return (
    <div className="widget-container-forecast">
      {forecast.forecastday.map((forecast, index) => <ForecastCard forecast={forecast} key={index} />)}
    </div>);
}

function ForecastCard({ forecast }) {

  const day = forecast.day;

  return (
    <div className="weather-card-forecast">
      <h4>{new Date(forecast.date).toLocaleDateString()}</h4>
      <img src={day.condition.icon} alt="icon" className="weather-icon" />
      <div className="temperatures">
        <p className="temperature">Мин: {Math.round(day.mintemp_c)}°C</p>
        <p className="temperature">Макс: {Math.round(day.maxtemp_c)}°C</p>
      </div>

      <p className="condition">{day.condition.text}</p>
      <div className="weather-details">
        <p>Средняя влажность: {day.avghumidity}%</p>
        <p>Скорость ветра до: {day.maxwind_kph} km/h</p>
      </div>
    </div>
  );
}

export default App;
