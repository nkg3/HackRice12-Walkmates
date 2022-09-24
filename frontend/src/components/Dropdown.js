import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function Dropdown({ setVal ,list, label }) {
    return (
        <div className='my-button'>
            <Autocomplete
                disablePortal
                options={list}
                onChange = {(e) => setVal(e.target.innerHTML)}
                sx={{ width: 300 }}
                renderInput={(params) => (
                    <TextField
                        onChange={(e) => console.log(e.target)}
                        {...params}
                        label={label}
                    />
                )}
            />
        </div>
    );
}
