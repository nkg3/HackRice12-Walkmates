import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { getDocs, query } from "firebase/firestore";
import { groupsCollectionRef } from "../firebaseConfig";
import { where } from "firebase/firestore";

const Searching = ({ userData, logOut, setSearchState }) => {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [startLoc, setStartLoc] = useState(null);
    const [endLoc, setEndLoc] = useState(null);
    const [gen, setGen] = useState(null);

    const [alone, setAlone] = useState(true);
    const [groupId,setGroupId] = useState(null);

    useEffect(() => {
        let data = localStorage.getItem("START_TIME");
        setStartTime(JSON.parse(data));

        data = localStorage.getItem("END_TIME");
        setEndTime(JSON.parse(data));

        data = localStorage.getItem("START_LOCATION");
        setStartLoc(JSON.parse(data));

        data = localStorage.getItem("END_LOCATION");
        setEndLoc(JSON.parse(data));

        data = localStorage.getItem("GENDER_PREF");
        setGen(JSON.parse(data));

        data = localStorage.getItem("GROUP_ID");
        setGroupId(JSON.parse(data))
        // const changeState = () => {
        //     setSearchState("groupFound");
        // };
        // setTimeout(() => changeState(), 200000);
    }, []);

    useEffect(()=> {
        setTimeout(() => {
            console.log(groupId)
            getDocs(query(
                groupsCollectionRef,
                where("groupID", "==", groupId)
            )).then((data) => {
                data.forEach((doc) => {
                    if(doc.data.number > 1){
                        console.log("more than one in a group")
                    }
                    else{
                        console.log("in group by yourself")
                    }
                })
            })
        }, 10000)
    }, [alone])


    const cancelRequest = () => {
        setSearchState("none");
    };
    return (
        <div>
            <div onClick={logOut} className='sign-in-sign-up'>
                Sign out
            </div>
            <br />

            <div>
                <div className='searching-header'>
                    <h1>Welcome Back!</h1>
                </div>
            </div>
            <br />
            <h3 className='searching-header'>We are finding you a group</h3>
            <div class='ui active centered inline loader'></div>
            <div className='card-container'>
                <Card>
                    <div className='inner-card-container'>
                        <div className='search-request'>
                            <h3>Your Search request:</h3>
                        </div>
                        <div className='card-info'>
                            <div className='card-div'>
                                <h5>From:</h5> {startLoc}
                            </div>
                            <div className='card-div'>
                                <h5>To:</h5> {endLoc}
                            </div>
                            <div className='card-div'>
                                <h5>Earliest Time: </h5>
                                {startTime}
                            </div>
                            <div className='card-div'>
                                <h5>Latest Time: </h5>{" "}
                                {endTime}
                            </div>
                            <div className='card-div'>
                                <h5>Gender Preference:</h5>{" "}
                                {gen === "true"
                                    ? "Need one person of same gender"
                                    : "no preference"}
                            </div>
                            <button
                                onClick={cancelRequest}
                                className='ui red button cancel-button'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Searching;
