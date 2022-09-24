import React from "react";
import { useState } from "react";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const MyDatePicker = ({ label, setVal }) => {
    const [value, setValue] = useState(null);

    return (
        <div className="my-button">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label={label}
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                        setVal(newValue.$d);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </div>
    );
};

export default MyDatePicker;
