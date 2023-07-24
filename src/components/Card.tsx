import { Link } from "react-router-dom";
import './Card.css'
import {  toggleFavoriteCard } from "../services/ApiService";
import { CardProps } from "../Types/CardType";
import { useContext, useEffect, useState } from "react";
import { getUser } from "../auth/TokenManager";
import { userContext } from "../App";




 function Card({_id,imageUrl,imageAlt,title,subtitle,phone,email,onDelete,favoritePage = false,favorites}: CardProps) {
 const [changeColorHeart, setChangeColorHeart] = useState(false);
  const {userData} = useContext(userContext);

 function toggleRedColor() {
      setChangeColorHeart(!changeColorHeart)
 }  

  useEffect(() => {
       
      const ifCardIsFavorite = (userId: string | null | undefined) => {
        favorites?.forEach((id) => {
      
        if (id === userId) {
         setChangeColorHeart(true);
                  
        }});
     }; 
      const userData = getUser()
      
      if (userData) {
        ifCardIsFavorite(userData.id)
      }
    }, []);

   
    return ( 
        <>
       
        <div className="card m-3 div_card ">
            <img src={imageUrl} className="card-img-top card_img" alt={imageAlt} />
           
            <div className="card-body p-3">
                <h3 className="card-title">{title}</h3>
                <h5 className="card-title">{subtitle}</h5>
                <span className="card-text">
                   phone: {phone}
                </span>
                <p className="card-text">email: {email}</p>

              { !favoritePage && <span className="span">
                               
                              { userData?.checked || userData?.isAdmin ?
                                <Link
                                    to={`/edit/${_id}`}
                                    
                                    className="btn btn-default"
                                >
                                    <i className="bi bi-pen" /> 
                                </Link> : <span></span>
                                }
                                { userData?.checked || userData?.isAdmin ?
                                <button
                                    className="btn btn-default ms-2"
                                      onClick={() => {onDelete && onDelete(_id)}}
                                >
                                    <i className="bi bi-trash" />
                                </button> : <span></span>
                                 }
                                <Link
                                     to={`/details/${_id}`}
                                     className="btn btn-default"
                                >
                                    <i className="bi bi-eye-fill"></i>
                                </Link>
                                {userData?.token || userData?.checked || userData?.isAdmin ?
                                <button
                                className="btn btn-defult ms-5 "
                                onClick={() => {toggleFavoriteCard(_id)
                                                toggleRedColor()
                                }}
                               >
                                <i style={{ color: changeColorHeart ? "red" :" "}} className="bi bi-heart-fill bi_heart"></i>
                               </button> : <span></span>
                               }
                            </span>
                            }
                
            </div>
        </div>

        </>
     );
}
     
export default Card;