/** biome-ignore-all lint/style/noNonNullAssertion: Ignore */

import { createServerFn } from "@tanstack/react-start";
import { fetchWeatherApi } from "openmeteo";

const params = {
    latitude: 0.3152,
    longitude: 32.5816,
    daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
    hourly: ["temperature_2m", "weather_code"],
    current: [
        "temperature_2m",
        "apparent_temperature",
        "is_day",
        "weather_code",
        "wind_speed_10m",
        "precipitation",
        "relative_humidity_2m",
    ],
    timezone: "auto",
};

// Helper function to form time ranges
const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

export const getWeatherInfo = createServerFn({ method: "GET" }).handler(
    async () => {
        const url = process.env.WEATHER_API_URL!;
        const responses = await fetchWeatherApi(url, params);

        // Extract the actual data from the response
        const response = responses[0];

        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const timezone = response.timezone();
        const timezoneAbbreviation = response.timezoneAbbreviation();
        const latitude = response.latitude();
        const longitude = response.longitude();
        const elevation = response.elevation();

        // Reverse geocode to get location name
        const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
        const geocodeResponse = await fetch(geocodeUrl, {
            headers: {
                "User-Agent": "WeatherApp/1.0", // Required by Nominatim
            },
        });
        const geocodeData = await geocodeResponse.json();
        const locationName =
            geocodeData.address?.city ||
            geocodeData.address?.town ||
            geocodeData.address?.village ||
            geocodeData.address?.county ||
            "Unknown Location";

        const current = response.current()!;
        const hourly = response.hourly()!;
        const daily = response.daily()!;

        return {
            current: {
                time: new Date(
                    (Number(current.time()) + utcOffsetSeconds) * 1000
                ),
                temperature_2m: current.variables(0)!.value(),
                apparent_temperature: current.variables(1)!.value(),
                is_day: current.variables(2)!.value(),
                weather_code: current.variables(3)!.value(),
                wind_speed_10m: current.variables(4)!.value(),
                precipitation: current.variables(5)!.value(),
                relative_humidity_2m: current.variables(6)!.value(),
                latitude,
                longitude,
                elevation,
                timezone,
                timezoneAbbreviation,
                locationName,
            },
            hourly: {
                time: range(
                    Number(hourly.time()),
                    Number(hourly.timeEnd()),
                    hourly.interval()
                ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
                temperature_2m: Array.from(hourly.variables(0)!.valuesArray()!),
                weather_code: Array.from(hourly.variables(1)!.valuesArray()!),
            },
            daily: {
                time: range(
                    Number(daily.time()),
                    Number(daily.timeEnd()),
                    daily.interval()
                ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
                temperature_2m_max: Array.from(
                    daily.variables(0)!.valuesArray()!
                ),
                temperature_2m_min: Array.from(
                    daily.variables(1)!.valuesArray()!
                ),
                weather_code: Array.from(daily.variables(2)!.valuesArray()!),
            },
        };
    }
);