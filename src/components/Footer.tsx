import { NavLink } from 'react-router-dom';
import './Footer.css';
import { userContext } from '../App';
import { useContext } from 'react';

function Footer() {
   const {userData} = useContext(userContext);
   
    return ( 
       
        <div className="footer-content">
           <div className='div_icon'>
           <NavLink to="/about"> <i className="bi bi-info-circle-fill about"></i></NavLink>
           <div>About</div>
           </div>  
            
           {userData?.token &&
           <div className='div_icon'>
           <NavLink to="/favCards"> <i className="bi bi-heart-fill card_fav"></i></NavLink>
           <div>Favorites</div>
           </div>
            } 
             
            { userData?.checked || userData?.isAdmin ?
           <div className='div_icon'>
           <NavLink to="/myCards"> <i className="bi bi-person-square my_card"></i></NavLink>
           <div>My Cards</div>
           </div> : <span></span>
            }

        </div>
 
        
     );
}

export default Footer;