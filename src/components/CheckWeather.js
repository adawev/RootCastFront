import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../store/reducers/Weather";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Footer from "./Footer";

const toClock = (unixSeconds) => {
  if (!unixSeconds) return "--:--";
  return new Date(unixSeconds * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const windDirection = (degrees = 0) => {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(((degrees % 360) / 45)) % 8;
  return dirs[index];
};

const weatherAnimClass = (main = "") => {
  const value = main.toLowerCase();
  if (value.includes("rain")) return "mini-icon mini-rain";
  if (value.includes("snow")) return "mini-icon mini-snow";
  if (value.includes("cloud")) return "mini-icon mini-cloud";
  return "mini-icon mini-sun";
};

function CheckWeather() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.weathercheck);
  const { handleSubmit, register, setValue, watch, formState: { errors } } = useForm();
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [touristTips, setTouristTips] = useState([]);
  const cityValue = watch("city");

  useEffect(() => {
    fetch("/city.list.json")
      .then((res) => res.json())
      .then((payload) => setCities(payload))
      .catch(() => setCities([]));

    fetch("/touristTips.json")
      .then((res) => res.json())
      .then((payload) => setTouristTips(payload))
      .catch(() => setTouristTips([]));
  }, []);

  useEffect(() => {
    const term = (cityValue || "").trim().toLowerCase();
    if (!term) {
      setFilteredCities([]);
      return;
    }

    const timer = setTimeout(() => {
      const results = cities
        .filter((c) => c.name.toLowerCase().startsWith(term))
        .slice(0, 8);
      setFilteredCities(results);
    }, 250);

    return () => clearTimeout(timer);
  }, [cityValue, cities]);

  const onSubmit = ({ city, date }) => {
    dispatch(fetchWeather({ city: city.trim(), date }));
  };

  const tips = useMemo(() => {
    if (!data?.city) return [];
    const cityTips = touristTips.find((t) => t.city?.toLowerCase() === data.city.toLowerCase());
    const fromJson = cityTips?.tourist_tips?.slice(0, 3) || [];
    return data.advice ? [...fromJson, data.advice] : fromJson;
  }, [touristTips, data]);

  const metricCards = [
    { label: "Feels Like", value: `${Math.round(data?.feelsLike ?? 0)}°C` },
    { label: "Humidity", value: `${data?.humidity ?? 0}%` },
    { label: "Pressure", value: `${data?.pressure ?? 0} hPa` },
    { label: "Cloudiness", value: `${data?.clouds ?? 0}%` },
    { label: "Visibility", value: `${Math.round((data?.visibility ?? 0) / 1000)} km` },
    { label: "Wind", value: `${data?.windSpeed ?? 0} m/s ${windDirection(data?.windDeg)}` },
    { label: "Wind Gust", value: `${data?.windGust ?? 0} m/s` },
    { label: "Sunrise / Sunset", value: `${toClock(data?.sunrise)} / ${toClock(data?.sunset)}` },
    { label: "Precipitation Chance", value: `${Math.round(data?.precipitationChance ?? 0)}%` },
    { label: "Rain / Snow (3h)", value: `${data?.rainVolume ?? 0} / ${data?.snowVolume ?? 0} mm` },
    { label: "AQI", value: data?.aqi ? `${data.aqi} / 5` : "N/A" },
    { label: "PM2.5 / PM10", value: `${Math.round(data?.pm25 ?? 0)} / ${Math.round(data?.pm10 ?? 0)} µg/m³` },
    { label: "UV Index", value: `${(data?.uvi ?? 0).toFixed(1)}` },
  ];

  return (
    <div className="weather-page">
      <div className="page-bg page-bg-rain" aria-hidden="true">
        <span className="page-cloud page-cloud-one" />
        <span className="page-cloud page-cloud-three" />
        <span className="page-drop page-drop-two" />
        <span className="page-sun page-sun-two" />
      </div>
      <section className="weather-hero">
        <h1>Weather Intelligence, Reimagined</h1>
        <p>Search any city, pick a date, and explore richer weather insights with animated, clear data cards.</p>
      </section>

      <section className="weather-search-shell">
        <form className="weather-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="field-group">
            <label htmlFor="city">City</label>
            <Input
              id="city"
              type="text"
              placeholder="Type city name..."
              autoComplete="off"
              {...register("city", {
                required: "City is required",
                minLength: { value: 2, message: "At least 2 characters" },
              })}
            />
            {errors.city && <p className="field-error">{errors.city.message}</p>}
            {filteredCities.length > 0 && (
              <div className="city-suggestions">
                {filteredCities.map((c) => (
                  <button
                    key={`${c.id}-${c.name}`}
                    type="button"
                    className="city-item"
                    onClick={() => {
                      setValue("city", c.name);
                      setFilteredCities([]);
                    }}
                  >
                    {c.name}, {c.country}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="field-group">
            <label htmlFor="date">Date</label>
            <Input
              id="date"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              {...register("date")}
            />
          </div>

          <Button type="submit" loading={loading}>
            {loading ? "Loading Weather..." : "Get Weather"}
          </Button>
        </form>
      </section>

      {error && (
        <section className="weather-error">
          <h3>Could not load weather data</h3>
          <p>{error}</p>
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              const city = (watch("city") || "").trim();
              const date = watch("date");
              if (city) dispatch(fetchWeather({ city, date }));
            }}
          >
            Retry
          </Button>
        </section>
      )}

      {!loading && !data && !error && (
        <section className="weather-empty">
          <h3>Start with a city search</h3>
          <p>Try: Tashkent, London, Tokyo, Paris</p>
        </section>
      )}

      {loading && (
        <section className="weather-grid">
          <div className="skeleton-card" />
          <div className="skeleton-card" />
          <div className="skeleton-card" />
        </section>
      )}

      {!loading && data && (
        <section className="weather-grid">
          <article className="weather-now card-fade-in">
            <p className="kicker">Current Conditions</p>
            <h2>{data.city}</h2>
            <p className="date-text">{data.date}</p>
            <div className="temp-line">
              <span className="temp-main">{Math.round(data.temp)}°</span>
              <span className="temp-range">
                L {Math.round(data.tempMin)}° / H {Math.round(data.tempMax)}°
              </span>
            </div>
            <p className="condition-line">{data.main} • {data.description}</p>
          </article>

          <article className="weather-details card-fade-in">
            <p className="kicker">Detailed Metrics</p>
            <div className="metric-grid">
              {metricCards.map((metric) => (
                <div className="metric-card" key={metric.label}>
                  <p>{metric.label}</p>
                  <h4>{metric.value}</h4>
                </div>
              ))}
            </div>
          </article>

          <article className="weather-tips card-fade-in">
            <p className="kicker">Travel & Comfort Tips</p>
            {tips.length > 0 ? (
              <ul>
                {tips.map((tip, idx) => (
                  <li key={`${idx}-${tip}`}>{tip}</li>
                ))}
              </ul>
            ) : (
              <p>No specific tips for this city yet.</p>
            )}
          </article>
        </section>
      )}

      {!loading && data?.hourly?.length > 0 && (
        <section className="hourly-timeline">
          <div className="timeline-head">
            <p className="kicker">Hourly Timeline</p>
            <h3>
              <span className="section-icon section-icon-timeline" aria-hidden="true">
                <span />
                <span />
              </span>
              Next Forecast Slots
            </h3>
          </div>
          <div className="timeline-strip">
            {data.hourly.map((item, idx) => (
              <article key={`${item.dateTime}-${idx}`} className="timeline-item">
                <div className="time-row">
                  <p className="time">{item.dateTime?.slice(11, 16) || "--:--"}</p>
                  <span className={weatherAnimClass(item.main)} aria-hidden="true" />
                </div>
                <h4>{Math.round(item.temp)}°C</h4>
                <p>{item.main}</p>
                <small>Rain: {Math.round(item.precipitationChance)}%</small>
                <small>Wind: {item.windSpeed} m/s</small>
              </article>
            ))}
          </div>
        </section>
      )}

      {!loading && data && (
        <section className="air-uv-section">
          <div className="air-uv-card">
            <p className="kicker">Air Quality</p>
            <div className="section-icon section-icon-air" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <h3>{data.aqi ? `AQI ${data.aqi}/5` : "AQI N/A"}</h3>
            <p>PM2.5: {Math.round(data.pm25 ?? 0)} µg/m³</p>
            <p>PM10: {Math.round(data.pm10 ?? 0)} µg/m³</p>
          </div>
          <div className="air-uv-card">
            <p className="kicker">UV Index</p>
            <div className="section-icon section-icon-uv" aria-hidden="true" />
            <h3>{(data.uvi ?? 0).toFixed(1)}</h3>
            <p>{(data.uvi ?? 0) >= 6 ? "High exposure risk. Use protection." : "Moderate or low UV exposure."}</p>
          </div>
        </section>
      )}

      <section className="weather-notes">
        <article className="note-item">
          <h4>Metric Guide</h4>
          <p>Visibility under 3 km may affect driving comfort; wind gusts above 10 m/s can feel intense outdoors.</p>
        </article>
        <article className="note-item">
          <h4>Comfort Note</h4>
          <p>Compare temperature with feels-like value to estimate humidity and wind impact on body comfort.</p>
        </article>
        <article className="note-item">
          <h4>Planning Tip</h4>
          <p>Check sunrise/sunset and cloudiness together to choose the best time for outdoor activities.</p>
        </article>
      </section>

      <Footer />
    </div>
  );
}

export default CheckWeather;
