import React, { useEffect } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import { useNavigate } from "react-router-dom";
import "./Home.css"

const Home = () => {
    // check if its authinicated let him visit home but if not redirect him to login 
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token') === null){
           navigate('login')
        }
    },[navigate]);
    if(localStorage.getItem('token') != null){
        return (
            <div className="container">
              <NavigationBar/>
            </div>
        );
    }
    
}

export default Home;