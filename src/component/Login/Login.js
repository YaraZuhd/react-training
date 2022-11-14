import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [state, setState]  =useState({loggedIn:true});
    const [errorState, setErrorState] = useState("");
    const [userInput, setUserInput] = useState({
        userEmail: "",
        userPassword: "",
    });
    const emailChangeHandler = (event) => {
        event.preventDefault()
        setUserInput((prevState) => {
            return {...prevState, userEmail: event.target.value}
        })
    };

    const passwordChangeHandler = (event) => {
        event.preventDefault()
        setUserInput((prevState) => {
            return {...prevState, userPassword: event.target.value}
        })
    };


    const loginUser = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userInput.userEmail, password: userInput.userPassword })
            };
            const response = await fetch('http://localhost:3000/login', requestOptions)
            console.log(response);
            if(response.status === 200 && response.ok){
                const data = await response.text();
                localStorage.setItem('token', data)
                setState({loggedIn: true});
                navigate('/');
            }
            else {
                setErrorState("Email or Password is invalid");

            }
         } catch(error) {
            console.log(error.message);
            setErrorState("Invalid Information");
        }
        if(errorState === "") {
            setUserInput({userEmail: "", userPassword: ""});
        }
    };

    const handleLogin = (event) => {
        event.preventDefault();
        if(userInput.userEmail === "" || userInput.userPassword === ""){
            setErrorState("Email or Password is invalid");
        }else{
            loginUser(setUserInput);
        }
    };


    return (
        <div className="login">
            <h1>Login</h1>
            <form>
                <input value={userInput.userEmail} required ={true} 
                type={'email'} placeholder={'Email'} onChange={emailChangeHandler}/>
                <input value={userInput.userPassword} required ={true} 
                type={'password'} placeholder={'Password'} onChange={passwordChangeHandler}/>
                <button type="submit" onClick={handleLogin}>Login</button>
            </form>
            <p>{errorState}</p>
        </div>
    );
}

export default Login;