import React, { useState } from "react";
import { Card } from "@mui/material";

const Searching = ({ userData, logOut, setSearchState }) => {
    const request = {
        minTime: "12:00AM",
        maxTime: "3:00AM",
        from: "Rice University",
        to: "Texas A&M",
        genderPref: "At least one person of the same gender",
    };

    const cancelRequest = () => {
        /*do stuff*/
        setSearchState("none");
    }
    return (
        <div>
            <div onClick={logOut} className='sign-in-sign-up'>
                Sign out
            </div>
            <br />
            
            <div>
                <div className='searching-header'>
                    <h1>Welcome Back {userData.firstName}!</h1>
                </div>
            </div>
            <br/>
            <h3 className="searching-header">We are finding you a group</h3>
            <div class="ui active centered inline loader"></div>
            <div className='card-container'>
                <Card>
                    <div className='inner-card-container'>
                        <div className='search-request'>
                            <h3>Your Search request:</h3>
                        </div>
                        <div className='card-info'>
                            <div className='card-div'>
                                <h5>From:</h5> {request.from}
                            </div>
                            <div className='card-div'>
                                <h5>To:</h5> {request.to}
                            </div>
                            <div className='card-div'>
                                <h5>Earliest Time: </h5>
                                {request.minTime}
                            </div>
                            <div className='card-div'>
                                <h5>Latest Time: </h5> {request.maxTime}
                            </div>
                            <div className='card-div'>
                                <h5>Gender Preference:</h5> {request.genderPref}
                            </div>
                            <button onClick = {cancelRequest} className='ui red button cancel-button'>
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
