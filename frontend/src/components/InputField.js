import React from "react";
import { useState } from "react";
import "./InputField.css";

const InputField = ({ placeholder, setVal, type }) => {
    const [userInput, setUserInput] = useState("");

    return (
        <div className='ui input input-field'>
            <input
                type={type}
                placeholder={placeholder}
                onChange={(e) => {
                    setUserInput(e.target.value);
                    setVal(e.target.value);
                }}
                value={userInput}
            />
        </div>
    );
};

export default InputField;
