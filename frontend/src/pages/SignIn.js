import React from "react";
import InputField from "../components/InputField";
import "./SignIn.css";

const SignIn = () => {
  return (
    <div>
      <div className='sign-in-header'>
        <h1>Sign In:</h1>
      </div>
      <div className='sign-in-container'>
        <div className='sign-in-input'>
          <InputField placeholder='Email' />
        </div>
        <div className='sign-in-input'>
          <InputField placeholder='Password' />
        </div>
        <div className='sign-in-sign-up-text'>
          <p>Don't have an account?</p>
          <p className='sign-in-sign-up'> Sign Up</p>
        </div>
        <div className='sign-in-button'>
          <button className='ui black button my-button'>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
