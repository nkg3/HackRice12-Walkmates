import React, { useState } from "react";
import InputField from "../components/InputField";
import Clock from "../components/Clock";
import { Checkbox, StyledEngineProvider } from "@mui/material";
import { getFunctions, httpsCallable } from "firebase/functions";

const Request = ({ logOut, userData, setSearchState, setGId }) => {
    const label = { inputProps: { "aria-label": "Checkbox demo" } };
    const [fromInput, setFromInput] = useState("");
    const [toInput, setToInput] = useState("");
    const [earliestTime, setEarliestTime] = useState(null);
    const [latestTime, setLatestTime] = useState(null);
    const [genderPref, setGenderPref] = useState(false);

    const findGroup = async () => {
        window.localStorage.setItem(
            "START_LOCATION",
            JSON.stringify(fromInput)
        );
        window.localStorage.setItem("END_LOCATION", JSON.stringify(toInput));
        window.localStorage.setItem(
            "START_TIME",
            JSON.stringify(earliestTime.$d)
        );
        window.localStorage.setItem(
            "END_TIME",
            JSON.stringify(latestTime.$d)
        );
        window.localStorage.setItem("GENDER_PREF", JSON.stringify(genderPref));
        let early;
        let late;
        if (earliestTime.valueOf() < Date.now()) {
            early = earliestTime.valueOf() + 86400000;
        } else {
            early = earliestTime.valueOf();
        }
        if (latestTime.valueOf() <= early) {
            late = latestTime.valueOf() + 86400000;
            if (late <= early) {
                late = late + 86400000;
            }
        } else {
            late = latestTime.valueOf();
        }

        let temp1 = fromInput.replace(/ /g, "+");

        let temp2 = toInput.replace(/ /g, "+");

        const to_send = {
            startAddress: temp1,
            endAddress: temp2,
            startTime: early,
            endTime: late,
            genderPref: genderPref,
        };
        const functions = getFunctions();
        const searchGroup = httpsCallable(functions, "findGroup");
        const groupId = await searchGroup(to_send);
        setGId(groupId.data);
        
        
        window.localStorage.setItem("GROUP_ID", JSON.stringify(groupId.data));
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
                        <Clock setVal={setEarliestTime} label='Start time' />
                    </div>
                    <div className='clock'>
                        <Clock setVal={setLatestTime} label='End time' />
                    </div>
                </div>
                <div>
                    <Checkbox
                        {...label}
                        onChange={() => setGenderPref(!genderPref)}
                    />
                    least 1 person of my same gender
                </div>
                <br />
                <div className='main-button'>
                    <button
                        onClick={() => findGroup()}
                        className='ui black button'
                    >
                        Find group!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Request;
