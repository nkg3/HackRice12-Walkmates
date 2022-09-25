import React, { useState } from "react";
import InputField from "../components/InputField";
import Clock from "../components/Clock";

const Request = ({ logOut, userData, setSearchState }) => {
    const [fromInput, setFromInput] = useState("");
    const [toInput, setToInput] = useState("");
    const [earliestTime, setEarliestTime] = useState("");
    const [latestTime, setLatestTime] = useState("");

    const findGroup = () => {
        console.log(earliestTime);
        console.log(latestTime);
        setSearchState("searching");
    };

    return (
        <div>
            <div onClick={logOut} className='sign-in-sign-up'>
                Sign out
            </div>
            <div>
                <h1 className='sign-in-header'>
                    Welcome Back {userData.firstName}!
                </h1>
            </div>

            <h3 className='main-subheader'>Find your walk group:</h3>
            <div className='sign-in-container'>
                <div className='sign-in-input'>
                    <InputField placeholder='From:' setVal={setFromInput} />
                </div>
                <div className='sign-in-input'>
                    <InputField placeholder='To:' setVal={setToInput} />
                </div>
                <div className='clocks-container'>
                    <div className='clock'>
                        <Clock label='Earliest Time' setVal={setEarliestTime} />
                    </div>
                    <div className='clock'>
                        <Clock label='Latest Time' setVal={setLatestTime} />
                    </div>
                </div>
                <br />
                <div className='main-button'>
                    <button onClick={findGroup} className='ui black button'>
                        Find group!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Request;
