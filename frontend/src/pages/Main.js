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
    const [searchState, setSearchState] = useState("none");

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
            try {
                const data = await getDocs(
                    query(
                        usersCollectionRef,
                        where("uuid", "==", auth.currentUser.uid)
                    )
                );
                data.forEach((doc) => {
                    setUserData(doc.data());
                });
            } catch (e) {
                console.log(e);
            }
        };

        getUser();

        const data = window.localStorage.getItem("MY_SEARCH_STATE");
        setSearchState(JSON.parse(data));

        const data_user = window.localStorage.getItem("USER_INFO");
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
