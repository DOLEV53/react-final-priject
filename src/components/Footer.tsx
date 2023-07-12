import { NavLink } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return ( 
       
        <div className="footer-content">
           <div className='div_icon'>
           <NavLink to="/about"> <i className="bi bi-info-circle-fill about"></i></NavLink>
           <div>About</div>
           </div>  
            
           <div className='div_icon'>
           <NavLink to="/favCards"> <i className="bi bi-heart-fill card_fav"></i></NavLink>
           <div>Favorites</div>
           </div>

           <div className='div_icon'>
           <NavLink to="/myCards"> <i className="bi bi-person-square my_card"></i></NavLink>
           <div>My Cards</div>
           </div>

        </div>
 
        
     );
}

export default Footer;