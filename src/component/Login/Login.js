import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [state, setState]  =useState({loggedIn:true});
    const [errorState, setErrorState] = useState({"errorMessage": "", "type": ""});
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
            if(response.status === 200 && response.ok){
                const data = await response.text();
                localStorage.setItem('token', data)
                setState({loggedIn: true});
                navigate('/');
                //authContext.setLoggedInState(true)
                //history.push("./home")
            }
            else {
                throw new Error("Email or Password is invalid")
                //authContext.setLoggedInState(false)
            }
         } catch(error) {
            console.log(error.message);
            //authContext.setLoggedInState(false)
            setErrorState({"errorMessage": error.message, "type": error.name});
        }
    };

    const handleLogin = (event) => {
        event.preventDefault();
        loginUser(setUserInput);
        setUserInput({userEmail: "", userPassword: ""});
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
            <p>{errorState.errorMessage}</p>
        </div>
    );
}

export default Login;