import axios from "axios";

export const getWeather = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) return res.status(400).json({ error: "City is required" });

    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const weather = response.data;

    res.json({
      city: weather.name,
      temp: weather.main.temp,
      description: weather.weather[0].description,
      humidity: weather.main.humidity,
      wind: weather.wind.speed
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};
