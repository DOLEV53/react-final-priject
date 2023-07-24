import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editCard, getCardById } from "../services/ApiService";
import Title from "./Title";
import './EditCard.css'
import { validate } from "../Types/CardType";
import { toast } from "react-toastify";

function EditCard() {
    const navigate = useNavigate();
    const { id } = useParams();
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
    
      useEffect(() => {
        if (!id) return;
          getCardById(id)
            .then(json => {
                setTitle(json.title!)
                setSubtitle(json.subtitle!);
                setDescription(json.description!);
                setPhone(json.phone!);
                setEmail(json.email!);
                setWeb(json.web!);
                setImageUrl(json.imageUrl!)
                setImageAlt(json.imageAlt!)
                setState(json.state!)
                setCountry(json.country!)
                setCity(json.city!)
                setStreet(json.street!)
                setHouseNumber(json.houseNumber!)
                setZip(json.zip!)
              })
    }, [id])

     function handleClick() {
        if (!validate({title,subtitle,description,phone,email,web,imageUrl,imageAlt,country,city,street,houseNumber,zip})) {
            return
        }
        if (!id) return;
        editCard(id, {
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
            .then(json => {
                navigate('/');
                toast.success(`The card has been updated successfully`, {position: toast.POSITION.TOP_RIGHT});
        })};

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
         <Title  mainText="UPDATE BUSINESS CARD" />
        <div className="p-4   div_container">
          <div className="row g-3  div_input">
            <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">Title*</label>   
            <input className="form-control mx-5" type="title" placeholder="Title *"   id="title" 
                value={title} onChange={(e) => setTitle(e.target.value)}/> </div>
            <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">Subtitle*</label> 
            <input className="form-control mx-5"  type="text" placeholder="Subtitle *" id='subtitle'
                value={subtitle} onChange={(e) => setSubtitle(e.target.value)}/> </div>
        </div>
        <div className="row g-3 div_input">
          <div className="col-auto ">
           <label  className="form-label mb-0 mx-5">Description*</label> 
           <input className="form-control mx-5" type="text" placeholder="Description *"
                value={description} onChange={(e) => setDescription(e.target.value)} /></div>
            <div className="col-auto ">
             <label  className="form-label mb-0 mx-5">Phone*</label>        
            <input className="form-control mx-5"  type="text" placeholder="Phone *"
                value={phone} onChange={(e) => setPhone(e.target.value)}  /></div>
        </div>
        <div className="row g-3 div_input">
            <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">Email*</label>   
            <input className="form-control mx-5"  type="email"  placeholder="Email *"
                value={email} onChange={(e) => setEmail(e.target.value)} /></div>
             <div className="col-auto ">   
            <label  className="form-label mb-0 mx-5">Web*</label>    
            <input className="form-control mx-5" type="text"  placeholder="Web"
                value={web} onChange={(e) => setWeb(e.target.value)} /></div>
        </div>
        <div className="row g-3 div_input">
            <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">Image Url*</label>   
            <input className="form-control mx-5" type="text"  placeholder="Image url"
                value={imageUrl}  onChange={(e) => setImageUrl(e.target.value)} /></div>
            <div className="col-auto ">
             <label  className="form-label mb-0 mx-5">Image Alt*</label>      
            <input className="form-control mx-5" type="text"  placeholder="Image alt"
                value={imageAlt}  onChange={(e) => setImageAlt(e.target.value)} /></div> 
            </div>
            <div className="row g-3 div_input">
             <div className="col-auto ">
              <label  className="form-label mb-0 mx-5">State*</label>     
            <input className="form-control mx-5"  type="text"  placeholder="State"
                value={state} onChange={(e) => setState(e.target.value)} /></div>
            <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">Country*</label>     
            <input className="form-control mx-5" type="text" placeholder="Country *"
                value={country}  onChange={(e) => setCountry(e.target.value)} /> </div>
            </div>
            <div className="row g-3 div_input">
             <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">City*</label>    
            <input className="form-control mx-5" type="text"  placeholder="City *"
                value={city} onChange={(e) => setCity(e.target.value)}  /></div>
            <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">Street*</label>     
            <input className="form-control mx-5" type="text"  placeholder="Street *"
                value={street}  onChange={(e) => setStreet(e.target.value)} /></div>
            </div>
            <div className="row g-3 div_input">
             <div className="col-auto ">
            <label  className="form-label mb-0 mx-5">House Number*</label>    
            <input className="form-control mx-5"  type="text" placeholder="House number *"
                value={houseNumber}  onChange={(e) => setHouseNumber(e.target.value)}  /></div>
            <div className="col-auto ">
             <label  className="form-label mb-0 mx-5">Zip*</label>   
            <input className="form-control mb-3 mx-5"  type="text" placeholder="Zip"
                value={zip}  onChange={(e) => setZip(e.target.value)}  /> </div>
            </div>
            <div className="d-flex mini_continer">
              <button  className="form-control mx-3  p-0 cancel " 
                onClick={handleBack}>CANCEL
              </button> 
              <button  className="form-control p-0 refresh"
               onClick={handleClean}>
               <i className="bi bi-arrow-repeat"></i>
              </button>
              </div>
              <div className="update">
            <input
                className="btn btn-primary form-control mx-3" placeholder="UPDATE"
                onClick={handleClick} />
            </div>      
         </div>
        </>  
     );
}
export default EditCard;