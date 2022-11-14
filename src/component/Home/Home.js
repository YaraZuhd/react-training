import React, { useEffect, useState, useCallback } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import { useNavigate } from "react-router-dom";
import "./Home.css"

const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useEffect(()=>{
        if(token === null){
           navigate('login')
        }
    },[navigate]);
    if(token != null){
        return (
            <div className="container">
              <NavigationBar/>
            </div>
        );
    }
    
}

export default Home;