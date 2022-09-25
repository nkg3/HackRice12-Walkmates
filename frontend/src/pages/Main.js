import React, { useState, useEffect } from "react";
import { db, auth, usersCollectionRef } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { query, where, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import Searching from "./Searching";
import "./Main.css";
import Request from "./Request";
import GroupFound from "./GroupFound";

const Main = ({ setPage }) => {
    const [searchState, setSearchState] = useState("groupFound");

    const logOut = async () => {
        await signOut(auth);
    };

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        major: "",
        genderFilter: "",
        phone: "",
        uuid: "",
    });

    useEffect(() => {
        const getUser = async () => {
            const data = await getDocs(
                query(
                    usersCollectionRef,
                    where("uuid", "==", auth.currentUser.uid)
                )
            );
            data.forEach((doc) => {
                setUserData(doc.data());
            });
        };

        getUser();
    }, []);

    onAuthStateChanged(auth, (user) => {
        //console.log(user);
        if (user) {
            // setAuthUser(user);
        } else {
            // setAuthUser(null);
            setPage("SignIn");
        }
    });

    if (searchState === "none") {
        return (
            <Request
                logOut={logOut}
                userData={userData}
                setSearchState={setSearchState}
            />
        );
    } else if (searchState === "searching") {
        return (
            <Searching
                setSearchState={setSearchState}
                userData={userData}
                logOut={logOut}
            />
        );
    } else if (searchState === "groupFound") {
        return <GroupFound userData={userData} logOut={logOut} setSearchState = {setSearchState}/>;
    }
};

export default Main;
