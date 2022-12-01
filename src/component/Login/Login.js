import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [state, setState]  =useState({loggedIn:true});
    const [ errorMessage, setErrorMessage] = useState({
        emailError: "",
        passwordError: "",
    })
    const [errorState, setErrorState] = useState("");
    const [userInput, setUserInput] = useState({
        userEmail: "",
        userPassword: "",
    });

    function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    }

    const emailChangeHandler = (event) => {
        event.preventDefault();
        if(!isValidEmail(event.target.value)){
          setErrorMessage((prevState) => {
            return {...prevState, emailError: 'Invalid Email'}
          });
        }
        if(event.target.value.length === 0){
          setUserInput((prevState) => {
            return {...prevState, userEmail: ''}
          });
        }
      
        if (!event.target.value || event.target.value === ''  ) {
          setErrorMessage((prevState) => {
            return {...prevState, emailError: 'Email is required'}
          });
        }else{
          setErrorMessage((prevState) => {
            return {...prevState, emailError: ""}
          });
          setUserInput((prevState) => {
            return {...prevState, userEmail: event.target.value}
          });
        }  
    };

    const passwordChangeHandler = (event) => {
        event.preventDefault();
        if(event.target.value.length === 0){
          setUserInput((prevState) => {
            return {...prevState, userPassword: ''}
          });
        }
        if (!event.target.value || event.target.value === '') {
          setErrorMessage((prevState) => {
            return {...prevState, passwordError: 'Password is required'}
          });
        }else{
          setErrorMessage((prevState) => {
            return {...prevState, passwordError: ""}
          });
          setUserInput((prevState) => {
            return {...prevState, userPassword: event.target.value}
        })
        }  
    };

    const fetchCart = async (token) => {
      try {
        const requestOptions = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(
          `http://localhost:3000/carts/me`,
          requestOptions
        );
        if (response.status === 200 && response.ok) {
          const data = await response.json();
          console.log(data);
          localStorage.setItem('cart',JSON.stringify(data));
        } else {
          throw new Error("No Cart Found");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    


    const loginUser = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userInput.userEmail, password: userInput.userPassword })
            };
            const response = await fetch('http://localhost:3000/login', requestOptions);
            if(response.status === 200 && response.ok){
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                fetchCart(data.token)
                setState({loggedIn: true});
                setUserInput({userEmail: "", userPassword: ""});
                setErrorState("");
                navigate('/');
            }else if(response.status === 404 && !response.ok){
              setErrorMessage((prevState) => {
                return {...prevState, emailError: 'Email is Invalid'}
              });
              setErrorMessage((prevState) => {
                return {...prevState, passwordError: 'Password is Invalid'}
              });
            }
            else {
              if(userInput.userEmail.length > 0 && userInput.userPassword.length ===0){
                errorMessage.passwordError = "Password is required";
              }else if(userInput.userEmail.length === 0 && userInput.userPassword.length >0){
                 errorMessage.emailError = "Email is required";
              }else if (userInput.userEmail.length >0 && userInput.userPassword.length >0){
                  // errorState ='Enter Valid Data';
                  errorMessage.passwordError = "Password is required";
                  errorMessage.emailError = "Email is required";
              }  
            }
         } catch(error) {
            console.log(error);
            setErrorState("Invalid Information");
        }
    };

    const handleLogin = (event) => {
        event.preventDefault();
        if(userInput.userEmail === "" || userInput.userPassword === ""){
          setErrorMessage((prevState) => {
            return {...prevState, emailError: 'Email is required'}
          });
          setErrorMessage((prevState) => {
            return {...prevState, passwordError: 'Password is required'}
          });
          setErrorState("Email And Password Are Required");
            
        }else{
            loginUser(setUserInput);
        }
    };


    return (
        <div className="login">
            <h1>Login</h1>
            <form>
                <input value={userInput.userEmail} required ={true} 
                className={errorMessage.emailError.length !== 0 ? 'error' : 'form-input'}
                type={'email'} placeholder={'Email'} onChange={emailChangeHandler} onBlur={emailChangeHandler}/>
                {errorMessage.emailError.length !== 0 && <small style={{color : 'red'}}>{errorMessage.emailError}</small>}
                <input value={userInput.userPassword} required ={true} 
                className={errorMessage.passwordError.length !== 0 ? 'error' : 'form-input'}
                type={'password'} placeholder={'Password'} onChange={passwordChangeHandler} onBlur={passwordChangeHandler}/>
                {errorMessage.passwordError.length !== 0 && <small style={{color : 'red'}}>{errorMessage.passwordError}</small>}
                <button type="submit" onClick={handleLogin}>Login</button>
            </form>
            <Link className="navigateTo" to={'/signup'}>Don't have account?</Link>
            <p>{errorState}</p>
        </div>
    );
}

export default Login;