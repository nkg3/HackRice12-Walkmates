import React, { useState, useEffect } from "react";
import { db, auth, usersCollectionRef } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { query, where, getDocs} from 'firebase/firestore';

const Main = ({ setPage }) => {


    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        major: "",
        genderFilter: "",
        phone: "",
        uuid: ""
    });

    useEffect(() => {
        const getUser = async () => {
            console.log("in function")
            const data = await getDocs(query(usersCollectionRef, where("uuid", "==", auth.currentUser.uid)));
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
            const getData = async () => {

                
            }
            const response = getData();
            console.log(response)
            console.log(userData)
        } else {
            // setAuthUser(null);
            setPage("SignIn");
        }
    });
    

    return (
        <div>
            <h1>Main Page</h1>
            <h2>Welcome, {userData.firstName}</h2>
        </div>
    )
};

export default Main;