import React from "react";
import LoginSignupContainer from '../component/LoginSignupContainer/LoginSignupContainer';
import NavigationBar from '../component/NavigationBar/NavigationBar';

const AuthPage = () => {

   return (
    <div>
        <NavigationBar/>
        <LoginSignupContainer/>
    </div>
   );
}

export default AuthPage;