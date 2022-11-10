import React, { useEffect } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import { redirect, useNavigate } from "react-router-dom";
import "./Home.css"

const Home = () => {
    // check if its authinicated let him visit home but if not redirect him to login 
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token') === null){
           navigate('login')
        }
    },[]);
    if(localStorage.getItem('token') != null){
        return (
            <div className="container">
              <NavigationBar/>
              <div>
                <div>
                    {/* <h3>We Will Help You Find What You want</h3> */}
                </div>
                <img src="https://www.addonchatx.com/wp-content/uploads/2019/07/online-retail.png" 
                style={{width : '65%', paddingTop: '5px', paddingLeft : '500px'}}>
                </img>
              </div>
            </div>
        );
    }
    
}

export default Home;