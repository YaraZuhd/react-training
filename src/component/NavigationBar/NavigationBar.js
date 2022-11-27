import './NavigationBar.css'
import { FaUser  } from 'react-icons/fa';


const NavigationBar = () => {
   let token = "";
   let user ;
   // const navigate = useNavigate();
   if(localStorage.getItem('token') != null){
     token = localStorage.getItem('token');
     user = JSON.parse(localStorage.getItem('user'));
   }

   // const handleLogout = () => {
   //    localStorage.removeItem('token');
   //    localStorage.removeItem('user');
   //    navigate("/login");
   // }

     return(
        <nav>
         <div className='home-link'>
            <a href='/'>Online Shoping</a>
         </div>
         <div>
         {/* {token && 
            <div className='routes'>
               <Link to={"/products"} className='nav-items'>Products</Link>
               <Link to={"/cart"} className='nav-items'>Carts</Link>
            </div>
         } */}
            <a className='welcoming'>Welcome,  <span> {token ?  user.firstname : "Guset" } </span></a>
            {!token && <FaUser className='icon'/>}
            {/* {token && <button type='button' onClick={handleLogout} className='logout-btn'><FaSignOutAlt></FaSignOutAlt></button>} */}
         </div>
        </nav>
     );
}

export default NavigationBar;