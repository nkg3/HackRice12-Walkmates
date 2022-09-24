import React, { useState } from "react";
import "./SingUp.css";
import InputField from "../components/InputField";
import MyDatePicker from "../components/MyDatePicker";
import Dropdown from "../components/Dropdown";
import { db, auth, usersCollectionRef } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { isSameDateError } from "@mui/x-date-pickers/internals/hooks/validation/useDateValidation";
import { addDoc, collection } from "firebase/firestore";

const SignUp = ({setPage}) => {
    const list_major = [
        "Computer Science",
        "Electrical Engineering",
        "Psychology",
    ];
    const list_gender = ["Male", "Female"];

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [DOB, setDOB] = useState("");
    const [major, setMajor] = useState("");
    const [gender, setGender] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const displayError = () => {
        if (error) {
            return <div className='error-message'>{errorText}</div>;
        } else {
            return <br />;
        }
    };
    const SigningUp = async () => {
        if (
            !email ||
            !password ||
            !DOB ||
            !major ||
            !gender ||
            !firstName ||
            !lastName
        ) {
            setError(true);
            setErrorText("*Fill out all the fields");
        } else {
            try {
                const response = await createUserWithEmailAndPassword(auth, email, password);
                addDoc(usersCollectionRef, {
                    firstName: firstName,
                    lastName: lastName,
                    gender: gender,
                    dob: DOB,
                    major: major,
                    genderFilter: false,
                    uuid: response.user.uid
                });
                setPage("SignIn");
            } catch (e) {
                setError(true);
                if (e.code === "auth/email-already-in-use") {
                    setErrorText("*Email already in use");
                } else if (e.code === "auth/weak-password") {
                    setErrorText(
                        "*Password needs to be at least 6 charecters long"
                    );
                } else if (e.code === "auth/invalid-email") {
                    setError("*Invalid Email");
                }
                else{
                    setError("*An error occured")
                }
            }
        }
    };
    return (
        <div>
            <div className='sign-in-header'>
                <h1>Sign Up:</h1>
            </div>
            <div className='sign-in-container'>
                <div className='sign-in-input'>
                    <InputField setVal={setEmail} placeholder='Email' />
                </div>
                <div className='sign-in-input'>
                    <InputField setVal={setPassword} placeholder='Password' />
                </div>
                <div className='sign-in-input'>
                    <InputField
                        setVal={setFirstName}
                        placeholder='First Name'
                    />
                </div>
                <div className='sign-in-input'>
                    <InputField setVal={setLastName} placeholder='Last Name' />
                </div>
                <div className='DOB-container'>
                    <MyDatePicker label='Date of Birth' setVal={setDOB} />
                </div>
                <div className='major-container'>
                    <Dropdown
                        list={list_major}
                        label='Major'
                        setVal={setMajor}
                    />
                </div>
                <div className='Gender-container'>
                    <Dropdown
                        list={list_gender}
                        label='Gender'
                        setVal={setGender}
                    />
                </div>
                <div className='sign-in-sign-up-text'>
                    <p>Already have an account?</p>
                    <p
                        className='sign-in-sign-up'
                        onClick={() => window.location.assign("/")}
                    >
                        {" "}
                        Login In
                    </p>
                </div>
                {displayError()}

                <div className='sign-in-button'>
                    <button
                        onClick={SigningUp}
                        className='ui black button my-button'
                    >
                        Sign Up
                    </button>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default SignUp;
