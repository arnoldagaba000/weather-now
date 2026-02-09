import { createContext, useContext, useEffect, useState } from "react";

type TemperatureUnit = "celsius" | "fahrenheit";
type WindSpeedUnit = "kmh" | "mph";
type PrecipitationUnit = "mm" | "in";

interface UnitsConfig {
    temperature: TemperatureUnit;
    windSpeed: WindSpeedUnit;
    precipitation: PrecipitationUnit;
}

interface UnitsContextValue {
    units: UnitsConfig;
    setTemperatureUnit: (unit: TemperatureUnit) => void;
    setWindSpeedUnit: (unit: WindSpeedUnit) => void;
    setPrecipitationUnit: (unit: PrecipitationUnit) => void;
    convertTemperature: (celsius: number) => number;
    convertWindSpeed: (kmh: number) => number;
    convertPrecipitation: (mm: number) => number;
    getTemperatureSymbol: () => string;
    getWindSpeedSymbol: () => string;
    getPrecipitationSymbol: () => string;
}

const UnitsContext = createContext<UnitsContextValue | undefined>(undefined);

const defaultUnits: UnitsConfig = {
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm",
};

export function UnitsProvider({ children }: { children: React.ReactNode }) {
    const [units, setUnits] = useState<UnitsConfig>(() => {
        // Load from localStorage on mount
        if (typeof window === "undefined") {
            return defaultUnits;
        }

        const stored = localStorage.getItem("weather-units");
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch {
                return defaultUnits;
            }
        }
        return defaultUnits;
    });

    // Save to localStorage whenever units change
    useEffect(() => {
        localStorage.setItem("weather-units", JSON.stringify(units));
    }, [units]);

    const setTemperatureUnit = (unit: TemperatureUnit) => {
        setUnits((prev) => ({ ...prev, temperature: unit }));
    };

    const setWindSpeedUnit = (unit: WindSpeedUnit) => {
        setUnits((prev) => ({ ...prev, windSpeed: unit }));
    };

    const setPrecipitationUnit = (unit: PrecipitationUnit) => {
        setUnits((prev) => ({ ...prev, precipitation: unit }));
    };

    // Conversion functions
    const convertTemperature = (celsius: number): number => {
        if (units.temperature === "fahrenheit") {
            return (celsius * 9) / 5 + 32;
        }
        return celsius;
    };

    const convertWindSpeed = (kmh: number): number => {
        if (units.windSpeed === "mph") {
            return kmh * 0.621_371;
        }
        return kmh;
    };

    const convertPrecipitation = (mm: number): number => {
        if (units.precipitation === "in") {
            return mm * 0.039_370_1;
        }
        return mm;
    };

    // Symbol getters
    const getTemperatureSymbol = (): string => {
        return units.temperature === "celsius" ? "°C" : "°F";
    };

    const getWindSpeedSymbol = (): string => {
        return units.windSpeed === "kmh" ? "km/h" : "mph";
    };

    const getPrecipitationSymbol = (): string => {
        return units.precipitation === "mm" ? "mm" : "in";
    };

    const value: UnitsContextValue = {
        units,
        setTemperatureUnit,
        setWindSpeedUnit,
        setPrecipitationUnit,
        convertTemperature,
        convertWindSpeed,
        convertPrecipitation,
        getTemperatureSymbol,
        getWindSpeedSymbol,
        getPrecipitationSymbol,
    };

    return (
        <UnitsContext.Provider value={value}>{children}</UnitsContext.Provider>
    );
}

export function useUnits() {
    const context = useContext(UnitsContext);
    if (context === undefined) {
        throw new Error("useUnits must be used within a UnitsProvider");
    }

    return context;
}
