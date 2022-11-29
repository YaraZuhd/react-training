import React, { useEffect } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import { useNavigate } from "react-router-dom";
import "./Home.css"
import Navbar from "../NavResponsive/Navbar";

// https://coreui.io/react/docs/components/badge/
const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useEffect(()=>{
        if(token === null){
           navigate('login')
        }
    },[navigate,token]);
    if(token != null){
        return (
            <div className="main-div">
                <Navbar/>
                <h1>Welcome To Our Website</h1>
            </div>
        );
    }
    
}

export default Home;