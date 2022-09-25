import { map } from "@firebase/util";
import { Card } from "@mui/material";
import React, { useState } from "react";

const GroupFound = ({ logOut, userData, setSearchState }) => {
    const [started, setStarted] = useState(false);

    const startWalk = () => {
        setStarted(!started)
    }

    const cancelWalk = () => {
        //do stuff
        setSearchState("none");

    }
    const group = [
        {
            firstName: "nik",
            lastName: "guatam",
            Age: "15",
            major: "computer science",
            phone: "2819285901",
            gender: "Male",
            img: "https://st.depositphotos.com/1269204/1219/i/950/depositphotos_12196477-stock-photo-smiling-men-isolated-on-the.jpg",
        },
        {
            firstName: "victor",
            lastName: "neymar",
            Age: "20",
            major: "Math",
            phone: "2816847475",
            gender: "Male",
            img: "https://media-exp1.licdn.com/dms/image/D5635AQFdzjcQLXR-KA/profile-framedphoto-shrink_800_800/0/1659715611062?e=1664679600&v=beta&t=2vqqR8fPdBYsCbOV_MkuXGFxdOfQ6dSYDEtQQ2U5aZI",
        },
        {
            firstName: "Bill",
            lastName: "farooq",
            Age: "20",
            major: "Electrical Engineering",
            phone: "2816823475",
            gender: "Female",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxVu5Q8f6xrJZQ3gwh2Fvs6hR8Xr6Zsg2fbzSkf-vMWk3DPI-96OJ_ZEyxkfVjg0OwKxc&usqp=CAU",
        },
    ];

    const displayGroup = () => {
        return group.map((person) => {
            return (
                <div className='card-container-results'>
                    <Card>
                        <div className='inner-card-container'>
                            <div>
                                <div className='card-div'>
                                    <h3>
                                        {person.firstName +
                                            " " +
                                            person.lastName}
                                    </h3>
                                </div>
                                <div className='card-div'>
                                    <h5>Age:</h5> {person.Age}
                                </div>
                                <div className='card-div'>
                                    <h5>Gender: </h5>
                                    {person.gender}
                                </div>
                                <div className='card-div'>
                                    <h5>Phone Number: </h5> {person.phone}
                                </div>
                                <div className='card-div'>
                                    <h5>Major: </h5> {person.major}
                                </div>
                            </div>

                            <div className='image'>
                                <img
                                    src={person.img}
                                    width='100%'
                                    alt='picture'
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            );
        });
    };
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
                <h3 className='searching-header'>Here is your group:</h3>
                {displayGroup()}
            </div>
            <div className="group-found-buttons">
                <button onClick = {startWalk} className={`ui ${started ? "black" : "blue"} button group-button`}>{started ? "End walk" : "Start Walk"}</button>
                <button onClick={cancelWalk}   className= 'ui red button group-button' >Cancel Walk</button>
            </div>
            <br/>
        </div>
    );
};

export default GroupFound;
