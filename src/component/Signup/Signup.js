  import "./Signup.css";
  import { useState } from "react";

  const Signup = ({loginStatus}) => {
    const [errorState, setErrorState] = useState("");

    const [userInput, setUserInput] = useState({
      userFirstName : "",
      userLastName : "",
      userEmail: "",
      userPassword: "",
      userPhone : "",
      userAddress : "",
      userGender : ""
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

  const firstNameChangeHandler = (event) => {
    event.preventDefault()
    setUserInput((prevState) => {
        return {...prevState, userFirstName: event.target.value}
    })
  };

  const lastNameChangeHandler = (event) => {
    event.preventDefault()
    setUserInput((prevState) => {
        return {...prevState, userLastName: event.target.value}
    })
  };

  const phoneChangeHandler = (event) => {
    event.preventDefault()
    setUserInput((prevState) => {
        return {...prevState, userPhone: event.target.value}
    })
  };

  const addressChangeHandler = (event) => {
    event.preventDefault()
    setUserInput((prevState) => {
        return {...prevState, userAddress: event.target.value}
    })
  };
  const genderChangeHandler = (event) => {
    event.preventDefault()
    setUserInput((prevState) => {
        return {...prevState, userGender: event.target.value}
    })
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
      console.log(response);
      if(response.status === 200 && response.ok){
          const data = await response.text();
          console.log(data);
      }
      else {
        const error = await  response.text();
          setErrorState(error);
          //throw new Error("Enter Valid Information")
      }
  } catch(error) {
      console.log(error.message);
      setErrorState(error.message);
    }
    if(errorState === ""){
      setUserInput({userFirstName: "", userLastName: "",userEmail: "", userPassword: "",userPhone: "", userAddress: "", userGender: ""});
      loginStatus(true);
    }
  }

  const handleRegister = (event) => {
    event.preventDefault();
    createUser();   
  };


    return (
      <div className="signup">
          <h1>Sign Up</h1>
          <form>
              <input type={'text'} required ={true} placeholder={'First Name'}
              value={userInput.userFirstName} onChange={firstNameChangeHandler}/>
              <input type={'text'} required ={true} placeholder={'Last Name'}
              value={userInput.userLastName} onChange={lastNameChangeHandler}/>
               <input type={'text'} required ={true} placeholder={'Gender'}
              value={userInput.userGender} onChange={genderChangeHandler}/>
              <input type={'text'} required ={true} placeholder={'Phone'}
              value={userInput.userPhone} onChange={phoneChangeHandler}/>
              <input type={'email'} required ={true} placeholder={'Email'}
              value={userInput.userEmail} onChange={emailChangeHandler}/>
              <input type={'password'} required ={true} placeholder={'Password'}
              value={userInput.userPassword} onChange={passwordChangeHandler}/>
              <input type={'text'} required ={true} placeholder={'Address'}
              value={userInput.userAddress} onChange={addressChangeHandler}/>
              <button type="submit" onClick={handleRegister}>Sign Up</button>
          </form>
          <p>{errorState}</p>
      </div>
    )
  }

  export default Signup;
