import React from "react";
import LoginSignupContainer from '../component/LoginSignupContainer/LoginSignupContainer';
import NavigationBar from '../component/NavigationBar/NavigationBar';

const AuthPage = (props) => {

   return (
    <div>
        <NavigationBar/>
        <LoginSignupContainer login = {props.login}/>
    </div>
   );
}

export default AuthPage;