import './Details.css'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCardById } from "../services/ApiService";
import Title from "./Title";

function Details() {
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

    function handleBack() {
        navigate('/')
    };

    return ( 
       <>
         <div className='text-center mt-5 fs-1 fw-bolder text-danger-emphasis'>Welcome to {title} </div>
         <div className='text-center  fs-3 fw-bolder text-danger-emphasis'>{subtitle}</div>

         <Title 
                mainText=''
               
        />

        <div className='mt-4 mx-3 text-warning-emphasis fs-4 text-center'>{description}</div>
         
        <div className='text-center mt-5'>
        <img className='img justify-content-center' src={imageUrl} alt={imageAlt} />
        </div> 
        <div className='text-center'>
        <div className=' text-warning-emphasis mt-5 mx-5 fs-3'>Contact us</div>
        <div className='mx-5'>Email: {email}</div>
        <div className='mx-5'>Phone: {phone}</div>
        <div className='mx-5'>Web site: {web}</div>
        </div>
        
        <div className='text-center'>
        <div className=' text-warning-emphasis mt-5 mx-5 fs-3'>How to find us?</div>
        <div className='mx-5 text-warning-emphasis'>Our business locaated in:</div>
        <div className='mx-5'>{country},</div>
        <div className='mx-5'>{state}, {city}</div>
        <div className='mx-5'>{street} {houseNumber}</div>
        <div className='mx-5'>zip code: {zip}</div>
        </div>
        
      </>  
     );
}
export default Details;