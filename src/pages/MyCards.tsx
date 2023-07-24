import { Link } from "react-router-dom";
import Title from "../components/Title";
import { useContext, useEffect, useState } from "react";
import Card  from "../components/Card";
import {  deleteCard, getMyCards } from "../services/ApiService";
import { toast } from "react-toastify";
import { CardProps } from "../Types/CardType";
import { userContext } from "../App";


export interface Props {
    onDelete: Function;
}


function MyCards() {
     const [list, setList] = useState<Array<CardProps>>([]);
     const [cards, setCards] = useState([...list]);
     const [search, setSearch] = useState('');
     const {userData} = useContext(userContext);
     
    useEffect(() => {
        getMyCards()
            .then(json => {
                setList(json);
                setCards(json);
                
            })
    }, []);


    async function onDelete(_id: string) {
        const res = await deleteCard(_id);
        const updated = [...list].filter(
            card => card._id !== _id
        )
        setList(updated);
        toast.success('Card has been deleted');
    } 

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearch(value);
        
        const normalizedValue = value.trim().toLowerCase();
        const filtered: Array<CardProps> = cards.filter(
            cardItem => cardItem.title.toLowerCase().includes(normalizedValue)
         );
        setList(filtered);  
    }
    

    return ( 
         <>
        <Title
                mainText="My Cards"
                subText="Here you can find all your business cards that you make"
            />

        <input 
                        className="nav-item mx-3 mb-4"
                        placeholder="Search"
                        value={search}
                        onChange={handleSearch}
                    />    

        <div className='d-flex'>
                {
                    !list || list.length === 0 && <div className="mx-3 fw-bold">No business cards was created</div>
                }
                {list &&
                    list.map(cardItem =>
                        
                        <Card
                             key={cardItem._id}
                             {...cardItem}
                             onDelete={onDelete}
                            
                            />
                        
                    )
                }
            </div>
      

        { userData?.checked || userData?.isAdmin ?
        <button className="btn_plus success">
                                <Link to="/addCard" className="nav-link ">
                                   <i className="bi bi-plus"></i>
                                </Link>
        </button> : <span></span>
        }

                           
        </>
     );
}

export default MyCards;