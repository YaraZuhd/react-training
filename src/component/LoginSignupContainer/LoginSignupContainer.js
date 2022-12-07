// import { useEffect, useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import React from 'react';
import Login from "../Login/Login";
import  Signup  from "../Signup/Signup";
import "./LoginSignupContainer.css"

const LoginSignupContainer = (props) => {
    // const [isLogin, setIsLogin] = useState(true);

    // const location = useLocation();

    // const navigate = useNavigate()

    // useEffect(()=>{
    //     if(location.pathname === '/signup'){
    //         LoginSignupRef.current.classList.toggle("active");
    //     }
    // },[location])

    // const LoginSignupRef = useRef(null);

    // const handleClick = () => {
    //     setIsLogin(!isLogin);
    //     LoginSignupRef.current.classList.toggle("active");
    //     if(location.pathname === '/signup'){
    //         navigate('/');
    //     }else{
    //        navigate('/signup');
    //        LoginSignupRef.current.classList.toggle("active");
    //     }
    // }

    return(
        <div className="login-signup-container">
            {props.login === "true" && <Login/>}
            {props.login === "false" && <Signup/>}
        </div>
    );
}

export default LoginSignupContainer;