/** biome-ignore-all lint/correctness/useImageSize: Ignore */
import { SettingsIcon } from "lucide-react";
import { useUnits } from "@/context/units-context";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, // Make sure this is imported!
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const UnitsMenu = () => {
    const {
        units,
        setTemperatureUnit,
        setWindSpeedUnit,
        setPrecipitationUnit,
    } = useUnits();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        className="flex items-center gap-1 p-5 text-md"
                        variant="secondary"
                    >
                        <SettingsIcon className="size-4" />

                        <div className="flex items-center gap-2">
                            <span>Units</span>
                            <img
                                alt="dropdown-icon"
                                className="size-3"
                                src="/images/icon-dropdown.svg"
                            />
                        </div>
                    </Button>
                }
            />

            <DropdownMenuContent align="end" className="w-56">
                {/* Temperature Group */}
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Temperature</DropdownMenuLabel>

                    <DropdownMenuRadioGroup
                        onValueChange={(value) =>
                            setTemperatureUnit(
                                value as "celsius" | "fahrenheit"
                            )
                        }
                        value={units.temperature}
                    >
                        <DropdownMenuRadioItem value="celsius">
                            Celsius (°C)
                        </DropdownMenuRadioItem>

                        <DropdownMenuRadioItem value="fahrenheit">
                            Fahrenheit (°F)
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* Wind Speed Group */}
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Wind Speed</DropdownMenuLabel>

                    <DropdownMenuRadioGroup
                        onValueChange={(value) =>
                            setWindSpeedUnit(value as "kmh" | "mph")
                        }
                        value={units.windSpeed}
                    >
                        <DropdownMenuRadioItem value="kmh">
                            km/h
                        </DropdownMenuRadioItem>

                        <DropdownMenuRadioItem value="mph">
                            mph
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* Precipitation Group */}
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Precipitation</DropdownMenuLabel>

                    <DropdownMenuRadioGroup
                        onValueChange={(value) =>
                            setPrecipitationUnit(value as "mm" | "in")
                        }
                        value={units.precipitation}
                    >
                        <DropdownMenuRadioItem value="mm">
                            Millimeters (mm)
                        </DropdownMenuRadioItem>

                        <DropdownMenuRadioItem value="in">
                            Inches (in)
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UnitsMenu;
