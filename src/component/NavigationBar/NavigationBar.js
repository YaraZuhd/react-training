import './NavigationBar.css'
import { FaUser } from 'react-icons/fa';

const NavigationBar = () => {
     return(
        <nav>
         <div>
            <a href='/'>Online Shoping</a>
         </div>
         <div>
            <p>Welcome,  <span>Guset</span></p>
            <FaUser className='icon'/>
         </div>
        </nav>
     );
}

export default NavigationBar;