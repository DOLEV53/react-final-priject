import {  useState } from "react";
import './AddCard.css'
import Title from "./Title";
import { addCard } from "../services/ApiService";
 import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validate } from "../Types/CardType";


function AddCard() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [web, setWeb] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [zip, setZip] = useState('');
    
    function handleClick() {
        if (!validate({title,subtitle,description,phone,email,web,imageUrl,imageAlt,country,city,street,houseNumber,zip})) {
            return;
        }
        addCard({
            title,
            subtitle,
            description,
            phone,
            email,
            web,
            imageUrl,
            imageAlt,
            state,
            country,
            city,
            street,
            houseNumber,
            zip
        })
        .then (() => {
            navigate('/')
            toast.success(`A new business card has been created`, {position: toast.POSITION.TOP_RIGHT});
        })
    }
    
    function handleClean() {
        setTitle('');
        setSubtitle('');
        setDescription('');
        setPhone('');
        setEmail('');
        setWeb('');
        setImageUrl('');
        setImageAlt('');
        setState('');
        setCountry('');
        setCity('');
        setStreet('');
        setHouseNumber('');
        setZip('');
    };
        
    function handleBack() {
        navigate('/')
    };
        
    return (
        <>
           <Title 
                mainText="CREATE BUSINESS CARD" />

        <div className="  p-4 align-items-center div_container">
        <div className="d-flex pb-2">
            <input
                className="form-control mx-3"
                type="title"
                placeholder="Title *"
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
            <input
                className="form-control mx-3"
                type="text"
                placeholder="Subtitle *"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)} />
        </div>
          <div className="d-flex pb-2">  
            <input
                className="form-control mx-3"
                type="text"
                placeholder="Description *"
                value={description}
                onChange={(e) => setDescription(e.target.value)} />
             <input
                className="form-control mx-3"
                type="text"
                placeholder="050-0000000 *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="d-flex pb-2">
            <input
                className="form-control mx-3"
                type="email"
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            <input
                className="form-control mx-3"
                type="text"
                placeholder="Web *"
                value={web}
                onChange={(e) => setWeb(e.target.value)} />
        </div>
        <div className="d-flex pb-2">
            <input
                className="form-control mx-3"
                type="text"
                placeholder="Image url *"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)} />
            <input
                className="form-control mx-3"
                type="text"
                placeholder="Image alt *"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)} />
            </div>
            <div className="d-flex pb-2">
            <input
                className="form-control mx-3"
                type="text"
                placeholder="State *"
                value={state}
                onChange={(e) => setState(e.target.value)} />
            <input
                className="form-control mx-3"
                type="text"
                placeholder="Country *"
                value={country}
                onChange={(e) => setCountry(e.target.value)} />
            </div>
            <div className="d-flex pb-2">
            <input
                className="form-control mx-3"
                type="text"
                placeholder="City *"
                value={city}
                onChange={(e) => setCity(e.target.value)}  />
            <input
                className="form-control mx-3"
                type="text"
                placeholder="Street *"
                value={street}
                onChange={(e) => setStreet(e.target.value)} />
            </div>
            <div className="d-flex pb-2">
            <input
                className="form-control mx-3"
                type="text"
                placeholder="House number *"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)} />
            <input
                className="form-control mx-3"
                type="text"
                placeholder="Zip *"
                value={zip}
                onChange={(e) => setZip(e.target.value)} />
            </div>
             <div className="d-flex pb-2">
              <button
                className="form-control p-0 mx-3 cancel "
                onClick={handleBack}>CANCEL
                </button>
              <button 
               className="form-control p-0 mx-3 refresh"
               onClick={handleClean}>
            <i className="bi bi-arrow-repeat"></i>
             </button>
            </div>
             <div className="d-flex pb-3">
             <input
                className="btn btn-primary form-control mx-3"
                placeholder="SUBMIT"
                onClick={handleClick}  />
            </div>        
        </div>
      </>  
    );
}

export default AddCard;