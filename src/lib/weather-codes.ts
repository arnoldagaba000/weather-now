export const WEATHER_CODES = {
    0: {
        href: "/images/icon-sunny.webp",
        alt: "sunny-icon",
        description: "Clear sky",
    },
    1: {
        href: "/images/icon-sunny.webp",
        alt: "mainly-clear-icon",
        description: "Mainly clear",
    },
    2: {
        href: "/images/icon-partly-cloudy.webp",
        alt: "partly-cloudy-icon",
        description: "Partly cloudy",
    },
    3: {
        href: "/images/icon-overcast.webp",
        alt: "overcast-icon",
        description: "Overcast",
    },
    45: { href: "/images/icon-fog.webp", alt: "fog-icon", description: "Fog" },
    48: {
        href: "/images/icon-fog.webp",
        alt: "rime-fog-icon",
        description: "Depositing rime fog",
    },
    51: {
        href: "/images/icon-drizzle.webp",
        alt: "light-drizzle-icon",
        description: "Light drizzle",
    },
    53: {
        href: "/images/icon-drizzle.webp",
        alt: "moderate-drizzle-icon",
        description: "Moderate drizzle",
    },
    55: {
        href: "/images/icon-drizzle.webp",
        alt: "dense-drizzle-icon",
        description: "Dense drizzle",
    },
    56: {
        href: "/images/icon-drizzle.webp",
        alt: "light-freezing-drizzle-icon",
        description: "Light freezing drizzle",
    },
    57: {
        href: "/images/icon-drizzle.webp",
        alt: "dense-freezing-drizzle-icon",
        description: "Dense freezing drizzle",
    },
    61: {
        href: "/images/icon-drizzle.webp",
        alt: "slight-rain-icon",
        description: "Slight rain",
    },
    63: {
        href: "/images/icon-drizzle.webp",
        alt: "moderate-rain-icon",
        description: "Moderate rain",
    },
    65: {
        href: "/images/icon-drizzle.webp",
        alt: "heavy-rain-icon",
        description: "Heavy rain",
    },
    66: {
        href: "/images/icon-drizzle.webp",
        alt: "light-freezing-rain-icon",
        description: "Light freezing rain",
    },
    67: {
        href: "/images/icon-drizzle.webp",
        alt: "heavy-freezing-rain-icon",
        description: "Heavy freezing rain",
    },
    71: {
        href: "/images/icon-snow.webp",
        alt: "slight-snow-icon",
        description: "Slight snow fall",
    },
    73: {
        href: "/images/icon-snow.webp",
        alt: "moderate-snow-icon",
        description: "Moderate snow fall",
    },
    75: {
        href: "/images/icon-snow.webp",
        alt: "heavy-snow-icon",
        description: "Heavy snow fall",
    },
    77: {
        href: "/images/icon-snow.webp",
        alt: "snow-grains-icon",
        description: "Snow grains",
    },
    80: {
        href: "/images/icon-drizzle.webp",
        alt: "slight-rain-showers-icon",
        description: "Slight rain showers",
    },
    81: {
        href: "/images/icon-drizzle.webp",
        alt: "moderate-rain-showers-icon",
        description: "Moderate rain showers",
    },
    82: {
        href: "/images/icon-drizzle.webp",
        alt: "violent-rain-showers-icon",
        description: "Violent rain showers",
    },
    85: {
        href: "/images/icon-snow.webp",
        alt: "slight-snow-showers-icon",
        description: "Slight snow showers",
    },
    86: {
        href: "/images/icon-snow.webp",
        alt: "heavy-snow-showers-icon",
        description: "Heavy snow showers",
    },
    95: {
        href: "/images/icon-storm.webp",
        alt: "thunderstorm-icon",
        description: "Thunderstorm",
    },
    96: {
        href: "/images/icon-storm.webp",
        alt: "thunderstorm-slight-hail-icon",
        description: "Thunderstorm with slight hail",
    },
    99: {
        href: "/images/icon-storm.webp",
        alt: "thunderstorm-heavy-hail-icon",
        description: "Thunderstorm with heavy hail",
    },
} as const;

export type WeatherCode = keyof typeof WEATHER_CODES;

// Helper function to get weather icon details based on weather code
export function getImageDetails(code: number) {
    // Clear and mainly clear (0-1)
    if (code === 0 || code === 1) {
        return WEATHER_CODES[0];
    }

    // Partly cloudy (2)
    if (code === 2) {
        return WEATHER_CODES[2];
    }

    // Overcast (3)
    if (code === 3) {
        return WEATHER_CODES[3];
    }

    // Fog (45, 48)
    if (code === 45 || code === 48) {
        return WEATHER_CODES[45];
    }

    // Drizzle, rain, and rain showers (51-67, 80-82)
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
        return WEATHER_CODES[51];
    }

    // Snow fall and snow showers (71-77, 85-86)
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
        return WEATHER_CODES[71];
    }

    // Thunderstorm (95, 96, 99)
    if (code === 95 || code === 96 || code === 99) {
        return WEATHER_CODES[95];
    }

    // Default fallback to partly cloudy
    return WEATHER_CODES[2];
}