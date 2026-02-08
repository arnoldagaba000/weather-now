/** biome-ignore-all lint/correctness/useImageSize: <explanation> */
import { createFileRoute } from "@tanstack/react-router";
import {
    CloudDrizzleIcon,
    CloudIcon,
    CloudRainIcon,
    SearchIcon,
    SunIcon,
    WindIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
    const dailyForecast = [
        {
            day: "Tue",
            icon: <CloudRainIcon className="h-8 w-8 text-blue-300" />,
            high: 20,
            low: 14,
        },
        {
            day: "Wed",
            icon: <CloudIcon className="h-8 w-8 text-gray-300" />,
            high: 21,
            low: 15,
        },
        {
            day: "Thu",
            icon: <SunIcon className="h-8 w-8 text-yellow-400" />,
            high: 24,
            low: 14,
        },
        {
            day: "Fri",
            icon: <CloudIcon className="h-8 w-8 text-gray-300" />,
            high: 25,
            low: 13,
        },
        {
            day: "Sat",
            icon: <CloudRainIcon className="h-8 w-8 text-blue-300" />,
            high: 21,
            low: 15,
        },
        {
            day: "Sun",
            icon: <CloudDrizzleIcon className="h-8 w-8 text-gray-300" />,
            high: 25,
            low: 16,
        },
        {
            day: "Mon",
            icon: <WindIcon className="h-8 w-8 text-gray-400" />,
            high: 24,
            low: 15,
        },
    ];

    const hourlyForecast = [
        {
            time: "3 PM",
            temp: 20,
            icon: <CloudIcon className="h-5 w-5 text-gray-300" />,
        },
        {
            time: "4 PM",
            temp: 20,
            icon: <CloudIcon className="h-5 w-5 text-gray-300" />,
        },
        {
            time: "5 PM",
            temp: 20,
            icon: <SunIcon className="h-5 w-5 text-yellow-400" />,
        },
        {
            time: "6 PM",
            temp: 19,
            icon: <CloudIcon className="h-5 w-5 text-gray-300" />,
        },
        {
            time: "7 PM",
            temp: 18,
            icon: <CloudIcon className="h-5 w-5 text-gray-300" />,
        },
        {
            time: "8 PM",
            temp: 18,
            icon: <WindIcon className="h-5 w-5 text-gray-400" />,
        },
        {
            time: "9 PM",
            temp: 17,
            icon: <CloudIcon className="h-5 w-5 text-gray-300" />,
        },
        {
            time: "10 PM",
            temp: 17,
            icon: <CloudIcon className="h-5 w-5 text-gray-300" />,
        },
    ];

    return (
        <div className="container mx-auto min-h-screen">
            <div className="flex h-full flex-col items-center justify-center pt-10">
                <h1 className="py-8 text-center font-bold font-header text-7xl">
                    How's the sky looking today?
                </h1>

                {/* Search Bar */}
                <div className="mb-8 flex max-w-xl flex-col gap-3 md:flex-row">
                    <div className="relative flex-1">
                        <SearchIcon className="absolute top-1/2 left-3 size-5 -translate-y-1/2 transform text-muted-foreground" />

                        <Input
                            className="w-md py-5 pl-14 text-lg text-white placeholder:truncate placeholder:text-lg"
                            placeholder="Search for a city, e.g., New York"
                            type="search"
                        />
                    </div>

                    <Button className="bg-blue-600 px-5 py-5 text-md text-white hover:bg-blue-700">
                        Search
                    </Button>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Column - Main Weather Card */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Current Weather Card */}
                        <Card className="relative overflow-hidden bg-transparent">
                            <img
                                alt="bg-image"
                                className="absolute inset-0 -z-10 size-full object-cover"
                                src="/images/bg-today-large.svg"
                            />

                            <CardContent className="p-8">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-3xl text-white">
                                            Berlin, Germany
                                        </h3>
                                        <p className="mt-1 text-blue-200">
                                            Tuesday, Aug 5, 2025
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <img
                                            alt="sun icon"
                                            className="size-20"
                                            src="/images/icon-sunny.webp"
                                        />
                                        <span className="font-light text-7xl text-white">
                                            20°
                                        </span>
                                    </div>
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
                                        18°
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
                                        46%
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
                                        14 km/h
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
                                        0 mm
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
                                {dailyForecast.map((day, index) => (
                                    <Card
                                        className="border-slate-700 bg-slate-800/50"
                                        key={index}
                                    >
                                        <CardContent className="flex flex-col items-center p-4">
                                            <p className="mb-3 text-gray-400 text-sm">
                                                {day.day}
                                            </p>
                                            {day.icon}
                                            <div className="mt-3 text-center">
                                                <p className="font-semibold text-white">
                                                    {day.high}°
                                                </p>
                                                <p className="text-gray-400 text-sm">
                                                    {day.low}°
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
                                    <Button
                                        className="text-gray-400 hover:bg-slate-700 hover:text-white"
                                        size="sm"
                                        variant="ghost"
                                    >
                                        Tuesday
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {hourlyForecast.map((hour, index) => (
                                        <Card
                                            className="rounded-sm bg-gray-800"
                                            key={index}
                                        >
                                            <CardContent className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="justify-center">
                                                        {hour.icon}
                                                    </span>
                                                    <span className="text-white">
                                                        {hour.time}
                                                    </span>
                                                </div>

                                                <span className="text-right text-white">
                                                    {hour.temp}°
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
