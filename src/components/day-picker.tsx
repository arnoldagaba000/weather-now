import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

const data = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
];

const DayPicker = () => {
    return (
        <Select defaultValue="Monday">
            <SelectTrigger className="rounded-sm">
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    {data.map((day) => (
                        <SelectItem key={day.value} value={day.value}>
                            {day.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default DayPicker;
