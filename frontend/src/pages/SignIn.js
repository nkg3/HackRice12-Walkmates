import React, { useState } from "react";
import InputField from "../components/InputField";
import "./SignIn.css";
import { db, auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { isSameDateError } from "@mui/x-date-pickers/internals/hooks/validation/useDateValidation";

const SignIn = ({ setPage }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const displayError = () => {
        if (error) {
            return (
                <div className='error-message'>
                    *Incorrect username or password
                </div>
            );
        } else {
            return <br />;
        }
    };

    const authenticate = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setPage("Main");
        } catch {
            return setError(true);
        }
    };

    return (
        <div>
            <div className='sign-in-header'>
                <h1>Sign In:</h1>
            </div>
            <div className='sign-in-container'>
                <div className='sign-in-input'>
                    <InputField placeholder='Email' setVal={setEmail} />
                </div>
                <div className='sign-in-input'>
                    <InputField placeholder='Password' setVal={setPassword} />
                </div>
                <div className='sign-in-sign-up-text'>
                    <p>Don't have an account?</p>
                    <p
                        className='sign-in-sign-up'
                        onClick={() => setPage("SignUp")}
                    >
                        {" "}
                        Sign Up
                    </p>
                </div>
                {displayError()}
                <div className='sign-in-button'>
                    <button
                        className='ui black button my-button'
                        onClick={authenticate}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
