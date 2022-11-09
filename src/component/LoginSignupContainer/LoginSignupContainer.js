import { useRef, useState } from "react";
import Login from "../Login/Login";
import  Signup  from "../Signup/Signup";
import "./LoginSignupContainer.css"

const LoginSignupContainer = () => {
    const [isLogin, setIsLogin] = useState(true);

    const LoginSignupRef = useRef(null);

    const handleClick = () => {
        setIsLogin(!isLogin);
        LoginSignupRef.current.classList.toggle("active");
    }

    return(
        <div className="login-signup-container" ref={LoginSignupRef}>
            <Login/>
            <div className="side-div">
                <button type="button" onClick={handleClick}>
                    {isLogin ? "Signup" : "Login"}
                </button>
            </div>
            <Signup/>
        </div>
    );
}

export default LoginSignupContainer;