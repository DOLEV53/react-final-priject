import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './Header.css';
import LogOut from "../auth/LogOut";
import { userContext } from "../App";


function Header() {
 const [theme, setTheme] = useState('light');
 const [icon, setIcon] = useState('bi bi-moon-fill nav-link');
 const {userData} = useContext(userContext);


  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      setIcon('bi bi-brightness-high-fill nav-link');
    } else {
      setTheme('light');
      setIcon('bi bi-moon-fill nav-link');
    }
  };


  useEffect(() => {
    document.body.className = theme;
   
    
  }, [theme]);

  
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand fw-bold">
                     BCard
                </NavLink>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/about" className="nav-link">
                              ABOUT
                            </NavLink>
                        </li>
                         {userData?.token && 
                            <li className="nav-item">
                                <NavLink to="/favCards" className="nav-link">
                                   FAV CARDS
                                </NavLink>
                            </li>
                         } 
                         { userData?.checked || userData?.isAdmin ?
                            <li className="nav-item">
                                <NavLink to="/myCards" className="nav-link">
                                    MY CARDS
                                </NavLink>
                            </li> : <span></span>
                         }
                          {userData?.isAdmin &&
                         <li className="nav-item">
                                <NavLink to="/sandbox" className="nav-link">
                                    SANDBOX
                                </NavLink>
                            </li>
                           } 
                    </ul>
                </div>

                <ul className="navbar-nav  d-flex">
                   
                    <li className="nav-item ">
                           <span className={`Header ${theme}`}>
                           <i className={icon}  onClick={toggleTheme}></i>
                           </span>
                    </li> 
                     
                    <li className="nav-item">
                        <NavLink to="/signup" className="nav-link">
                            Sign Up
                        </NavLink>
                    </li>
                    {!userData?.token && 
                        <li className="nav-item">
                            <NavLink to="/login" className="nav-link">
                                Login
                            </NavLink>
                        </li>
                     }
                    {userData?.token && 
                         <li className="nav-item">
                             <LogOut /> 
                         </li>  
                    } 
                </ul>
            </div>
        </nav>

     );
}

export default Header;