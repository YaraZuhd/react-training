import "./Signup.css";
import { useState } from "react";
import React from 'react';
import Select from 'react-select';
import { Link, useNavigate } from "react-router-dom";

const options = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
];

  const Signup = () => {
    const [errorState,setErrorState] = useState('');
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const [errorMessage, setErrorMessage] = useState({
      firstNameError : "",
      lastNameError : "",
      emailError: "",
      passwordError: "",
      confirmPasswordError : "",
      phoneError : "",
      addressError : "",
      genderError : ""
    });
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
      userFirstName : "",
      userLastName : "",
      userEmail: "",
      userPassword: "",
      userPhone : "",
      userAddress : "",
      userGender : ""
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const emailChangeHandler = (event) => {
    event.preventDefault();
    if(event.target.value.length === 0){
      setUserInput((prevState) => {
        return {...prevState, userEmail: ''}
      });
    }
    if (!event.target.value || event.target.value === '') {
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

  const confirmPasswordChangeHandler = (event) =>{
    event.preventDefault();
    console.log(event.target.value, userInput.userPassword);
    if(event.target.value.length === 0){
      setErrorMessage((prevState) => {
        return {...prevState, confirmPasswordError : 'Confirm Password is required'}
      })
      setConfirmPassword('')
    }else{
      if(userInput.userPassword === event.target.value){
        setErrorMessage((prevState) => {
          return {...prevState, confirmPasswordError : ''}
        });
        setConfirmPassword(event.target.value);
      }else{
        setErrorMessage((prevState) => {
          return {...prevState, confirmPasswordError : 'Confirm Password not match'}
        });
        setConfirmPassword(event.target.value);
      }
    }
  }

  const firstNameChangeHandler = (event) => {
    event.preventDefault();
    if(event.target.value.length === 0){
      setUserInput((prevState) => {
        return {...prevState, userFirstName: ''}
      });
    }
    if (!event.target.value || event.target.value === '') {
      setErrorMessage((prevState) => {
        return {...prevState, firstNameError: 'First Name is required'}
      });
    }else{
      setErrorMessage((prevState) => {
        return {...prevState, firstNameError: ""}
      });
      setUserInput((prevState) => {
        return {...prevState, userFirstName: event.target.value}
      })
    }
  };

  const lastNameChangeHandler = (event) => {
    event.preventDefault();
    if(event.target.value.length === 0){
      setUserInput((prevState) => {
        return {...prevState, userLastName: ''}
      });
    }
    if (!event.target.value || event.target.value === '') {
      setErrorMessage((prevState) => {
        return {...prevState, lastNameError: 'Last Name is required'}
      });
    }else{
      setErrorMessage((prevState) => {
        return {...prevState, lastNameError: ""}
      });
      setUserInput((prevState) => {
        return {...prevState, userLastName: event.target.value}
    })
    }
    
  };

  const phoneChangeHandler = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    if(event.target.value.length === 0){
      setUserInput((prevState) => {
        return {...prevState, userPhone: ''}
      });
    }
    if (!event.target.value || event.target.value === '') {
      setErrorMessage((prevState) => {
        return {...prevState, phoneError: 'Phone is required'}
      });
    }else{
      if(event.target.value){
        const value = event.target.value;
        const valid = regex.test(value);
        setUserInput((prevState) => {
          return {...prevState, userPhone: event.target.value}
        })
        if (!valid) {
          setErrorMessage((prevState) => {
            return {...prevState, phoneError: "Invalid Phone Number."}
          });
        }else{
          setErrorMessage((prevState) => {
            return {...prevState, phoneError: ""}
          });
        }
      }else{
        setErrorMessage((prevState) => {
          return {...prevState, phoneError: ""}
        });
        setUserInput((prevState) => {
          return {...prevState, userPhone: event.target.value}
        })
      }
    }
  };

  const addressChangeHandler = (event) => {
    event.preventDefault();
    if(event.target.value.length === 0){
      setUserInput((prevState) => {
        return {...prevState, userAddress: ''}
      });
    }
    if (!event.target.value || event.target.value === '') {
      setErrorMessage((prevState) => {
        return {...prevState, addressError: 'Address is required'}
      });
    }else{
      setErrorMessage((prevState) => {
        return {...prevState, addressError: ""}
      });
      setUserInput((prevState) => {
        return {...prevState, userAddress: event.target.value}
    })
    }
    
  };
  const genderChangeHandler = (event) => {
    if(event.value === '' || !event.value){
      setErrorMessage((prevState) => {
        return {...prevState, genderError: 'Gender is required'}
      });
    }else{
      setErrorMessage((prevState) => {
        return {...prevState, genderError: ""}
      });
      setUserInput((prevState) => {
        return {...prevState, userGender: event.value}
    })
    }
  };

  const createUser = async () => {
    try {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstname : userInput.userFirstName, lastname: userInput.userLastName, gender: userInput.userGender,
            phone : userInput.userPhone, email: userInput.userEmail, password: userInput.userPassword , address: userInput.userAddress})
      };
      const response = await fetch('http://localhost:3000/signup', requestOptions)
      if(response.status === 200 && response.ok){
          navigate("/login")
      }
      else {
        const error = await  response.text();
        console.log(error);
        errorMessage.firstNameError = "First Name is required";
        errorMessage.lastNameError = "Last Name is required";
        errorMessage.genderError = "Gender is required";
        errorMessage.phoneError = "Phone is required";
        errorMessage.addressError = "Address is required";
        errorMessage.emailError = "Email is required";
        errorMessage.passwordError = "Password is required";
        errorMessage.confirmPasswordError = "Confirm Password is required"
          setErrorState(error);
      }
  } catch(error) {
      console.log(error.message);
      setErrorState(error.message);
    }
    if(errorState === ""){
      setUserInput({userFirstName: "", userLastName: "",userEmail: "", userPassword: "",userPhone: "", userAddress: "", userGender: ""});
    }
  }

  const handleRegister = (event) => {
    event.preventDefault();
    if(userInput.userFirstName === "" || userInput.userLastName === "" ||
    userInput.userGender === "" || userInput.userPhone === "" ||
    userInput.userEmail === "" || userInput.userPassword === "" ||userInput.userAddress === ""){
      setErrorState("Please Enter Valid Information");
    }
    createUser();   
  };


    return (
      <div className="signup">
          <h1>Sign Up</h1>
          <form>
              <input type={'text'} required placeholder={'First Name'} name={'firstName'} onBlur={firstNameChangeHandler}
              value={userInput.userFirstName} onChange={firstNameChangeHandler} 
              className={errorMessage.firstNameError.length !== 0 ? 'error' : 'form-input'}/>
              {errorMessage.firstNameError.length !== 0 && <small style={{color : 'red'}}>{errorMessage.firstNameError}</small>}
              <input type={'text'} required ={true} placeholder={'Last Name'} name={'lastName'}
              value={userInput.userLastName} onChange={lastNameChangeHandler} onBlur={lastNameChangeHandler}
              className={errorMessage.lastNameError.length !== 0 ? 'error' : 'form-input'}/>
              {errorMessage.lastNameError.length !== 0 && <small style={{color : 'red'}}>{errorMessage.lastNameError}</small>}
             <Select
                  defaultValue={userInput.userGender}
                  placeholder={'Gender'} onBlur={genderChangeHandler}
                  onChange={genderChangeHandler}
                  options={options}
                  className = {errorMessage.genderError.length !== 0 ? 'select-error' : 'css-b62m3t-container'}
              />
              {errorMessage.genderError.length !== 0 && <small style={{color : 'red'}}>{errorMessage.genderError}</small>}
              <input type={'text'} required ={true} placeholder={'Phone'} name={'phone'}
              value={userInput.userPhone} onChange={phoneChangeHandler} onBlur={phoneChangeHandler}
              className={errorMessage.phoneError.length !== 0 ? 'error' : 'form-input'}/>
              {errorMessage.phoneError.length !== 0 && <small style={{color : 'red'}}>{errorMessage.phoneError}</small>}
              <input type={'email'} required ={true} placeholder={'Email'} name={'email'}
              value={userInput.userEmail} onChange={emailChangeHandler} onBlur={emailChangeHandler}
              className={errorMessage.emailError.length !== 0 ? 'error' : 'form-input'}/>
              {errorMessage.emailError.length !== 0 && <small style={{color : 'red'}}>{errorMessage.emailError}</small>}
              <input type={'password'} required ={true} placeholder={'Password'} name={'password'}
              value={userInput.userPassword} onChange={passwordChangeHandler} onBlur={passwordChangeHandler}
              className={errorMessage.passwordError.length !== 0 ? 'error' : 'form-input'}/>
              {errorMessage.passwordError.length !== 0 && <small style={{color : 'red'}}>{errorMessage.passwordError}</small>}
              <input type={'password'} required ={true} placeholder={'Confirm Password'} name={'confirmPassword'}
              value={confirmPassword} onChange={confirmPasswordChangeHandler} onBlur={confirmPasswordChangeHandler}
              className={errorMessage.confirmPasswordError.length !== 0 ? 'error' : 'form-input'}/>
              {errorMessage.confirmPasswordError.length !== 0 && <small style={{color : 'red'}}>{errorMessage.confirmPasswordError}</small>}
              <input type={'text'} required ={true} placeholder={'Address'} name={'address'}
              value={userInput.userAddress} onChange={addressChangeHandler} onBlur={addressChangeHandler}
              className={errorMessage.addressError.length !== 0 ? 'error' : 'form-input'}/>
              {errorMessage.addressError.length !== 0 && <small style={{color : 'red'}}>{errorMessage.addressError}</small>}
              <button type="submit" onClick={handleRegister}>Sign Up</button>
          </form>
          <Link className="navigateTo" to={'/login'}>Already have an account?</Link>
      </div>
    )
  }

  export default Signup;

