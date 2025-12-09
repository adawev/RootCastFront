import { useForm } from "react-hook-form";
import { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { getWeather } from "../store/reducers/Weather";
import { toast } from "sonner";

function CheckWeather({ getWeather, weathercheck, loading }) {
    const { handleSubmit, register, setValue, formState: { errors } } = useForm();
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [touristTips, setTouristTips] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const cityMapping = {
        Paris: "Paris",
        "New York": "New York",
        Tokyo: "Tokyo",
        London: "London",
        Moscow: "Moscow",
    };

    const normalize = (str) => str?.trim().toLowerCase();

    // Shaharlar ro'yxatini yuklash
    useEffect(() => {
        fetch("/city.list.json")
            .then((res) => res.json())
            .then((data) => setCities(data))
            .catch((err) => console.error("City list load error:", err));
    }, []);

    // Tourist tips ni yuklash
    useEffect(() => {
        fetch("/touristTips.json")
            .then((res) => res.json())
            .then((data) => setTouristTips(data))
            .catch((err) => console.error("Tourist tips load error:", err));
    }, []);

    // Debounced city search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!searchTerm || searchTerm.trim() === "") {
                setFilteredCities([]);
                return;
            }
            const val = searchTerm.toLowerCase();
            const results = cities
                .filter((c) => c.name.toLowerCase().startsWith(val))
                .slice(0, 10);
            setFilteredCities(results);
        }, 300); // 300ms debounce delay

        return () => clearTimeout(timer);
    }, [searchTerm, cities]);

    // Form submit
    const onSubmitForm = (data) => {
        const { city, date } = data;
        if (!city || city.trim() === '') {
            toast.error("Please enter a city name");
            return;
        }

        // Validate date is not in the past
        if (date) {
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                toast.error("Please select today or a future date");
                return;
            }
        }

        getWeather({ city, date });
    };

    // City input search/filter
    const handleCityChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectCity = (city) => {
        setValue("city", city.name);
        setFilteredCities([]);
    };

    // Card uchun backenddan kelgan ma'lumot
    const cardData = useMemo(() => {
        if (!weathercheck || weathercheck.error) return null;
        return weathercheck;
    }, [weathercheck]);

    // Tipslar (JSON + backend advice)
    const tips = useMemo(() => {
        if (!cardData?.temp) return [];
        let filteredTips = [];

        if (cardData.city) {
            const mappedName = cityMapping[cardData.city] || cardData.city;
            const cityTips = touristTips.find((t) => normalize(t.city) === normalize(mappedName));
            if (cityTips?.tourist_tips) filteredTips = cityTips.tourist_tips.slice(0, 3); // faqat 3 ta
        }

        // Backend advice ni oxiriga qo'shish
        if (cardData.advice) filteredTips.push(cardData.advice);

        return filteredTips;
    }, [cardData, touristTips]);

    return (
        <div className="checkPage">
            <h1>Check Local Weather</h1>
            <p>Enter a location and select a date to get instant and accurate forecasts.</p>

            {/* Form */}
            <div className="form-container">
                <form className="form-control" id="CheckWeatherForm" onSubmit={handleSubmit(onSubmitForm)}>
                    <div style={{ position: "relative" }}>
                        <input
                            type="text"
                            placeholder="Enter city"
                            {...register("city", {
                                required: "City is required",
                                minLength: { value: 2, message: "City name must be at least 2 characters" }
                            })}
                            onChange={handleCityChange}
                            autoComplete="off"
                            aria-label="City name"
                            aria-invalid={errors.city ? "true" : "false"}
                        />
                        {errors.city && <span className="error-message">{errors.city.message}</span>}
                        {filteredCities.length > 0 && (
                            <div className="autocomplete-list">
                                {filteredCities.map((c) => (
                                    <div key={c.id} className="autocomplete-item" onClick={() => handleSelectCity(c)}>
                                        {c.name}, {c.country}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <input
                        type="date"
                        className="date-input"
                        {...register("date")}
                        min={new Date().toISOString().split('T')[0]}
                        aria-label="Select date"
                    />
                    <button type="submit" form="CheckWeatherForm">Get Weather</button>
                </form>
            </div>

            {/* Loading Skeleton */}
            {loading && (
                <div className="cards-container">
                    <div className="weather-card skeleton-card">
                        <div className="skeleton skeleton-header"></div>
                        <div className="skeleton skeleton-temp"></div>
                        <div className="skeleton skeleton-desc"></div>
                        <div className="weather-details">
                            <div className="skeleton skeleton-detail"></div>
                            <div className="skeleton skeleton-detail"></div>
                            <div className="skeleton skeleton-detail"></div>
                            <div className="skeleton skeleton-detail"></div>
                        </div>
                    </div>
                    <div className="tips-card skeleton-card">
                        <div className="skeleton skeleton-header"></div>
                        <div className="skeleton skeleton-tip"></div>
                        <div className="skeleton skeleton-tip"></div>
                        <div className="skeleton skeleton-tip"></div>
                    </div>
                </div>
            )}

            {/* Error */}
            {weathercheck?.error && <div className="error">{weathercheck.error}</div>}

            {/* Cards */}
            {cardData && (
                <div className="cards-container">

                    {/* Weather Card */}
                    <div className="weather-card">
                        <div className="weather-header">
                            <div className="weather-location">
                                {cardData.city || cardData.location?.name || "-"}
                            </div>
                            <div className="weather-date">
                                {cardData.date || new Date().toLocaleDateString("en-US", {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </div>
                        </div>

                        <div className="weather-main">
                            <div className="weather-temp">{cardData.temp !== undefined ? Math.round(cardData.temp) : "-"}°C</div>
                            <div className="weather-desc">{cardData.description || "-"} ({cardData.main || "-"})</div>
                        </div>

                        <div className="weather-details">
                            <div className="detail-item">
                                <img src="https://cdn-icons-png.flaticon.com/512/481/481460.png" alt="wind" />
                                <span>Wind: {cardData.windSpeed || "-"} m/s</span>
                            </div>
                            <div className="detail-item">
                                <img src="https://cdn-icons-png.flaticon.com/512/414/414974.png" alt="humidity" />
                                <span>Humidity: {cardData.humidity || "-"}%</span>
                            </div>
                            <div className="detail-item">
                                <img src="https://cdn-icons-png.flaticon.com/512/869/869869.png" alt="pressure" />
                                <span>Pressure: {cardData.pressure || "-"} hPa</span>
                            </div>
                            <div className="detail-item">
                                <img src="https://cdn-icons-png.flaticon.com/512/869/869869.png" alt="feels like" />
                                <span>Feels like: {cardData.feelsLike || "-"}°C</span>
                            </div>
                        </div>
                    </div>

                    {/* Tourist Tips Card */}
                    <div className="tips-card">
                        <h3>Top 3 Tourist Tips</h3>
                        {tips.length > 0 ? (
                            <ul>
                                {tips.map((tip, idx) => (
                                    <li key={idx}>{tip}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No tips available for this city.</p>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    weathercheck: state.weathercheck.data,
    loading: state.weathercheck.loading,
});

export default connect(mapStateToProps, { getWeather })(CheckWeather);
