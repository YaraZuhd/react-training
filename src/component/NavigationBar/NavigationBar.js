import './NavigationBar.css'
import { FaUser  } from 'react-icons/fa';
import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const NavigationBar = () => {
   let token = "";
   const navigate = useNavigate();
   const [userData, setUserData] = useState({});
   if(localStorage.getItem('token') != null){
     token = localStorage.getItem('token');
   }

   const fetchUser =  useCallback(async () => {
      try {
          const requestOptions = {
              headers: { 'Content-Type': 'application/json',
              Authorization : `Bearer ${token}`
              },
          };
          const response = await fetch(`http://localhost:3000/users/me`, requestOptions)
          if(response.status === 200 && response.ok){
              const data = await response.json();
              setUserData(data)
          }
          else {
              throw new Error("Email or Password is invalid")
          }
       } catch(error) {
          console.log(error.message);
      }
  }, [token]);

   useEffect(()=>{
      fetchUser();
   },[fetchUser]);

   const handleLogout = () => {
      localStorage.removeItem('token');
      navigate("/login");
   }

     return(
        <nav>
         <div className='home-link'>
            <a href='/'>Online Shoping</a>
         </div>
         <div>
         {token && 
            <div className='routes'>
               <Link to={"/products"} className='nav-items'>Products</Link>
               <Link to={"/cart"} className='nav-items'>Carts</Link>
            </div>
         }
            <p>Welcome,  <span> {token ?  userData.firstname : "Guset" } </span></p>
            {!token && <FaUser className='icon'/>}
            {token && <button type='button' onClick={handleLogout} className='logout-btn'>Logout</button>}
         </div>
        </nav>
     );
}

export default NavigationBar;