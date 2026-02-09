/** biome-ignore-all lint/correctness/useImageSize: Ignore */

import { createFileRoute } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import DayPicker from "@/components/day-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useUnits } from "@/context/units-context";
import { getWeatherInfo } from "@/data/api";
import { getImageDetails } from "@/lib/weather-codes";

export const Route = createFileRoute("/")({
    component: Home,
    loader: () => getWeatherInfo(),
});

function Home() {
    const weatherData = Route.useLoaderData();

    const {
        convertTemperature,
        convertWindSpeed,
        convertPrecipitation,
        getTemperatureSymbol,
        getWindSpeedSymbol,
        getPrecipitationSymbol,
    } = useUnits();

    // Get the current day of the week as default
    const currentDay = new Date().toLocaleDateString("en-US", {
        weekday: "long",
    });

    const [selectedDay, setSelectedDay] = useState<string>(currentDay);

    const dailyForecast = weatherData.daily;
    const hourlyForecast = weatherData.hourly;
    const currentForecast = weatherData.current;

    // Process daily forecast data
    const dailyData = dailyForecast.time.slice(0, 7).map((date, index) => {
        const href = getImageDetails(dailyForecast.weather_code[index]).href;
        const alt = getImageDetails(dailyForecast.weather_code[index]).alt;

        return {
            day: new Date(date).toLocaleDateString("en-US", {
                weekday: "short",
            }),
            href,
            alt,
            high: Math.round(dailyForecast.temperature_2m_max[index]),
            low: Math.round(dailyForecast.temperature_2m_min[index]),
        };
    });

    // Filter hourly forecast by selected day
    const hourlyData = hourlyForecast.time
        .map((date, index) => {
            const dateObj = new Date(date);
            const dayOfWeek = dateObj.toLocaleDateString("en-US", {
                weekday: "long",
            });

            return {
                time: dateObj.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    hour12: true,
                }),
                href: getImageDetails(hourlyForecast.weather_code[0]).href,
                alt: getImageDetails(hourlyForecast.weather_code[0]).alt,
                temperature: Math.round(hourlyForecast.temperature_2m[index]),
                dayOfWeek,
            };
        })
        .filter((hour) => hour.dayOfWeek === selectedDay)
        .slice(0, 8);

    return (
        <div className="mx-auto min-h-screen">
            <div className="container flex flex-col items-center pt-10">
                <h1 className="py-8 text-center font-bold font-header text-6xl">
                    How's the sky looking today?
                </h1>

                {/* Search Bar */}
                <div className="mb-8 flex w-full max-w-xl flex-col gap-3 md:flex-row">
                    <div className="relative flex-1">
                        <SearchIcon className="absolute top-1/2 left-3 size-5 -translate-y-1/2 transform text-muted-foreground" />

                        <input
                            className="w-full rounded-md bg-gray-700 py-2 pr-2 pl-11 text-lg text-white placeholder:truncate placeholder:text-lg"
                            placeholder="Search for a city e.g. New York"
                            type="search"
                        />
                    </div>

                    <Button className="bg-blue-600 px-6 py-5 text-md text-white hover:bg-blue-700">
                        Search
                    </Button>
                </div>

                {/* Main Content Grid */}
                <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Column - Main Weather Card */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Current Weather Card */}
                        <Card className="relative flex items-center justify-center overflow-hidden bg-transparent">
                            <img
                                alt="bg-image"
                                className="absolute inset-0 -z-10 size-full object-cover"
                                src="/images/bg-today-large.svg"
                            />

                            <CardContent className="flex items-center justify-between gap-4 p-10">
                                <div>
                                    <h3 className="font-semibold text-3xl text-white">
                                        {currentForecast.locationName}
                                    </h3>

                                    <p className="text-blue-200">
                                        {new Date(
                                            currentForecast.time
                                        ).toLocaleDateString("en-US", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>

                                <div className="flex items-center">
                                    <img
                                        alt={
                                            getImageDetails(
                                                currentForecast.weather_code
                                            ).alt
                                        }
                                        className="size-20"
                                        src={
                                            getImageDetails(
                                                currentForecast.weather_code
                                            ).href
                                        }
                                    />

                                    <span className="font-light text-6xl text-white">
                                        {Math.round(
                                            convertTemperature(
                                                currentForecast.temperature_2m
                                            )
                                        )}
                                        {getTemperatureSymbol()}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Weather Details Grid */}
                        <div className="grid grid-cols-4 gap-4">
                            <Card>
                                <CardHeader>
                                    <p className="text-gray-400 text-sm">
                                        Feels Like
                                    </p>
                                </CardHeader>

                                <CardContent>
                                    <p className="font-semibold text-3xl">
                                        {Math.round(
                                            convertTemperature(
                                                currentForecast.apparent_temperature
                                            )
                                        )}
                                        {getTemperatureSymbol()}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <p className="text-gray-400 text-sm">
                                        Humidity
                                    </p>
                                </CardHeader>

                                <CardContent>
                                    <p className="font-semibold text-3xl">
                                        {currentForecast.relative_humidity_2m.toFixed(
                                            0
                                        )}
                                        %
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <p className="text-gray-400 text-sm">
                                        Wind
                                    </p>
                                </CardHeader>

                                <CardContent>
                                    <p className="font-semibold text-3xl">
                                        {Math.round(
                                            convertWindSpeed(
                                                currentForecast.wind_speed_10m
                                            )
                                        )}{" "}
                                        {getWindSpeedSymbol()}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <p className="text-gray-400 text-sm">
                                        Precipitation
                                    </p>
                                </CardHeader>

                                <CardContent>
                                    <p className="font-semibold text-3xl">
                                        {convertPrecipitation(
                                            currentForecast.precipitation
                                        ).toFixed(1)}{" "}
                                        {getPrecipitationSymbol()}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Daily Forecast */}
                        <div>
                            <h3 className="mb-4 font-semibold text-white text-xl">
                                Daily forecast
                            </h3>

                            <div className="grid grid-cols-7 gap-3">
                                {dailyData.map((day) => (
                                    <Card
                                        className="border-slate-700 bg-slate-800/50"
                                        key={day.day}
                                    >
                                        <CardContent className="flex flex-col items-center p-4">
                                            <p className="mb-3 text-gray-400 text-sm">
                                                {day.day}
                                            </p>
                                            <img
                                                alt={day.alt}
                                                className="size-10"
                                                src={day.href}
                                            />
                                            <div className="mt-3 flex items-center gap-3 text-sm">
                                                <p className="font-semibold text-white">
                                                    {Math.round(
                                                        convertTemperature(
                                                            day.high
                                                        )
                                                    )}
                                                    °
                                                </p>
                                                <p className="text-gray-400">
                                                    {Math.round(
                                                        convertTemperature(
                                                            day.low
                                                        )
                                                    )}
                                                    °
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Hourly Forecast */}
                    <div>
                        <Card className="h-full border-slate-700 bg-slate-800/50">
                            <CardContent className="p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <h3 className="font-semibold text-lg text-white">
                                        Hourly forecast
                                    </h3>

                                    {/* Day selector */}
                                    <DayPicker
                                        onValueChange={setSelectedDay}
                                        value={selectedDay}
                                    />
                                </div>

                                <div className="space-y-4">
                                    {hourlyData.map((hour, index) => (
                                        <Card
                                            className="rounded-sm"
                                            // biome-ignore lint/suspicious/noArrayIndexKey: Ignore
                                            key={index}
                                        >
                                            <CardContent className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        alt={hour.alt}
                                                        className="size-4"
                                                        src={hour.href}
                                                    />
                                                    <span>{hour.time}</span>
                                                </div>
                                                <span className="text-right text-white">
                                                    {Math.round(
                                                        convertTemperature(
                                                            hour.temperature
                                                        )
                                                    )}
                                                    °
                                                </span>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
