import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"
import Navbar from "../NavResponsive/Navbar";

const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [toggle, setToggle] = useState(false);

    const handelCallback = (childData) => {
      setToggle(childData);
    };
  

    useEffect(()=>{
        if(token === null){
           navigate('login')
        }
    },[navigate,token]);
    
    if(token != null){
        return (
            <div>
                <Navbar toggleCallback={handelCallback}/>
                <h1>Welcome To Our Website</h1>
            </div>
        );
    }
    
}

export default Home;