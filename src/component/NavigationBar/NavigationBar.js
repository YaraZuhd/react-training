import React from 'react';
import './NavigationBar.css'
import { FaUser  } from 'react-icons/fa';


const NavigationBar = () => {
   let token = "";
   let user ;
   if(localStorage.getItem('token') != null){
     token = localStorage.getItem('token');
     user = JSON.parse(localStorage.getItem('user'));
   }


     return(
        <nav>
         <div className='home-link'>
            <a href='/'>Online Shoping</a>
         </div>
         <div>
            <a className='welcoming'>Welcome,  <span> {token ?  user.firstname : "Guset" } </span></a>
            {!token && <FaUser className='icon'/>}
         </div>
        </nav>
     );
}

export default NavigationBar;