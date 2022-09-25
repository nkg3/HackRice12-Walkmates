import React, { useState, useEffect, useLayoutEffect } from "react";
import { db, auth, usersCollectionRef } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { query, where, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import Searching from "./Searching";
import "./Main.css";
import Request from "./Request";
import GroupFound from "./GroupFound";

const Main = ({ setPage }) => {
    const [searchState, setSearchState] = useState("none");

    const [uid, setUid] = useState("");

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
        const data = window.localStorage.getItem("MY_SEARCH_STATE");
        if(data)
            setSearchState(JSON.parse(data));

        const data_user = window.localStorage.getItem("USER_INFO");
        if(data_user)
            setUserData(JSON.parse(data_user));

    }, []);

    useEffect(() => {
        window.localStorage.setItem(
            "MY_SEARCH_STATE",
            JSON.stringify(searchState)
        );
        window.localStorage.setItem("USER_INFO", JSON.stringify(userData));
    }, [searchState, userData]);

    const logOut = async () => {
        await signOut(auth);
    };

    onAuthStateChanged(auth, (user) => {
        if (user) {
                const getUsers = async () => {
                    getDocs(query(
                        usersCollectionRef,
                        where("uuid", "==", uid)
                    )).then((data) => {
                        data.forEach((doc) => {
                            setUserData(doc.data());
                        });
                    });
                }
                getUsers();
        } else {
            setUid("");
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
        return (
            <GroupFound
                userData={userData}
                logOut={logOut}
                setSearchState={setSearchState}
            />
        );
    }
};

export default Main;
