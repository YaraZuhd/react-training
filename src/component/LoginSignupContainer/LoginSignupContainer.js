import React from 'react';
import Login from "../Login/Login";
import  Signup  from "../Signup/Signup";
import "./LoginSignupContainer.css"

const LoginSignupContainer = (props) => {

    return(
        <div className="login-signup-container">
            {props.login === "true" && <Login/>}
            {props.login === "false" && <Signup/>}
        </div>
    );
}

export default LoginSignupContainer;