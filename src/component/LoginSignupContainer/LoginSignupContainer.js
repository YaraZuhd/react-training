import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Login from "../Login/Login";
import  Signup  from "../Signup/Signup";
import "./LoginSignupContainer.css"

const LoginSignupContainer = () => {
    const [isLogin, setIsLogin] = useState(true);

    const location = useLocation();

    const navigate = useNavigate()

    useEffect(()=>{
        if(location.pathname === '/signup'){
            LoginSignupRef.current.classList.toggle("active");
        }
    },[location])

    const LoginSignupRef = useRef(null);

    const handleClick = () => {
        setIsLogin(!isLogin);
        LoginSignupRef.current.classList.toggle("active");
        if(location.pathname === '/signup'){
            navigate('/');
        }else{
           navigate('/signup');
           LoginSignupRef.current.classList.toggle("active");
        }
    }

    return(
        <div className="login-signup-container" ref={LoginSignupRef}>
            <Login/>
            <div className="side-div">
                <button type="button" onClick={handleClick}>
                    {isLogin ? "Signup" : "Login"}
                </button>
            </div>
            <Signup loginStatus={handleClick}/>
        </div>
    );
}

export default LoginSignupContainer;