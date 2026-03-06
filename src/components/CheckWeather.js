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
  ];

  return (
    <div className="weather-page">
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

      <Footer />
    </div>
  );
}

export default CheckWeather;
