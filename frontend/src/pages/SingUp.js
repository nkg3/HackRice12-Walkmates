import React from "react";
import "./SingUp.css";
import InputField from "../components/InputField";
import MyDatePicker from "../components/MyDatePicker";

const SignUp = () => {
    return (
        <div>
            <div className='sign-in-header'>
                <h1>Sign Up:</h1>
            </div>
            <div className='sign-in-container'>
                <div className='sign-in-input'>
                    <InputField placeholder='Email' />
                </div>
                <div className='sign-in-input'>
                    <InputField placeholder='Password' />
                </div>
                <div className='sign-in-input'>
                    <InputField placeholder='First + Last Name' />
                </div>
                <div className='sign-in-input'>
                    <MyDatePicker label = "Date of Birth"/>
                </div>
                <div className='sign-in-input'>
                    <InputField placeholder='Major' />
                </div>
                <div className='sign-in-button'>
                    <button className='ui black button my-button'>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
