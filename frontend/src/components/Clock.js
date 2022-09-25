import * as React from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

export default function Clock({ label, setVal }) {
    const [value, setValue] = React.useState(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileTimePicker
                label={label}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    let hours = "";
                    if (newValue.$d.getHours().toString().length === 1) {
                        hours = "0" + newValue.$d.getHours();
                    } else {
                        hours = newValue.$d.getHours();
                    }
                    let minutes = "";
                    if (newValue.$d.getMinutes().toString().length === 1) {
                        minutes = "0" + newValue.$d.getMinutes();
                    } else {
                        minutes = newValue.$d.getMinutes();
                    }
                    setVal(hours + ":" + minutes);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
