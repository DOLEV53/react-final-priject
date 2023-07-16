
import Title from "../components/Title";
import { useEffect, useState } from "react";
import  {CardProps}  from "../Types/CardType";
import {  deleteCard, getUserFavoriteCard } from "../services/ApiService";
import { toast } from "react-toastify";
import Card from "../components/Card";


export interface Props {
    onDelete: Function;
}


function FavCards() {
     const [list, setList] = useState<Array<CardProps>>([]);
     const [search, setSearch] = useState('');
     const [cards, setCards] = useState([...list]);

    useEffect(() => {
        getUserFavoriteCard()
            .then(json => {
                setList(json.favoriteCards); 
                 setCards(json.favoriteCards);  
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
                mainText="My Favorites Business Cards"
                subText="Here you can find all your favorites business cards"
            />


        <input 
                        className="nav-item mx-3 mb-4"
                        placeholder=" Search..."
                        value={search}
                        onChange={handleSearch}
                    />       
        
        <div className='d-flex'>
                {
                    !list || list.length === 0 && <div className="mx-3 fw-bold">No favorite business cards was chosen</div>
                }
                {list &&
                    list.map(cardItem =>
                        
                        <Card
                             key={cardItem._id}
                             {...cardItem}
                             onDelete={onDelete}
                            favoritePage={true}
                            />
                        
                    )
                }
            </div>
      
                           
        </>
     );
}

export default FavCards;